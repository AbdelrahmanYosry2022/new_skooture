import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const features = localContent.aiCore?.features || [];

  return (
    <SectionWrapper key="features">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature: any, index: number) => (
          <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
            <button 
              onClick={() => {
                const newFeatures = [...features];
                newFeatures.splice(index, 1);
                updateNestedContent(['aiCore', 'features'], newFeatures);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              title="Delete feature"
            >
              <Trash2 size={14} />
            </button>
            
            <div className="flex flex-col space-y-5">
              <IconPicker 
                label="Feature Icon"
                value={feature.icon}
                onChange={(name) => {
                  const newFeatures = [...features];
                  newFeatures[index].icon = name;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
              />
              <TranslatableInput 
                label="Feature Title"
                enValue={feature.title?.en || ''}
                arValue={feature.title?.ar || ''}
                onEnChange={(val) => {
                  const newFeatures = [...features];
                  newFeatures[index].title.en = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
                onArChange={(val) => {
                  const newFeatures = [...features];
                  newFeatures[index].title.ar = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
              />
              <TranslatableInput 
                label="Feature Description"
                multiline
                enValue={feature.description?.en || ''}
                arValue={feature.description?.ar || ''}
                onEnChange={(val) => {
                  const newFeatures = [...features];
                  newFeatures[index].description.en = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
                onArChange={(val) => {
                  const newFeatures = [...features];
                  newFeatures[index].description.ar = val;
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
              />
            </div>
          </div>
        ))}
        
        <button
          onClick={() => {
            const newFeatures = [...features, {
              icon: 'Star',
              title: { en: 'New Feature', ar: 'ميزة جديدة' },
              description: { en: 'Feature description', ar: 'وصف الميزة' }
            }];
            updateNestedContent(['aiCore', 'features'], newFeatures);
          }}
          className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
        >
          <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
            <Plus size={20} />
          </div>
          <span className="text-sm font-medium">Add New Feature</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
