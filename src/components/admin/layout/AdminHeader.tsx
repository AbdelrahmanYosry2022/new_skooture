import { Menu, LogOut, Globe, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../context/ThemeContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
  onSave?: () => void;
  onReset?: () => void;
  isSaved?: boolean;
  showActions?: boolean;
}

export default function AdminHeader({ onMenuClick, title, onSave, onReset, isSaved, showActions }: AdminHeaderProps) {
  const { logout } = useAuth();
  const { adminLanguage, setAdminLanguage } = useContent();
  const { t } = useTranslation('admin');
  const { adminTheme, setAdminTheme } = useTheme();

  const toggleLanguage = () => {
    setAdminLanguage(adminLanguage === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setAdminTheme(adminTheme === 'light' ? 'dark' : 'light');
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
            <h1 className="text-xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999] hidden sm:block capitalize">
              {title || t('header.dashboard')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showActions && (
            <div className="flex items-center gap-3 mr-4">
              <button
                onClick={onReset}
                className="h-[40px] px-[16px] text-sm font-medium text-muted-foreground hover:text-[#ffffff] bg-[#191919] hover:bg-[#252525] border border-border rounded-[10px] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
              >
                {t('actions.reset')}
              </button>
              <button
                onClick={onSave}
                className={`h-[40px] px-[20px] text-sm font-medium text-foreground rounded-[10px] transition-all duration-200 border-0 flex items-center justify-center gap-2 ${
                  isSaved 
                    ? 'bg-emerald-500 shadow-[0_1px_2px_rgba(16,185,129,0.2)]' 
                    : 'bg-[#00a86b] hover:bg-[#008f5b] shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(0,168,107,0.35)]'
                }`}
              >
                {isSaved ? t('actions.saved') : t('actions.saveChanges')}
              </button>
            </div>
          )}

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-[#191919] hover:bg-[#252525] border border-border rounded-[10px] transition-all shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{adminLanguage === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground bg-[#191919] hover:bg-[#252525] border border-border rounded-[10px] transition-all shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]"
            title={adminTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {adminTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="h-8 w-px bg-foreground/5 mx-2 hidden sm:block"></div>

          <button
            onClick={logout}
            className="p-2 text-[#00a86b] hover:text-foreground bg-[#00a86b]/10 hover:bg-[#00a86b] border border-[#00a86b]/20 hover:border-[#00a86b] rounded-[10px] transition-all"
            title={t('header.logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
