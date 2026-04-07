import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function GeneralSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="p-6 bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
          <div className="border-b border-white/[0.05] pb-4">
            <h4 className="text-lg font-bold text-white">Brand Assets</h4>
            <p className="text-sm text-[#aeaeae]">Manage the core visual identity of your platform.</p>
          </div>
          <MediaInput 
            label="Brand Logo" 
            type="image"
            value={localContent.brand?.logoUrl || ''}
            onChange={(val) => updateNestedContent(['brand', 'logoUrl'], val)}
          />
        </div>
        
        <div className="p-6 bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
          <div className="border-b border-white/[0.05] pb-4">
            <h4 className="text-lg font-bold text-white">Security</h4>
            <p className="text-sm text-[#aeaeae]">Manage your administrative access credentials.</p>
          </div>
          <div className="space-y-3">
            <div className="p-5 rounded-[16px] bg-[#111111] border border-white/[0.05]">
              <p className="text-sm text-[#aeaeae] leading-relaxed">
                Your current admin password is set via environment variables. For production, ensure you update the <code className="bg-[#000000] border border-white/[0.1] px-1.5 py-0.5 rounded text-white text-xs mx-1">.env</code> file.
              </p>
              <div className="mt-4 flex items-center justify-between p-4 rounded-[12px] bg-[#000000] border border-white/[0.05]">
                <span className="text-sm font-medium text-white">Current Fallback</span>
                <span className="text-sm font-mono text-[#eb4520]">admin123</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
