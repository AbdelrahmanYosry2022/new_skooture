import { Menu, LogOut, Globe } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';

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
  const { language, setLanguage } = useContent();
  const { t } = useTranslation('admin');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-[#000000] border-b border-white/[0.05] sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 text-[#aeaeae] hover:text-white rounded-[10px] hover:bg-white/[0.05] transition-colors lg:hidden"
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
                className="h-[40px] px-[16px] text-sm font-medium text-[#aeaeae] hover:text-[#ffffff] bg-[#191919] hover:bg-[#252525] border border-white/[0.05] rounded-[10px] transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
              >
                {t('actions.reset')}
              </button>
              <button
                onClick={onSave}
                className={`h-[40px] px-[20px] text-sm font-medium text-white rounded-[10px] transition-all duration-200 border-0 flex items-center justify-center gap-2 ${
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
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#aeaeae] hover:text-white bg-[#191919] hover:bg-[#252525] border border-white/[0.05] rounded-[10px] transition-all shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'عربي' : 'English'}</span>
          </button>

          <div className="h-8 w-px bg-white/[0.05] mx-2 hidden sm:block"></div>

          <button
            onClick={logout}
            className="p-2 text-[#00a86b] hover:text-white bg-[#00a86b]/10 hover:bg-[#00a86b] border border-[#00a86b]/20 hover:border-[#00a86b] rounded-[10px] transition-all"
            title={t('header.logout')}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
