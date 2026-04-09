import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, MessageSquareQuote } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import type { AdminSectionProps } from '../../../types';

export default function TestimonialsSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  const testimonialsData = (localContent.testimonials as any) || {};
  const items = testimonialsData.items || [];
  
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  
  // Local state for smooth drag and drop
  const [localItems, setLocalItems] = useState<any[]>([]);

  useEffect(() => {
    const initializedItems = items.map((item: any) => ({
      ...item,
      _id: item._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalItems(initializedItems);
    
    if (!activeItemId && initializedItems.length > 0) {
      setActiveItemId(initializedItems[0]._id);
    }
  }, [items]);

  const handleReorder = (newOrder: any[]) => {
    setLocalItems(newOrder); // visual only
  };

  const handleDragEnd = () => {
    updateNestedContent(['testimonials', 'items'], localItems.map(({ _id, ...rest }) => rest)); // actual save
  };

  const activeIndex = localItems.findIndex((item: any) => item._id === activeItemId);
  const activeItem = localItems[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdateItem = (field: 'author' | 'role' | 'quote', value: string) => {
    if (!activeItem) return;
    const newItems = [...localItems];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (!newItems[targetIndex][field]) newItems[targetIndex][field] = { en: '', ar: '' };
    newItems[targetIndex][field][cardLang] = value;
    
    setLocalItems(newItems);
    updateNestedContent(['testimonials', 'items'], newItems.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteItem = (idToDelete: string) => {
    const newItems = localItems.filter((item: any) => item._id !== idToDelete);
    setLocalItems(newItems);
    updateNestedContent(['testimonials', 'items'], newItems.map(({ _id, ...rest }) => rest));
    if (activeItemId === idToDelete) {
      setActiveItemId(newItems.length > 0 ? newItems[0]._id : null);
    }
  };

  const handleAddItem = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newItems = [...localItems, {
      _id: newId,
      author: { en: 'New Author', ar: 'مؤلف جديد' },
      role: { en: 'New Role', ar: 'منصب جديد' },
      quote: { en: 'Testimonial quote', ar: 'اقتباس التوصية' }
    }];
    setLocalItems(newItems);
    updateNestedContent(['testimonials', 'items'], newItems.map(({ _id, ...rest }) => rest));
    setActiveItemId(newId);
  };

  return (
    <SectionWrapper key="testimonials">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#00a86b] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <MessageSquareQuote size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-1">Testimonials</h4>
              <p className="text-sm text-[#aeaeae]">Manage customer reviews and feedback.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[12px] border transition-colors w-full md:w-auto justify-center ${isHeaderExpanded ? 'bg-white/[0.05] border-white/[0.1] text-white' : 'bg-transparent border-white/[0.05] text-[#aeaeae] hover:text-white hover:bg-white/[0.02]'}`}
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
              className="overflow-hidden bg-[#0a0a0a] border-b border-white/[0.05]"
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                <TranslatableInput 
                  label={t('fields.sectionTitle', 'Section Title')}
                  enValue={testimonialsData.title?.en || ''}
                  arValue={testimonialsData.title?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['testimonials', 'title', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['testimonials', 'title', 'ar'], val)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="p-6 md:p-8 bg-[#050505]">
          
          {/* Horizontal Draggable Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar">
            <Reorder.Group 
              axis="x" 
              values={localItems} 
              onReorder={handleReorder} 
              className="flex items-center gap-3"
            >
              {localItems.map((item: any, index: number) => {
                const isActive = item._id === activeItemId;
                return (
                  <Reorder.Item 
                    key={item._id} 
                    value={item}
                    onDragEnd={handleDragEnd}
                    className={`relative flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border cursor-grab active:cursor-grabbing select-none group ${
                      isActive 
                        ? 'bg-[#00a86b] border-[#00a86b] text-white shadow-[0_4px_20px_rgba(0,168,107,0.4)] z-10' 
                        : 'bg-[#111111] border-white/[0.05] text-[#aeaeae] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.1] z-0'
                    }`}
                    onClick={() => setActiveItemId(item._id)}
                  >
                    <span className="font-bold text-sm transition-opacity group-hover:opacity-0">T{index + 1}</span>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#aeaeae]">
                      <ArrowLeftRight size={20} />
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button 
              onClick={handleAddItem} 
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-white/[0.1] bg-[#111111] text-[#aeaeae] hover:bg-[#00a86b]/10 hover:border-[#00a86b]/50 hover:text-[#00a86b] transition-colors shrink-0"
              title="Add New Testimonial"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active Item Editor Card */}
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111111] border border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:px-8 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.2]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[14px] border border-white/[0.05] bg-[#1a1a1a] flex items-center justify-center shrink-0 text-[#00a86b]">
                      <MessageSquareQuote className="w-6 h-6" />
                    </div>

                    <div>
                      <h5 className="text-white font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activeItem.author?.[cardLang] || 'New Author'}
                      </h5>
                      <p className="text-xs text-[#aeaeae]">Currently editing {cardLang === 'en' ? 'English' : 'Arabic'} translation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex bg-[#000000] p-1 rounded-[12px] border border-white/[0.05]">
                      <button 
                        onClick={() => setCardLang('en')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'en' ? 'bg-[#00a86b] text-white shadow-[0_2px_8px_rgba(0,168,107,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => setCardLang('ar')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'ar' ? 'bg-[#00a86b] text-white shadow-[0_2px_8px_rgba(0,168,107,0.4)]' : 'text-[#aeaeae] hover:text-white'}`}
                      >
                        AR
                      </button>
                    </div>

                    <div className="w-[1px] h-8 bg-white/[0.05]"></div>

                    <button 
                      onClick={() => handleDeleteItem(activeItem._id)}
                      className="p-2.5 rounded-[10px] text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Author Name (English)' : 'اسم المؤلف (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={activeItem.author?.[cardLang] || ''}
                        onChange={(e) => handleUpdateItem('author', e.target.value)}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#00a86b]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                        placeholder={cardLang === 'en' ? 'Type author name...' : 'اكتب اسم المؤلف هنا...'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Role / Company (English)' : 'المنصب (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={activeItem.role?.[cardLang] || ''}
                        onChange={(e) => handleUpdateItem('role', e.target.value)}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#00a86b]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                        placeholder={cardLang === 'en' ? 'Type role...' : 'اكتب المنصب هنا...'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                      {cardLang === 'en' ? 'Quote (English)' : 'الاقتباس (بالعربية)'}
                    </label>
                    <textarea
                      value={activeItem.quote?.[cardLang] || ''}
                      onChange={(e) => handleUpdateItem('quote', e.target.value)}
                      className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#00a86b]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all min-h-[140px] resize-y placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type quote...' : 'اكتب الاقتباس هنا...'}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/[0.1] rounded-[24px] bg-[#111111]/50">
                <MessageSquareQuote className="w-16 h-16 text-white/[0.05] mx-auto mb-4" />
                <p className="text-white font-medium text-lg mb-2">{t("sectionHeaders.noItems", "No Items Available")}</p>
                <p className="text-[#aeaeae] text-sm">{t("sectionHeaders.clickToAdd", "Click the + button above to add your first item.")}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
