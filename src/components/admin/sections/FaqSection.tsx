import { useState } from 'react';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function FaqSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const faqData = (localContent as any).faq || {};
  const faqs = faqData.items || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', subfield: 'en' | 'ar', value: string) => {
    const newFaqs = [...faqs];
    if (!newFaqs[index][field]) newFaqs[index][field] = { en: '', ar: '' };
    newFaqs[index][field][subfield] = value;
    updateNestedContent(['faq', 'items'], newFaqs);
  };

  const handleDeleteFaq = (index: number) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    updateNestedContent(['faq', 'items'], newFaqs);
    if (expandedIndex === index) setExpandedIndex(null);
  };

  const handleAddFaq = () => {
    const newFaqs = [...faqs, {
      question: { en: 'New Question', ar: 'سؤال جديد' },
      answer: { en: 'Answer goes here', ar: 'الإجابة هنا' }
    }];
    updateNestedContent(['faq', 'items'], newFaqs);
    setExpandedIndex(newFaqs.length - 1);
  };

  return (
    <SectionWrapper key="faq">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent flex flex-col md:flex-row md:items-start gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] shrink-0">
                <MessageCircleQuestion size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-white mb-1">Frequently Asked Questions</h4>
                <p className="text-sm text-[#aeaeae]">Manage the title and items of the FAQ section.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 max-w-2xl">
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
          
          <div className="md:pt-2">
            <button
              onClick={handleAddFaq}
              className="flex items-center gap-2 px-4 py-2 bg-[#eb4520] text-white text-sm font-medium rounded-[12px] hover:bg-[#ff5933] transition-colors shadow-[0_4px_12px_rgba(235,69,32,0.3)] w-full md:w-auto justify-center"
            >
              <Plus size={16} />
              Add FAQ
            </button>
          </div>
        </div>

        {/* FAQ Items List */}
        <div className="p-6 md:p-8 space-y-4 bg-[#050505]">
          <AnimatePresence initial={false}>
            {faqs.map((faq: any, index: number) => {
              const isExpanded = expandedIndex === index;

              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-[#111111] border border-white/[0.05] rounded-[16px] overflow-hidden transition-colors ${
                    isExpanded ? 'border-[#eb4520]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'hover:border-white/[0.1]'
                  }`}
                >
                  {/* Compact Row View */}
                  <div 
                    className="flex items-center gap-4 p-4 cursor-pointer group select-none"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="text-white/[0.1] group-hover:text-white/[0.3] transition-colors cursor-grab active:cursor-grabbing shrink-0">
                      <GripVertical size={20} />
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/[0.05] flex items-center justify-center text-[#eb4520] shrink-0 font-medium text-xs">
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <h5 className="text-white font-medium truncate">
                        {faq.question?.en || 'Untitled Question'}
                      </h5>
                      <p className="text-xs text-[#aeaeae] truncate mt-0.5 max-w-full">
                        {faq.answer?.en || 'No answer provided'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity mr-2 shrink-0">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFaq(index);
                        }}
                        className="p-2 rounded-[8px] text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#eb4520]/10 text-[#eb4520]' : 'bg-[#1a1a1a] text-[#aeaeae]'}`}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Edit Form */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-6 pt-2 border-t border-white/[0.05] bg-[#0a0a0a]/50">
                          <div className="space-y-6 max-w-3xl">
                            <TranslatableInput 
                              label="Question"
                              enValue={faq.question?.en || ''}
                              arValue={faq.question?.ar || ''}
                              onEnChange={(val) => handleUpdateFaq(index, 'question', 'en', val)}
                              onArChange={(val) => handleUpdateFaq(index, 'question', 'ar', val)}
                            />
                            <TranslatableInput 
                              label="Answer"
                              multiline
                              enValue={faq.answer?.en || ''}
                              arValue={faq.answer?.ar || ''}
                              onEnChange={(val) => handleUpdateFaq(index, 'answer', 'en', val)}
                              onArChange={(val) => handleUpdateFaq(index, 'answer', 'ar', val)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {faqs.length === 0 && (
             <div className="text-center py-12 border border-dashed border-white/[0.1] rounded-[16px] bg-[#111111]/50">
               <MessageCircleQuestion className="w-12 h-12 text-white/[0.1] mx-auto mb-3" />
               <p className="text-[#aeaeae] font-medium">No FAQs added yet.</p>
             </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
