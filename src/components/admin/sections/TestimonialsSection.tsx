import { Plus, Trash2, GripVertical } from 'lucide-react';
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
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden space-y-6">
        
        {/* Header Section */}
        <div className="p-6 border-b border-white/[0.05] bg-[#050505]">
          <h4 className="text-lg font-bold text-white mb-2">Testimonials Header</h4>
          <p className="text-sm text-[#aeaeae] mb-6">Manage the title and subtitle of the Testimonials section.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Testimonials List */}
        <div className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Customer Reviews</h4>
          
          {items.map((item: any, index: number) => (
            <div key={index} className="flex gap-4 p-4 bg-[#111111] border border-white/[0.05] rounded-[16px] group relative">
              {/* Drag Handle */}
              <div className="cursor-grab text-white/[0.1] hover:text-white/[0.3] mt-2">
                <GripVertical size={20} />
              </div>

              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:pr-8">
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
                <div className="space-y-4">
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
                    label="Role / Company"
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

              {/* Delete Action */}
              <button 
                onClick={() => {
                  const newItems = [...items];
                  newItems.splice(index, 1);
                  updateNestedContent(['testimonials', 'items'], newItems);
                }}
                className="absolute top-4 right-4 p-2 rounded-[8px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Testimonial"
              >
                <Trash2 size={16} />
              </button>
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
            className="w-full py-4 flex items-center justify-center gap-2 rounded-[16px] border border-dashed border-white/[0.1] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-medium">{t('add-new-testimonial', { defaultValue: 'Add New Testimonial' })}</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
