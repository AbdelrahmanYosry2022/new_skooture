import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function TestimonialsSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const testimonialsData = (localContent as any).testimonials || {};
  const items = testimonialsData.items || [];

  return (
    <SectionWrapper key="testimonials" title={t('sidebar.testimonials')} description="Manage quotes from your satisfied customers.">
      <div className="space-y-4 mb-8 p-6 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl">
        <TranslatableInput 
          label="Section Title"
          enValue={testimonialsData.title?.en || ''}
          arValue={testimonialsData.title?.ar || ''}
          onEnChange={(val) => updateNestedContent(['testimonials', 'title', 'en'], val)}
          onArChange={(val) => updateNestedContent(['testimonials', 'title', 'ar'], val)}
        />
        <TranslatableInput 
          label="Section Subtitle"
          multiline
          enValue={testimonialsData.subtitle?.en || ''}
          arValue={testimonialsData.subtitle?.ar || ''}
          onEnChange={(val) => updateNestedContent(['testimonials', 'subtitle', 'en'], val)}
          onArChange={(val) => updateNestedContent(['testimonials', 'subtitle', 'ar'], val)}
        />
      </div>

      <div className="space-y-6">
        {items.map((item: any, index: number) => (
          <div key={index} className="relative p-6 border border-slate-200 dark:border-zinc-800 rounded-2xl space-y-4 shadow-sm group bg-white dark:bg-zinc-900 transition-all hover:border-blue-500/30">
            <button 
              onClick={() => {
                const newItems = [...items];
                newItems.splice(index, 1);
                updateNestedContent(['testimonials', 'items'], newItems);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
            <div className="space-y-4">
              <TranslatableInput 
                label="Quote"
                multiline
                enValue={item.quote?.en || ''}
                arValue={item.quote?.ar || ''}
                onEnChange={(val) => {
                  const newItems = [...items];
                  if (!newItems[index].quote) newItems[index].quote = { en: '', ar: '' };
                  newItems[index].quote.en = val;
                  updateNestedContent(['testimonials', 'items'], newItems);
                }}
                onArChange={(val) => {
                  const newItems = [...items];
                  if (!newItems[index].quote) newItems[index].quote = { en: '', ar: '' };
                  newItems[index].quote.ar = val;
                  updateNestedContent(['testimonials', 'items'], newItems);
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TranslatableInput 
                  label="Author Name"
                  enValue={item.author?.en || ''}
                  arValue={item.author?.ar || ''}
                  onEnChange={(val) => {
                    const newItems = [...items];
                    if (!newItems[index].author) newItems[index].author = { en: '', ar: '' };
                    newItems[index].author.en = val;
                    updateNestedContent(['testimonials', 'items'], newItems);
                  }}
                  onArChange={(val) => {
                    const newItems = [...items];
                    if (!newItems[index].author) newItems[index].author = { en: '', ar: '' };
                    newItems[index].author.ar = val;
                    updateNestedContent(['testimonials', 'items'], newItems);
                  }}
                />
                <TranslatableInput 
                  label="Role"
                  enValue={item.role?.en || ''}
                  arValue={item.role?.ar || ''}
                  onEnChange={(val) => {
                    const newItems = [...items];
                    if (!newItems[index].role) newItems[index].role = { en: '', ar: '' };
                    newItems[index].role.en = val;
                    updateNestedContent(['testimonials', 'items'], newItems);
                  }}
                  onArChange={(val) => {
                    const newItems = [...items];
                    if (!newItems[index].role) newItems[index].role = { en: '', ar: '' };
                    newItems[index].role.ar = val;
                    updateNestedContent(['testimonials', 'items'], newItems);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => {
            const newItems = [...items, {
              quote: { en: 'New quote', ar: 'اقتباس جديد' },
              author: { en: 'Author Name', ar: 'اسم المؤلف' },
              role: { en: 'Role', ar: 'المنصب' }
            }];
            updateNestedContent(['testimonials', 'items'], newItems);
          }}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 hover:border-slate-300 dark:text-zinc-500 dark:hover:text-white dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span className="font-medium">{t('add-new-testimonial')}</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
