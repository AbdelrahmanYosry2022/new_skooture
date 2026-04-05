import { Plus, Trash2 } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function FaqSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const faqData = (localContent as any).faq || {};

  return (
    <SectionWrapper key="faq" title={t('sidebar.faq')} description="Manage frequently asked questions.">
      <div className="space-y-4 mb-8 p-6 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-3xl">
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

      <div className="space-y-6">
        {(faqData.items || []).map((faq: any, index: number) => (
          <div key={index} className="relative p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm group transition-all hover:border-blue-500/30">
            <button 
              onClick={() => {
                const newFaqs = [...(faqData.items || [])];
                newFaqs.splice(index, 1);
                updateNestedContent(['faq', 'items'], newFaqs);
              }}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
            
            <div className="space-y-4">
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
          className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-slate-900 hover:border-slate-300 dark:text-zinc-500 dark:hover:text-white dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span className="font-medium">Add New FAQ</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
