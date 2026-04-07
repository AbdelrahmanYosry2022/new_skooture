import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function FaqSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const faqData = (localContent as any).faq || {};

  return (
    <SectionWrapper key="faq">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
            <h4 className="text-sm font-medium text-white">FAQ Header</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TranslatableInput 
              label="Section Title"
              enValue={faqData.title?.en || ''}
              arValue={faqData.title?.ar || ''}
              onEnChange={(val) => updateNestedContent(['faq', 'title', 'en'], val)}
              onArChange={(val) => updateNestedContent(['faq', 'title', 'ar'], val)}
            />
            <TranslatableInput 
              label="Section Subtitle"
              multiline
              enValue={faqData.subtitle?.en || ''}
              arValue={faqData.subtitle?.ar || ''}
              onEnChange={(val) => updateNestedContent(['faq', 'subtitle', 'en'], val)}
              onArChange={(val) => updateNestedContent(['faq', 'subtitle', 'ar'], val)}
            />
          </div>
        </div>

        {/* FAQ Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {(faqData.items || []).map((faq: any, index: number) => (
            <div key={index} className="relative p-5 bg-[#000000] border border-white/[0.05] rounded-[16px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] space-y-5 group">
              <button 
                onClick={() => {
                  const newFaqs = [...(faqData.items || [])];
                  newFaqs.splice(index, 1);
                  updateNestedContent(['faq', 'items'], newFaqs);
                }}
                className="absolute -top-3 -right-3 p-2 rounded-full bg-[#191919] border border-white/[0.05] text-[#eb4520] hover:bg-[#eb4520] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                title="Delete FAQ"
              >
                <Trash2 size={14} />
              </button>
              
              <div className="flex flex-col space-y-5">
                <TranslatableInput 
                  label="Question"
                  enValue={faq.question?.en || ''}
                  arValue={faq.question?.ar || ''}
                  onEnChange={(val) => {
                    const newFaqs = [...(faqData.items || [])];
                    if (!newFaqs[index].question) newFaqs[index].question = { en: '', ar: '' };
                    newFaqs[index].question.en = val;
                    updateNestedContent(['faq', 'items'], newFaqs);
                  }}
                  onArChange={(val) => {
                    const newFaqs = [...(faqData.items || [])];
                    if (!newFaqs[index].question) newFaqs[index].question = { en: '', ar: '' };
                    newFaqs[index].question.ar = val;
                    updateNestedContent(['faq', 'items'], newFaqs);
                  }}
                />
                <TranslatableInput 
                  label="Answer"
                  multiline
                  enValue={faq.answer?.en || ''}
                  arValue={faq.answer?.ar || ''}
                  onEnChange={(val) => {
                    const newFaqs = [...(faqData.items || [])];
                    if (!newFaqs[index].answer) newFaqs[index].answer = { en: '', ar: '' };
                    newFaqs[index].answer.en = val;
                    updateNestedContent(['faq', 'items'], newFaqs);
                  }}
                  onArChange={(val) => {
                    const newFaqs = [...(faqData.items || [])];
                    if (!newFaqs[index].answer) newFaqs[index].answer = { en: '', ar: '' };
                    newFaqs[index].answer.ar = val;
                    updateNestedContent(['faq', 'items'], newFaqs);
                  }}
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={() => {
              const newFaqs = [...(faqData.items || []), {
                question: { en: 'New Question', ar: 'سؤال جديد' },
                answer: { en: 'Answer goes here', ar: 'الإجابة هنا' }
              }];
              updateNestedContent(['faq', 'items'], newFaqs);
            }}
            className="flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 border-dashed border-white/[0.05] text-[#aeaeae] hover:text-white hover:border-[#eb4520]/50 hover:bg-[#eb4520]/5 transition-all min-h-[200px]"
          >
            <div className="w-10 h-10 rounded-full bg-[#191919] border border-white/[0.05] flex items-center justify-center shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium">Add New FAQ</span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
