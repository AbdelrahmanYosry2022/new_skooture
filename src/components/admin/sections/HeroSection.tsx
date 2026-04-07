import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Media & Visuals */}
        <div className="space-y-6">
          <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h4 className="text-sm font-medium text-white">Main Visual</h4>
            </div>
            <MediaInput 
              label="Hero Image URL or Upload" 
              type="image"
              value={localContent.hero?.videoUrl || ''} // Re-using videoUrl key as image temporarily to avoid breaking types
              onChange={(val) => updateNestedContent(['hero', 'videoUrl'], val)}
            />
          </div>

          <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h4 className="text-sm font-medium text-white">Call to Action Buttons</h4>
            </div>
            <div className="space-y-5">
              <TranslatableInput 
                label="Primary Button (Explore)"
                enValue={localContent.hero?.buttons?.explore?.en || ''}
                arValue={localContent.hero?.buttons?.explore?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'buttons', 'explore', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'buttons', 'explore', 'ar'], val)}
              />
              <TranslatableInput 
                label="Secondary Button (Demo)"
                enValue={localContent.hero?.buttons?.demo?.en || ''}
                arValue={localContent.hero?.buttons?.demo?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'buttons', 'demo', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'buttons', 'demo', 'ar'], val)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="space-y-6">
          <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-6 h-full">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h4 className="text-sm font-medium text-white">Copywriting</h4>
            </div>
            
            <div className="space-y-5">
              <TranslatableInput 
                label="Top Badge Text"
                enValue={localContent.hero?.topBadge?.en || ''}
                arValue={localContent.hero?.topBadge?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'topBadge', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'topBadge', 'ar'], val)}
              />
              <TranslatableInput 
                label="Hero Headline"
                multiline
                enValue={localContent.hero?.headline?.en || ''}
                arValue={localContent.hero?.headline?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'headline', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'headline', 'ar'], val)}
              />
              <TranslatableInput 
                label="Hero Subheadline"
                multiline
                enValue={localContent.hero?.subheadline?.en || ''}
                arValue={localContent.hero?.subheadline?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'subheadline', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'subheadline', 'ar'], val)}
              />
            </div>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
