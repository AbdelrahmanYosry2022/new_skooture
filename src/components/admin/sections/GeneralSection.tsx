import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function GeneralSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <h4 className="text-sm font-medium text-white">Brand Assets</h4>
          </div>
          <MediaInput 
            label="Brand Logo" 
            type="image"
            value={localContent.brand?.logoUrl || ''}
            onChange={(val) => updateNestedContent(['brand', 'logoUrl'], val)}
          />
        </div>
        
        <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <h4 className="text-sm font-medium text-white">Security</h4>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-bold text-[#aeaeae]">
              Admin Authentication
            </label>
            <div className="p-4 rounded-[12px] bg-[#191919] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
              <p className="text-sm text-[#aeaeae] leading-relaxed">
                Your current admin password is set via environment variables. For production, ensure you update the <code className="bg-[#000000] border border-white/[0.1] px-1.5 py-0.5 rounded text-white text-xs mx-1">.env</code> file.
              </p>
              <div className="mt-4 flex items-center justify-between p-3 rounded-[8px] bg-[#000000] border border-white/[0.05]">
                <span className="text-xs font-medium text-white">Current Fallback</span>
                <span className="text-xs font-mono text-[#eb4520]">admin123</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
