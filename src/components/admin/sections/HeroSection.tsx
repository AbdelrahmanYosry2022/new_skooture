import { useState } from 'react';
import { Type, Image as ImageIcon, MousePointerClick, AlignLeft } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import MediaInput from '../shared/MediaInput';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'actions'>('content');

  const tabs = [
    { id: 'content', label: 'Text & Copywriting', icon: <Type size={16} /> },
    { id: 'media', label: 'Main Visual (Image)', icon: <ImageIcon size={16} /> },
    { id: 'actions', label: 'Buttons & Badges', icon: <MousePointerClick size={16} /> },
  ];

  return (
    <SectionWrapper>
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        
        {/* Smart Tabs Header */}
        <div className="flex items-center gap-2 p-4 border-b border-white/[0.05] overflow-x-auto custom-scrollbar bg-[#000000]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-[12px] text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-[#191919] text-[#00a86b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]' 
                  : 'text-[#aeaeae] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Areas */}
        <div className="p-6 md:p-8">
          
          {/* Tab 1: Content (Headline & Subheadline) */}
          {activeTab === 'content' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <TranslatableInput 
                label={t('fields.heroHeadline', 'Hero Headline')}
                multiline
                enValue={localContent.hero?.headline?.en || ''}
                arValue={localContent.hero?.headline?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'headline', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'headline', 'ar'], val)}
              />
              <TranslatableInput 
                label={t('fields.heroSubheadline', 'Hero Subheadline')}
                multiline
                enValue={localContent.hero?.subheadline?.en || ''}
                arValue={localContent.hero?.subheadline?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'subheadline', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'subheadline', 'ar'], val)}
              />
            </div>
          )}

          {/* Tab 2: Media (Hero Image) */}
          {activeTab === 'media' && (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
              <MediaInput 
                label={t('fields.imageUrl', 'Hero Image URL or Upload')} 
                type="image"
                value={localContent.hero?.videoUrl || ''} 
                onChange={(val) => updateNestedContent(['hero', 'videoUrl'], val)}
              />
            </div>
          )}

          {/* Tab 3: Actions & Badges */}
          {activeTab === 'actions' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
              <TranslatableInput 
                label={t('fields.badgeText', 'Badge Text (e.g. New Feature Release)')}
                enValue={localContent.hero?.topBadge?.en || ''}
                arValue={localContent.hero?.topBadge?.ar || ''}
                onEnChange={(val) => updateNestedContent(['hero', 'topBadge', 'en'], val)}
                onArChange={(val) => updateNestedContent(['hero', 'topBadge', 'ar'], val)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <TranslatableInput 
                  label={t('fields.primaryButton', 'Primary Button (Solid Color)')}
                  enValue={localContent.hero?.buttons?.explore?.en || ''}
                  arValue={localContent.hero?.buttons?.explore?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['hero', 'buttons', 'explore', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['hero', 'buttons', 'explore', 'ar'], val)}
                />
                <TranslatableInput 
                  label={t('fields.secondaryButton', 'Secondary Button (Outline)')}
                  enValue={localContent.hero?.buttons?.demo?.en || ''}
                  arValue={localContent.hero?.buttons?.demo?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['hero', 'buttons', 'demo', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['hero', 'buttons', 'demo', 'ar'], val)}
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </SectionWrapper>
  );
}
