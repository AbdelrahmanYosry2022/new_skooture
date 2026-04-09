import { Languages, Moon, User, Mail, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Language, SiteContent } from '../../../types';
import { useTranslation } from 'react-i18next';
import MediaInput from '../shared/MediaInput';

interface SettingsSectionProps {
  isRTL: boolean;
  adminLanguage: Language;
  adminTheme: 'light' | 'dark';
  setAdminLanguage: (lang: Language) => void;
  setAdminTheme: (theme: 'light' | 'dark') => void;
  localContent: SiteContent;
  updateNestedContent: (path: string[], value: any) => void;
}

export default function SettingsSection({
  isRTL,
  adminLanguage,
  adminTheme,
  setAdminLanguage,
  setAdminTheme,
  localContent,
  updateNestedContent
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
        
        {/* Brand Assets Card */}
        <div className="bg-background p-6 border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-[12px] bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
                <ImageIcon size={20} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{t("sectionHeaders.brandTitle", "Brand Assets")}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t("sectionHeaders.brandDesc", "Manage the core visual identity of your platform.")}</p>
            </div>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <MediaInput 
                label={t('fields.brandLogo', 'Brand Logo')} 
                type="image"
                value={localContent.brand?.logoUrl || ''}
                onChange={(val) => updateNestedContent(['brand', 'logoUrl'], val)}
              />
            </div>
          </div>
        </div>

        {/* Language Card */}
        <div className="bg-background p-6 border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-10 h-10 rounded-[12px] bg-muted border border-border flex items-center justify-center text-[#00a86b] mb-4">
                <Languages size={20} />
              </div>
              <h3 className="text-lg font-bold text-foreground">{t('settings.languageTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('settings.languageHint')}</p>
            </div>
          </div>
          
          <div className="flex bg-muted border border-border p-1.5 rounded-[12px] gap-2">
            <button 
              onClick={() => setAdminLanguage('ar')}
              className={`flex-1 py-2 rounded-[8px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${adminLanguage === 'ar' ? 'bg-[#191919] text-[#00a86b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t('settings.arabic')}
            </button>
            <button 
              onClick={() => setAdminLanguage('en')}
              className={`flex-1 py-2 rounded-[8px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${adminLanguage === 'en' ? 'bg-[#191919] text-[#00a86b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t('settings.english')}
            </button>
          </div>
        </div>

      </div>

      {/* Profile Card */}
      <div className="bg-background border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        <div className="p-6 border-b border-border bg-muted">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-[12px] bg-muted border border-border flex items-center justify-center text-[#00a86b]">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{t('settings.profileTitle')}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{t('settings.adminAccount')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 rounded-[12px] bg-[#00a86b]/10 border border-[#00a86b]/20 flex items-start gap-3">
            <ShieldAlert className="text-[#00a86b] shrink-0 w-5 h-5 mt-0.5" />
            <p className="text-sm text-[#00a86b]/90 leading-relaxed">
              This is a local environment. Admin credentials cannot be changed from the UI. To update the admin email or password, please edit your backend <code className="bg-black border border-border px-1.5 py-0.5 rounded text-xs mx-1">.env</code> file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('settings.name')}</label>
              <div className="relative">
                <User className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="text" 
                  defaultValue="Admin"
                  readOnly
                  className={`w-full py-3 bg-muted border border-border rounded-[12px] text-sm text-zinc-400 outline-none transition-all cursor-not-allowed ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">{t('settings.email')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                <input 
                  type="email" 
                  defaultValue="admin@skooture.ai" 
                  readOnly
                  className={`w-full py-3 bg-muted border border-border rounded-[12px] text-sm text-zinc-400 outline-none transition-all cursor-not-allowed ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
