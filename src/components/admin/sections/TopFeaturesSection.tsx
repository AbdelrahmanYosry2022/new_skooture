import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function TopFeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const topFeaturesData = (localContent as any).topFeatures || {};
  const items = topFeaturesData.items || [];

  return (
    <SectionWrapper key="topFeatures">
       <div className="space-y-8">
          {/* Header Section */}
          <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <h4 className="text-sm font-medium text-white">Section Header</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TranslatableInput 
                  label={t('topFeatures.sectionTitle', { defaultValue: 'Section Title' })}
                  enValue={topFeaturesData.title?.en || ''}
                  arValue={topFeaturesData.title?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['topFeatures', 'title', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['topFeatures', 'title', 'ar'], val)}
              />
              <TranslatableInput 
                  label={t('topFeatures.sectionSubtitle', { defaultValue: 'Section Subtitle' })}
                  multiline
                  enValue={topFeaturesData.subtitle?.en || ''}
                  arValue={topFeaturesData.subtitle?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['topFeatures', 'subtitle', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['topFeatures', 'subtitle', 'ar'], val)}
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((item: any, index: number) => (
                <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
                    <button 
                        onClick={() => {
                            const newItems = [...items];
                            newItems.splice(index, 1);
                            updateNestedContent(['topFeatures', 'items'], newItems);
                        }}
                        className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                        title="Delete Feature"
                    >
                        <Trash2 size={14} />
                    </button>
                    <div className="flex flex-col space-y-5">
                      <TranslatableInput 
                          label={t('topFeatures.title', { defaultValue: 'Feature Title' })}
                          enValue={item.title?.en || ''}
                          arValue={item.title?.ar || ''}
                          onEnChange={(val) => {
                              const newItems = [...items];
                              if(!newItems[index].title) newItems[index].title = {en: '', ar: ''};
                              newItems[index].title.en = val;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                          onArChange={(val) => {
                              const newItems = [...items];
                              if(!newItems[index].title) newItems[index].title = {en: '', ar: ''};
                              newItems[index].title.ar = val;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                      />
                      <TranslatableInput 
                          label={t('topFeatures.description', { defaultValue: 'Feature Description' })}
                          multiline
                          enValue={item.description?.en || ''}
                          arValue={item.description?.ar || ''}
                          onEnChange={(val) => {
                              const newItems = [...items];
                              if(!newItems[index].description) newItems[index].description = {en: '', ar: ''};
                              newItems[index].description.en = val;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                          onArChange={(val) => {
                              const newItems = [...items];
                              if(!newItems[index].description) newItems[index].description = {en: '', ar: ''};
                              newItems[index].description.ar = val;
                              updateNestedContent(['topFeatures', 'items'], newItems);
                          }}
                      />
                    </div>
                </div>
            ))}
            <button
                onClick={() => {
                    const newItems = [...items, { 
                      icon: 'Star', 
                      title: { en: 'New Feature', ar: 'ميزة جديدة' },
                      description: { en: 'Feature description', ar: 'وصف الميزة' }
                    }];
                    updateNestedContent(['topFeatures', 'items'], newItems);
                }}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
            >
                <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-medium">{t('topFeatures.add', { defaultValue: 'Add New Feature' })}</span>
            </button>
          </div>
       </div>
    </SectionWrapper>
  );
}
