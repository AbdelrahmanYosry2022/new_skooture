import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';
import { useTranslation } from 'react-i18next';

export default function FaqSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');
  const faqData = (localContent as any).faq || {};
  const faqs = faqData.items || [];
  
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');

  // Local state for smooth drag and drop
  const [localFaqs, setLocalFaqs] = useState<any[]>([]);

  useEffect(() => {
    const initializedFaqs = faqs.map((f: any) => ({
      ...f,
      _id: f._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalFaqs(initializedFaqs);
    
    if (!activeFaqId && initializedFaqs.length > 0) {
      setActiveFaqId(initializedFaqs[0]._id);
    }
  }, [faqs]); // Sync when global faqs update

  const handleReorder = (newOrder: any[]) => {
    setLocalFaqs(newOrder); // Update local visual state immediately
  };

  const handleDragEnd = () => {
    // Only update global state when dragging finishes
    updateNestedContent(['faq', 'items'], localFaqs);
  };

  const activeIndex = localFaqs.findIndex((f: any) => f._id === activeFaqId);
  const activeFaq = localFaqs[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdateFaq = (field: 'question' | 'answer', value: string) => {
    if (!activeFaq) return;
    const newFaqs = [...localFaqs];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (!newFaqs[targetIndex][field]) newFaqs[targetIndex][field] = { en: '', ar: '' };
    newFaqs[targetIndex][field][cardLang] = value;
    
    setLocalFaqs(newFaqs); // Update local
    updateNestedContent(['faq', 'items'], newFaqs); // Sync global
  };

  const handleDeleteFaq = (idToDelete: string) => {
    const newFaqs = localFaqs.filter((f: any) => f._id !== idToDelete);
    setLocalFaqs(newFaqs);
    updateNestedContent(['faq', 'items'], newFaqs);
    if (activeFaqId === idToDelete) {
      setActiveFaqId(newFaqs.length > 0 ? newFaqs[0]._id : null);
    }
  };

  const handleAddFaq = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newFaqs = [...localFaqs, {
      _id: newId,
      question: { en: 'New Question', ar: 'سؤال جديد' },
      answer: { en: 'Answer goes here', ar: 'الإجابة هنا' }
    }];
    setLocalFaqs(newFaqs);
    updateNestedContent(['faq', 'items'], newFaqs);
    setActiveFaqId(newId);
  };

  return (
    <SectionWrapper key="faq">
      <div className="theme-panel rounded-[24px] overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-border bg-muted/40">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[16px] bg-muted border border-border flex items-center justify-center text-[#00a86b] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] shrink-0">
                <MessageCircleQuestion size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight text-foreground mb-1">{t("sectionHeaders.faqTitle", "Frequently Asked Questions")}</h4>
                <p className="text-sm text-muted-foreground">{t("sectionHeaders.faqDesc", "Smart FAQ Manager: Reorder tabs and edit seamlessly.")}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[12px] border transition-colors w-full md:w-auto justify-center ${isHeaderExpanded ? 'bg-foreground/5 border-border text-foreground' : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-foreground/2'}`}
              >
                <Settings2 size={16} />
                {t('fields.headerSettings', 'Header Settings')}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isHeaderExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="pt-8 grid grid-cols-1 gap-6 max-w-3xl">
                  <TranslatableInput 
                    label={t('fields.sectionTitle', 'Section Title')}
                    enValue={faqData.title?.en || ''}
                    arValue={faqData.title?.ar || ''}
                    onEnChange={(val) => updateNestedContent(['faq', 'title', 'en'], val)}
                    onArChange={(val) => updateNestedContent(['faq', 'title', 'ar'], val)}
                  />
                  <TranslatableInput 
                    label={t('fields.sectionSubtitle', 'Section Subtitle')}
                    multiline
                    enValue={faqData.subtitle?.en || ''}
                    arValue={faqData.subtitle?.ar || ''}
                    onEnChange={(val) => updateNestedContent(['faq', 'subtitle', 'en'], val)}
                    onArChange={(val) => updateNestedContent(['faq', 'subtitle', 'ar'], val)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Smart Horizontal Tabs & Editor */}
        <div className="p-6 md:p-8 bg-muted">
          
          {/* Horizontal Draggable Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar">
            <Reorder.Group 
              axis="x" 
              values={localFaqs} 
              onReorder={handleReorder} 
              className="flex items-center gap-3"
            >
              {localFaqs.map((faq: any, index: number) => {
                const isActive = faq._id === activeFaqId;
                return (
                  <Reorder.Item 
                    key={faq._id} 
                    value={faq}
                    onDragEnd={handleDragEnd}
                    className={`relative flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border cursor-grab active:cursor-grabbing select-none group ${
                      isActive 
                        ? 'bg-[#00a86b] border-[#00a86b] text-foreground shadow-[0_4px_20px_rgba(0,168,107,0.4)] z-10' 
                        : 'bg-muted border-border text-muted-foreground hover:bg-foreground/5 hover:text-foreground hover:border-border z-0'
                    }`}
                    onClick={() => setActiveFaqId(faq._id)}
                  >
                    <span className="font-bold text-sm transition-opacity group-hover:opacity-0">{index + 1}</span>
                    
                    {/* Drag hint icon that appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                      <ArrowLeftRight size={20} />
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button 
              onClick={handleAddFaq} 
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-border bg-muted text-muted-foreground hover:bg-[#00a86b]/10 hover:border-[#00a86b]/50 hover:text-[#00a86b] transition-colors shrink-0"
              title="Add New FAQ"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active FAQ Editor Card */}
          <AnimatePresence mode="wait">
            {activeFaq ? (
              <motion.div
                key={activeFaq._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="theme-panel rounded-[24px] overflow-hidden"
              >
                {/* Card Header + Master Toggle */}
                <div className="p-6 md:px-8 border-b border-border flex items-center justify-between bg-muted/40">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-foreground font-bold text-sm">
                      Q{activeIndex + 1}
                    </div>
                    <div>
                      <h5 className="text-foreground font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activeFaq.question?.[cardLang] || 'New Question'}
                      </h5>
                      <p className="text-xs text-muted-foreground">Currently editing {cardLang === 'en' ? 'English' : 'Arabic'} translation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* EN / AR Card Level Toggle */}
                    <div className="flex bg-background p-1 rounded-[12px] border border-border">
                      <button 
                        onClick={() => setCardLang('en')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'en' ? 'bg-[#00a86b] text-foreground shadow-[0_2px_8px_rgba(0,168,107,0.4)]' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => setCardLang('ar')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'ar' ? 'bg-[#00a86b] text-foreground shadow-[0_2px_8px_rgba(0,168,107,0.4)]' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        AR
                      </button>
                    </div>

                    <div className="w-[1px] h-8 bg-foreground/5"></div>

                    <button 
                      onClick={() => handleDeleteFaq(activeFaq._id)}
                      className="p-2.5 rounded-[10px] text-red-400 hover:text-foreground hover:bg-red-500/20 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Inputs based on cardLang */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      {cardLang === 'en' ? 'Question Text (English)' : 'نص السؤال (بالعربية)'}
                    </label>
                    <input
                      type="text"
                      value={activeFaq.question?.[cardLang] || ''}
                      onChange={(e) => handleUpdateFaq('question', e.target.value)}
                      className={`w-full bg-card border border-border focus:border-[#00a86b]/50 focus:bg-muted text-foreground rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-foreground/10 ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type the question here...' : 'اكتب السؤال هنا...'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      {cardLang === 'en' ? 'Answer Text (English)' : 'نص الإجابة (بالعربية)'}
                    </label>
                    <textarea
                      value={activeFaq.answer?.[cardLang] || ''}
                      onChange={(e) => handleUpdateFaq('answer', e.target.value)}
                      className={`w-full bg-card border border-border focus:border-[#00a86b]/50 focus:bg-muted text-foreground rounded-[16px] px-5 py-4 outline-none transition-all min-h-[140px] resize-y placeholder:text-foreground/10 ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type the answer here...' : 'اكتب الإجابة هنا...'}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border rounded-[24px] bg-muted/50">
                <MessageCircleQuestion className="w-16 h-16 text-foreground/5 mx-auto mb-4" />
                <p className="text-foreground font-medium text-lg mb-2">{t("sectionHeaders.noItems", "No Items Available")}</p>
                <p className="text-muted-foreground text-sm">{t("sectionHeaders.clickToAdd", "Click the + button above to add your first item.")}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
