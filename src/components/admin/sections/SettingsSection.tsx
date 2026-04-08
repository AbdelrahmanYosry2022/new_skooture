import { Languages, Moon, User, Mail, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Language } from '../../../types';
import { useTranslation } from 'react-i18next';

interface SettingsSectionProps {
  isRTL: boolean;
  adminLanguage: Language;
  adminTheme: 'light' | 'dark';
  setAdminLanguage: (lang: Language) => void;
  setAdminTheme: (theme: 'light' | 'dark') => void;
}

export default function SettingsSection({
  isRTL,
  adminLanguage,
  adminTheme,
  setAdminLanguage,
  setAdminTheme,
}: SettingsSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Card */}
        <div className="bg-[#000000] p-6 border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-[12px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520] mb-4">
                <Languages size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">{t('settings.languageTitle')}</h3>
              <p className="text-sm text-[#aeaeae] mt-1">{t('settings.languageHint')}</p>
            </div>
          </div>
          
          <div className="flex bg-[#111111] border border-white/[0.05] p-1.5 rounded-[12px] gap-2">
            <button 
              onClick={() => setAdminLanguage('ar')}
              className={`flex-1 py-2 rounded-[8px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${adminLanguage === 'ar' ? 'bg-[#191919] text-[#eb4520] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-[#aeaeae] hover:text-white'}`}
            >
              {t('settings.arabic')}
            </button>
            <button 
              onClick={() => setAdminLanguage('en')}
              className={`flex-1 py-2 rounded-[8px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${adminLanguage === 'en' ? 'bg-[#191919] text-[#eb4520] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-[#aeaeae] hover:text-white'}`}
            >
              {t('settings.english')}
            </button>
          </div>
        </div>

        {/* Theme Card */}
        <div className="bg-[#000000] p-6 border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-[12px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#aeaeae] mb-4">
                <Moon size={20} />
              </div>
              <h3 className="text-lg font-bold text-white">{t('settings.darkModeTitle')}</h3>
              <p className="text-sm text-[#aeaeae] mt-1">Toggle the dashboard visual appearance.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#111111] border border-white/[0.05] rounded-[16px]">
            <span className="text-sm font-medium text-white">{adminTheme === 'dark' ? t('settings.dark') : t('settings.light')}</span>
            <button 
              onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
              className={`w-14 h-7 rounded-full p-1 transition-all duration-300 relative cursor-pointer ${adminTheme === 'dark' ? 'bg-[#eb4520]' : 'bg-zinc-700'}`}
            >
              <motion.div 
                layout
                animate={{ x: adminTheme === 'dark' ? (isRTL ? -28 : 28) : 0 }}
                className="w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
        </div>

      </div>

      {/* Profile Card */}
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[12px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520]">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t('settings.profileTitle')}</h3>
              <p className="text-sm text-[#aeaeae] mt-0.5">{t('settings.adminAccount')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 rounded-[12px] bg-[#eb4520]/10 border border-[#eb4520]/20 flex items-start gap-3">
            <ShieldAlert className="text-[#eb4520] shrink-0 w-5 h-5 mt-0.5" />
            <p className="text-sm text-[#eb4520]/90 leading-relaxed">
              This is a local environment. Admin credentials cannot be changed from the UI. To update the admin email or password, please edit your backend <code className="bg-black border border-white/[0.1] px-1.5 py-0.5 rounded text-xs mx-1">.env</code> file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#aeaeae] uppercase tracking-wider px-1">{t('settings.name')}</label>
              <div className="relative">
                <User className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="text" 
                  defaultValue="Admin"
                  readOnly
                  className={`w-full py-3 bg-[#111111] border border-white/[0.05] rounded-[12px] text-sm text-zinc-400 outline-none transition-all cursor-not-allowed ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#aeaeae] uppercase tracking-wider px-1">{t('settings.email')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="email" 
                  defaultValue="admin@skooture.ai" 
                  readOnly
                  className={`w-full py-3 bg-[#111111] border border-white/[0.05] rounded-[12px] text-sm text-zinc-400 outline-none transition-all cursor-not-allowed ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
