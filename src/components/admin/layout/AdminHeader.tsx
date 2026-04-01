import {
  Save,
  RotateCcw,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import type { Language, AdminSection } from '../../../types';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  adminLanguage: Language;
  isRTL: boolean;
  activeSection: string;
  sections: AdminSection[];
  isSaved: boolean;
  onSave: () => void;
  onReset: () => void;
}

export default function AdminHeader({
  adminLanguage,
  isRTL,
  activeSection,
  sections,
  isSaved,
  onSave,
  onReset,
}: AdminHeaderProps) {
  const { t } = useTranslation('admin');

  return (
    <header className={`flex items-center justify-between sticky top-0 z-30 py-4 -mx-8 px-8 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5 transition-all shadow-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center gap-6 ${isRTL ? 'text-right' : ''}`}>
        <div className="flex flex-col">
          <h1 className={`text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-8 bg-blue-600 rounded-full" />
            {t('header.title')}
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-1">
            {sections.find(s => s.id === activeSection)?.label}
          </p>
        </div>
      </div>

      <div className={`flex items-center gap-3 p-1.5 bg-zinc-100/50 dark:bg-white/5 rounded-2xl border border-zinc-200/50 dark:border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button
          onClick={() => {
            if (confirm(t('header.resetConfirm'))) onReset();
          }}
          className="p-2.5 text-zinc-500 hover:text-red-500 transition-all rounded-xl hover:bg-white dark:hover:bg-zinc-800 shadow-sm"
          title={t('header.resetTitle')}
        >
          <RotateCcw size={18} />
        </button>
        
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <button
          onClick={onSave}
          className={`flex items-center gap-3 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
            isSaved 
              ? 'bg-green-600 text-white shadow-green-600/20' 
              : 'bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700'
          }`}
        >
          {isSaved ? <CheckCircle size={16} /> : <Save size={16} />}
          {isSaved ? t('header.saved') : t('header.updatePortal')}
        </button>

        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />

        <div className="flex items-center gap-2">
          <a 
            href="/" 
            target="_blank"
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 shadow-sm border border-zinc-100 dark:border-white/5 transition-all"
            title={t('header.viewSite')}
          >
            <ExternalLink size={18} />
          </a>
          
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
