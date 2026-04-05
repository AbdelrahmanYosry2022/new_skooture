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
    <SectionWrapper key="topFeatures" title={t('sidebar.topFeatures')} description={t('topFeatures.description')}>
       <div className="space-y-4 mb-8 p-6 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl">
          <TranslatableInput 
              label={t('topFeatures.sectionTitle')}
              enValue={topFeaturesData.title?.en || ''}
              arValue={topFeaturesData.title?.ar || ''}
              onEnChange={(val) => updateNestedContent(['topFeatures', 'title', 'en'], val)}
              onArChange={(val) => updateNestedContent(['topFeatures', 'title', 'ar'], val)}
          />
          <TranslatableInput 
              label={t('topFeatures.sectionSubtitle')}
              multiline
              enValue={topFeaturesData.subtitle?.en || ''}
              arValue={topFeaturesData.subtitle?.ar || ''}
              onEnChange={(val) => updateNestedContent(['topFeatures', 'subtitle', 'en'], val)}
              onArChange={(val) => updateNestedContent(['topFeatures', 'subtitle', 'ar'], val)}
          />
       </div>
       <div className="grid grid-cols-1 gap-4">
          {items.map((item: any, index: number) => (
              <div key={index} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl group shadow-sm transition-all hover:border-blue-500/30 relative">
                  <button 
                      onClick={() => {
                          const newItems = [...items];
                          newItems.splice(index, 1);
                          updateNestedContent(['topFeatures', 'items'], newItems);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                      <Trash2 size={14} />
                  </button>
                  <div className="space-y-4">
                    <TranslatableInput 
                        label={t('topFeatures.title')}
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
                        label={t('topFeatures.description')}
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
       </div>
       <button
          onClick={() => {
              const newItems = [...items, { 
                icon: 'Star', 
                title: { en: 'New Feature', ar: 'ميزة جديدة' },
                description: { en: 'Feature description', ar: 'وصف الميزة' }
              }];
              updateNestedContent(['topFeatures', 'items'], newItems);
          }}
          className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 hover:border-slate-300 dark:text-zinc-500 dark:hover:text-white dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all flex items-center justify-center gap-2"
       >
          <Plus size={20} />
          <span className="font-medium">{t('topFeatures.add')}</span>
       </button>
    </SectionWrapper>
  );
}
