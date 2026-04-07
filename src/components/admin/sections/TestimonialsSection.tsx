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
    <SectionWrapper key="testimonials">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <h4 className="text-sm font-medium text-white">Testimonials Header</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item: any, index: number) => (
            <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
              <button 
                onClick={() => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  updateNestedContent(['testimonials', 'items'], newItems);
                }}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                title="Delete Testimonial"
              >
                <Trash2 size={14} />
              </button>
              
              <div className="flex flex-col space-y-5">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium">{t('add-new-testimonial', { defaultValue: 'Add New Testimonial' })}</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
