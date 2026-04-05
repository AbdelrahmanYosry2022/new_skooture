import { Menu, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useTheme } from '../../../context/ThemeContext';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { logout } = useAuth();
  const { adminTheme, setAdminTheme } = useTheme();
  const { language, setLanguage } = useContent();
  const { t } = useTranslation('admin');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleThemeToggle = () => {
    setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
              {t('header.dashboard')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <button
            onClick={handleThemeToggle}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white bg-slate-50 hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            title={adminTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {adminTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800 mx-2 hidden sm:block"></div>

          <button
            onClick={logout}
            className="p-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors"
            title={t('header.logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
