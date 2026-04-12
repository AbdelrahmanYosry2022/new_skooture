import { Menu, LogOut, Globe } from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
  onSave?: () => void;
  onReset?: () => void;
  onLogout?: () => void;
  isSaved?: boolean;
  showActions?: boolean;
}

export default function AdminHeader({ onMenuClick, title, onSave, onReset, onLogout, isSaved, showActions }: AdminHeaderProps) {
  const { adminLanguage, setAdminLanguage } = useContent();
  const { t } = useTranslation('admin');

  const toggleLanguage = () => {
    setAdminLanguage(adminLanguage === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-[10px] hover:bg-foreground/5 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div>
            <h1 className="theme-headline text-xl font-medium tracking-tight hidden sm:block capitalize">
              {title || t('header.dashboard')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showActions && (
            <div className="flex items-center gap-3 mr-4">
              <button
                onClick={onReset}
                className="theme-soft-surface h-[40px] px-[16px] text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-[10px] transition-all"
              >
                {t('actions.reset')}
              </button>
              <button
                onClick={onSave}
                className={`h-[40px] px-[20px] text-sm font-medium text-foreground rounded-[10px] transition-all duration-200 border-0 flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'bg-emerald-500 text-white shadow-[0_1px_2px_rgba(16,185,129,0.2)]' 
                    : 'theme-button-primary text-white'
                }`}
              >
                {isSaved ? t('actions.saved') : t('actions.saveChanges')}
              </button>
            </div>
          )}

          <button
            onClick={toggleLanguage}
            className="theme-soft-surface flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-[10px] transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{adminLanguage === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <div className="h-8 w-px bg-foreground/5 mx-2 hidden sm:block"></div>

          <button
            onClick={onLogout}
            className="theme-accent-soft p-2 hover:text-[color:var(--accent-foreground)] hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] rounded-[10px] transition-all"
            title={t('header.logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
