import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, LayoutGrid, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import SectionWrapper from '../layout/SectionWrapper';
import TranslatableInput from '../shared/TranslatableInput';
import DynamicIcon from '../../shared/DynamicIcon';
import type { AdminSectionProps } from '../../../types';

const COMMON_ICONS = [
  'Brain', 'Zap', 'Settings', 'MessageSquare', 'School', 'Users', 'GraduationCap', 
  'Globe', 'Shield', 'BarChart3', 'History', 'CheckCircle', 'ArrowRight', 
  'Bell', 'Calendar', 'Briefcase', 'Star', 'Heart', 'Layout', 'Sparkles', 
  'Database', 'Cloud', 'Cpu', 'Rocket', 'Activity'
];

export default function TopFeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  const topFeaturesData = (localContent.topFeatures as any) || {};
  const features = topFeaturesData.items || [];
  
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  
  // Local state for smooth drag and drop
  const [localFeatures, setLocalFeatures] = useState<any[]>([]);

  useEffect(() => {
    const initializedFeatures = features.map((f: any) => {
      // If it's already an object with an ID, keep it, otherwise add an ID
      if (typeof f === 'string') {
          return { en: f, ar: f, _id: Math.random().toString(36).substring(2, 9) };
      }
      return {
        ...f,
        _id: f._id || Math.random().toString(36).substring(2, 9)
      };
    });
    setLocalFeatures(initializedFeatures);
    
    if (!activeFeatureId && initializedFeatures.length > 0) {
      setActiveFeatureId(initializedFeatures[0]._id);
    }
  }, [features]);

  const handleReorder = (newOrder: any[]) => {
    setLocalFeatures(newOrder); // visual only
  };

  const handleDragEnd = () => {
    updateNestedContent(['topFeatures', 'items'], localFeatures.map(({ _id, ...rest }) => rest)); // actual save
  };

  const activeIndex = localFeatures.findIndex((f: any) => f._id === activeFeatureId);
  const activeFeature = localFeatures[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdateFeature = (lang: 'en' | 'ar', value: string) => {
    if (!activeFeature) return;
    const newFeatures = [...localFeatures];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    newFeatures[targetIndex][lang] = value;
    
    setLocalFeatures(newFeatures);
    updateNestedContent(['topFeatures', 'items'], newFeatures.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteFeature = (idToDelete: string) => {
    const newFeatures = localFeatures.filter((f: any) => f._id !== idToDelete);
    setLocalFeatures(newFeatures);
    updateNestedContent(['topFeatures', 'items'], newFeatures.map(({ _id, ...rest }) => rest));
    if (activeFeatureId === idToDelete) {
      setActiveFeatureId(newFeatures.length > 0 ? newFeatures[0]._id : null);
    }
  };

  const handleAddFeature = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newFeatures = [...localFeatures, {
      _id: newId,
      en: 'New Feature',
      ar: 'ميزة جديدة'
    }];
    setLocalFeatures(newFeatures);
    updateNestedContent(['topFeatures', 'items'], newFeatures.map(({ _id, ...rest }) => rest));
    setActiveFeatureId(newId);
  };

  return (
    <SectionWrapper key="topFeatures">
      <div className="bg-background border border-border rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-muted border border-border flex items-center justify-center text-[#00a86b] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-foreground mb-1">{t("sectionHeaders.topFeaturesTitle", "Top Features")}</h4>
              <p className="text-sm text-muted-foreground">{t("sectionHeaders.topFeaturesDesc", "Manage the list of top features displayed on the landing page.")}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[12px] border transition-colors w-full md:w-auto justify-center ${isHeaderExpanded ? 'bg-foreground/5 border-border text-foreground' : 'bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-foreground/2'}`}
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
              className="overflow-hidden bg-card border-b border-border"
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                <TranslatableInput 
                  label={t('fields.sectionTitle', 'Section Title')}
                  enValue={topFeaturesData.title?.en || ''}
                  arValue={topFeaturesData.title?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['topFeatures', 'title', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['topFeatures', 'title', 'ar'], val)}
                />
                <div className="space-y-4">
                  <TranslatableInput 
                    label={t('fields.viewMoreButton', 'View More Button')}
                    enValue={topFeaturesData.buttonMore?.en || ''}
                    arValue={topFeaturesData.buttonMore?.ar || ''}
                    onEnChange={(val) => updateNestedContent(['topFeatures', 'buttonMore', 'en'], val)}
                    onArChange={(val) => updateNestedContent(['topFeatures', 'buttonMore', 'ar'], val)}
                  />
                  <TranslatableInput 
                    label={t('fields.viewLessButton', 'View Less Button')}
                    enValue={topFeaturesData.buttonLess?.en || ''}
                    arValue={topFeaturesData.buttonLess?.ar || ''}
                    onEnChange={(val) => updateNestedContent(['topFeatures', 'buttonLess', 'en'], val)}
                    onArChange={(val) => updateNestedContent(['topFeatures', 'buttonLess', 'ar'], val)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="p-6 md:p-8 bg-muted">
          
          {/* Horizontal Draggable Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-2 custom-scrollbar">
            <Reorder.Group 
              axis="x" 
              values={localFeatures} 
              onReorder={handleReorder} 
              className="flex items-center gap-3"
            >
              {localFeatures.map((feature: any, index: number) => {
                const isActive = feature._id === activeFeatureId;
                return (
                  <Reorder.Item 
                    key={feature._id} 
                    value={feature}
                    onDragEnd={handleDragEnd}
                    className={`relative flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border cursor-grab active:cursor-grabbing select-none group ${
                      isActive 
                        ? 'bg-[#00a86b] border-[#00a86b] text-foreground shadow-[0_4px_20px_rgba(0,168,107,0.4)] z-10' 
                        : 'bg-muted border-border text-muted-foreground hover:bg-foreground/5 hover:text-foreground hover:border-border z-0'
                    }`}
                    onClick={() => setActiveFeatureId(feature._id)}
                  >
                    <span className="font-bold text-sm transition-opacity group-hover:opacity-0">F{index + 1}</span>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                      <ArrowLeftRight size={20} />
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button 
              onClick={handleAddFeature} 
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-border bg-muted text-muted-foreground hover:bg-[#00a86b]/10 hover:border-[#00a86b]/50 hover:text-[#00a86b] transition-colors shrink-0"
              title="Add New Feature"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active Feature Editor Card */}
          <AnimatePresence mode="wait">
            {activeFeature ? (
              <motion.div
                key={activeFeature._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-muted border border-border shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:px-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.2]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[14px] border border-border bg-muted flex items-center justify-center shrink-0 text-[#00a86b]">
                      <LayoutGrid className="w-6 h-6" />
                    </div>

                    <div>
                      <h5 className="text-foreground font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activeFeature[cardLang] || 'New Feature'}
                      </h5>
                      <p className="text-xs text-muted-foreground">Currently editing {cardLang === 'en' ? 'English' : 'Arabic'} translation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
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
                      onClick={() => handleDeleteFeature(activeFeature._id)}
                      className="p-2.5 rounded-[10px] text-red-400 hover:text-foreground hover:bg-red-500/20 transition-colors"
                      title="Delete Feature"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      {cardLang === 'en' ? 'Feature Name (English)' : 'اسم الميزة (بالعربية)'}
                    </label>
                    <input
                      type="text"
                      value={activeFeature[cardLang] || ''}
                      onChange={(e) => handleUpdateFeature(cardLang, e.target.value)}
                      className={`w-full bg-card border border-border focus:border-[#00a86b]/50 focus:bg-muted text-foreground rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-foreground/10 ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type feature name...' : 'اكتب اسم الميزة هنا...'}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border rounded-[24px] bg-muted/50">
                <LayoutGrid className="w-16 h-16 text-foreground/5 mx-auto mb-4" />
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
