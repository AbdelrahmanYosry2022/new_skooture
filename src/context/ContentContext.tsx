import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import defaultContent from '../content.json';
import * as api from '../api/client';
import i18n from '../i18n';

type Language = 'en' | 'ar';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  createdAt?: string;
}

interface ContentContextType {
  language: Language;
  adminLanguage: Language;
  setLanguage: (lang: Language) => void;
  setAdminLanguage: (lang: Language) => void;
  content: typeof defaultContent;
  setContent: (content: typeof defaultContent) => void;
  resetToDefault: () => void;
  t: (obj: { en: string; ar: string } | string) => string;
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  refreshMessages: () => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  isContentLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_language');
    return (saved as Language) || 'en';
  });

  const [adminLanguage, setAdminLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_admin_language');
    return (saved as Language) || 'en';
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContentState] = useState(defaultContent);
  const [isContentLoading, setIsContentLoading] = useState(true);

  // Fetch content from API on mount
  useEffect(() => {
    api.getContent()
      .then((data) => setContentState(data as typeof defaultContent))
      .catch(() => setContentState(defaultContent))
      .finally(() => setIsContentLoading(false));
  }, []);

  // Fetch messages if authenticated
  const refreshMessages = useCallback(async () => {
    try {
      const msgs = await api.getMessages();
      setMessages(msgs.map((m: any) => ({
        ...m,
        timestamp: new Date(m.createdAt).getTime(),
      })));
    } catch {
      // Not authenticated or server error — keep local state
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('skooture_token')) {
      refreshMessages();
    }
  }, [refreshMessages]);

  useEffect(() => {
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentLang = isDashboard ? adminLanguage : language;

    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    void i18n.changeLanguage(currentLang);
    
    localStorage.setItem('skooture_language', language);
    localStorage.setItem('skooture_admin_language', adminLanguage);
  }, [language, adminLanguage]);

  const setContent = async (newContent: typeof defaultContent) => {
    setContentState(newContent);
    try {
      await api.updateContent(newContent);
    } catch (err) {
      console.error('Failed to save content to server:', err);
    }
  };

  const setAdminLanguage = (lang: Language) => {
    setAdminLanguageState(lang);
  };

  const resetToDefault = async () => {
    setContentState(defaultContent);
    try {
      await api.resetContent();
    } catch (err) {
      console.error('Failed to reset content on server:', err);
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'timestamp'>) => {
    try {
      const created = await api.sendMessage({
        name: msg.name,
        email: msg.email,
        message: msg.message,
      });
      setMessages(prev => [{
        ...created,
        timestamp: new Date(created.createdAt).getTime(),
      }, ...prev]);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const deleteMsg = async (id: string) => {
    try {
      await api.deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const t = (obj: any) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const isDashboard = window.location.pathname.startsWith('/admin');
    const currentLang = isDashboard ? adminLanguage : language;
    return obj[currentLang] || obj['en'] || '';
  };

  return (
    <ContentContext.Provider value={{ 
      language, 
      adminLanguage,
      setLanguage, 
      setAdminLanguage,
      content, 
      setContent, 
      resetToDefault, 
      t,
      messages,
      addMessage,
      refreshMessages,
      deleteMessage: deleteMsg,
      isContentLoading,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
