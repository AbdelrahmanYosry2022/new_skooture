import { Plus, Trash2, GripVertical } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps } from '../../../types';

export default function FeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const features = localContent.aiCore?.features || [];

  return (
    <SectionWrapper key="features">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        <div className="p-6 border-b border-white/[0.05]">
          <h4 className="text-lg font-bold text-white">AI Core Features</h4>
          <p className="text-sm text-[#aeaeae]">Manage the main features displayed in the features grid.</p>
        </div>

        <div className="p-6 space-y-4">
          {features.map((feature: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 bg-[#111111] border border-white/[0.05] rounded-[16px] group relative">
              {/* Drag Handle (Visual only for now) */}
              <div className="cursor-grab text-white/[0.1] hover:text-white/[0.3] mt-2">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
                <div className="w-[120px]">
                  <IconPicker 
                    label="Icon"
                    value={feature.icon}
                    onChange={(name) => {
                      const newFeatures = [...features];
                      newFeatures[index].icon = name;
                      updateNestedContent(['aiCore', 'features'], newFeatures);
                    }}
                  />
                </div>
                
                <div className="space-y-4">
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

              {/* Delete Action */}
              <button 
                onClick={() => {
                  const newFeatures = [...features];
                  newFeatures.splice(index, 1);
                  updateNestedContent(['aiCore', 'features'], newFeatures);
                }}
                className="absolute top-4 right-4 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Delete feature"
              >
                <Trash2 size={16} />
              </button>
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
            className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">Add New Feature</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
