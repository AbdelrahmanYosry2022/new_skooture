import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
  t: (obj: { en: string; ar: string } | string | undefined) => string;
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
  refreshMessages: () => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  isContentLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_language');
    return (saved as Language) || 'en';
  });

  const [adminLanguage, setAdminLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('skooture_admin_language');
    return (saved as Language) || 'en';
  });

  const [content, setContentState] = useState(() => {
    const saved = localStorage.getItem('skooture_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [isContentLoading, setIsContentLoading] = useState(true);

  const refreshMessages = useCallback(async () => {
    try {
      const data = await api.getMessages();
      setMessages(data.map((m: any) => ({
        ...m,
        timestamp: new Date(m.createdAt).getTime(),
      })));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('skooture_language', lang);
    i18n.changeLanguage(lang);
  };

  const setAdminLanguage = (lang: Language) => {
    setAdminLanguageState(lang);
    localStorage.setItem('skooture_admin_language', lang);
    i18n.changeLanguage(lang);
  };

  const setContent = (newContent: typeof defaultContent) => {
    setContentState(newContent);
    localStorage.setItem('skooture_content', JSON.stringify(newContent));
  };

  const resetToDefault = async () => {
    setContentState(defaultContent);
    try {
      await api.resetContent();
      localStorage.removeItem('skooture_content');
    } catch (error) {
      console.error('Failed to reset content on server:', error);
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'timestamp'>) => {
    try {
      await api.sendMessage(msg);
      await refreshMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await api.deleteMessage(id);
      await refreshMessages();
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const serverContent = await api.getContent();
        setContentState(serverContent);
      } catch (error) {
        console.error('Failed to load content from server, using local:', error);
      } finally {
        setIsContentLoading(false);
      }
    };
    loadInitialData();
    refreshMessages();
  }, [refreshMessages]);

  useEffect(() => {
    const isDashboard = window.location.pathname.startsWith('/admin');
    i18n.changeLanguage(isDashboard ? adminLanguage : language);
  }, []);

  const t = (obj: { en: string; ar: string } | string | undefined) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const isDashboard = window.location.pathname.startsWith('/admin');
    const activeLang = isDashboard ? adminLanguage : language;
    return obj[activeLang as keyof typeof obj] || obj.en;
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
      deleteMessage,
      isContentLoading
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
