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
    <SectionWrapper key="features" title={t('sidebar.features')} description="Highlight the advanced capabilities of your platform.">
      <div className="space-y-6">
        {features.map((feature: any, index: number) => (
          <div key={index} className="relative p-6 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl space-y-4 shadow-sm group">
            <button 
              onClick={() => {
                const newFeatures = [...features];
                newFeatures.splice(index, 1);
                updateNestedContent(['aiCore', 'features'], newFeatures);
              }}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            
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
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 hover:border-slate-300 dark:text-zinc-500 dark:hover:text-white dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span className="font-medium">Add New Feature</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
