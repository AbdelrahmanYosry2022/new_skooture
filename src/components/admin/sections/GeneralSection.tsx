import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function GeneralSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <SectionWrapper key="general" title={t('sidebar.generalSettings')} description="Branding and core configuration.">
      <div className="space-y-6">
        <MediaInput 
          label="Brand Logo" 
          value={localContent.brand?.logoUrl || ''}
          onChange={(val) => updateNestedContent(['brand', 'logoUrl'], val)}
        />
        
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Security</h4>
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-zinc-400">
              Admin Password (Optional .env override)
            </label>
            <p className="text-sm text-slate-600 dark:text-zinc-400 italic">
              Current password used: admin123 (Change this in .env for production)
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
