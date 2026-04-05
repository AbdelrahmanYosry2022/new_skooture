import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  return (
    <SectionWrapper key="hero" title={t('sidebar.heroSection')} description="The first thing users see when they visit your site.">
      <div className="space-y-6">
        <MediaInput 
          label="Hero Video URL or Upload" 
          type="video"
          value={localContent.hero?.videoUrl || ''}
          onChange={(val) => updateNestedContent(['hero', 'videoUrl'], val)}
        />
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
        
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 space-y-6">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Call to Action Buttons</h4>
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
    </SectionWrapper>
  );
}
