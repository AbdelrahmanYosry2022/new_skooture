import { Plus, Trash2, GripVertical } from 'lucide-react';
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
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden space-y-6">
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <h4 className="text-lg font-bold text-white mb-2">Section Header</h4>
          <p className="text-sm text-[#aeaeae] mb-6">Manage the title and subtitle of the Top Features section.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Features List */}
        <div className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Features List</h4>
          
          {items.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 bg-[#111111] border border-white/[0.05] rounded-[16px] group relative">
              {/* Drag Handle (Visual only for now) */}
              <div className="cursor-grab text-white/[0.1] hover:text-white/[0.3] mt-2">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {/* Delete Action */}
              <button 
                  onClick={() => {
                      const newItems = [...items];
                      newItems.splice(index, 1);
                      updateNestedContent(['topFeatures', 'items'], newItems);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Feature"
              >
                  <Trash2 size={16} />
              </button>
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
              className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all"
          >
              <Plus size={18} />
              <span className="text-sm font-medium">{t('topFeatures.add', { defaultValue: 'Add New Feature' })}</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
