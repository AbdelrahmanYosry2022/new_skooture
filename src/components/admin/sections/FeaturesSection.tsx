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

export default function FeaturesSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  const features = localContent.aiCore?.features || [];
  
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  
  // Icon picker state
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const iconDropdownRef = useRef<HTMLDivElement>(null);

  // Local state for smooth drag and drop
  const [localFeatures, setLocalFeatures] = useState<any[]>([]);

  useEffect(() => {
    const initializedFeatures = features.map((f: any) => ({
      ...f,
      _id: f._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalFeatures(initializedFeatures);
    
    if (!activeFeatureId && initializedFeatures.length > 0) {
      setActiveFeatureId(initializedFeatures[0]._id);
    }
  }, [features]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (iconDropdownRef.current && !iconDropdownRef.current.contains(e.target as Node)) {
        setIsIconPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredIcons = COMMON_ICONS.filter(name => 
    name.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const handleReorder = (newOrder: any[]) => {
    setLocalFeatures(newOrder); // visual only
  };

  const handleDragEnd = () => {
    updateNestedContent(['aiCore', 'features'], localFeatures); // actual save
  };

  const activeIndex = localFeatures.findIndex((f: any) => f._id === activeFeatureId);
  const activeFeature = localFeatures[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdateFeature = (field: 'title' | 'description' | 'icon', value: any) => {
    if (!activeFeature) return;
    const newFeatures = [...localFeatures];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (field === 'icon') {
      newFeatures[targetIndex][field] = value;
    } else {
      if (!newFeatures[targetIndex][field]) newFeatures[targetIndex][field] = { en: '', ar: '' };
      newFeatures[targetIndex][field][cardLang] = value;
    }
    
    setLocalFeatures(newFeatures);
    updateNestedContent(['aiCore', 'features'], newFeatures);
  };

  const handleDeleteFeature = (idToDelete: string) => {
    const newFeatures = localFeatures.filter((f: any) => f._id !== idToDelete);
    setLocalFeatures(newFeatures);
    updateNestedContent(['aiCore', 'features'], newFeatures);
    if (activeFeatureId === idToDelete) {
      setActiveFeatureId(newFeatures.length > 0 ? newFeatures[0]._id : null);
    }
  };

  const handleAddFeature = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newFeatures = [...localFeatures, {
      _id: newId,
      icon: 'Star',
      title: { en: 'New Feature', ar: 'ميزة جديدة' },
      description: { en: 'Feature description here', ar: 'وصف الميزة هنا' }
    }];
    setLocalFeatures(newFeatures);
    updateNestedContent(['aiCore', 'features'], newFeatures);
    setActiveFeatureId(newId);
  };

  return (
    <SectionWrapper key="features">
      <div className="theme-panel rounded-[24px] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-border flex items-center justify-between bg-muted/40">
          <div className="flex items-center gap-4">
            <div className="theme-accent-text w-12 h-12 rounded-[16px] bg-muted border border-border flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-foreground mb-1">{t("sectionHeaders.featuresTitle", "AI Core Features")}</h4>
              <p className="text-sm text-muted-foreground">{t("sectionHeaders.featuresDesc", "Smart Features Manager: Reorder tabs and edit seamlessly.")}</p>
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
              <div className="p-6 md:p-8 grid grid-cols-1 gap-6 max-w-3xl">
                <TranslatableInput 
                  label={t('fields.sectionTitle', 'Section Title')}
                  enValue={localContent.aiCore?.title?.en || ''}
                  arValue={localContent.aiCore?.title?.ar || ''}
                  onEnChange={(val) => updateNestedContent(['aiCore', 'title', 'en'], val)}
                  onArChange={(val) => updateNestedContent(['aiCore', 'title', 'ar'], val)}
                />
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
                        ? 'theme-button-primary text-foreground z-10' 
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
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-border bg-muted text-muted-foreground hover:bg-[color:var(--accent-soft)] hover:border-[color:var(--accent-border)] hover:text-[color:var(--accent)] transition-colors shrink-0"
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
                className="theme-panel rounded-[24px] overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:px-8 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-muted/40">
                  <div className="flex items-center gap-4">
                    {/* Interactive Icon Picker */}
                    <div className="relative z-50">
                      <div 
                        className={`w-12 h-12 rounded-[14px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer group/icon ${isIconPickerOpen ? 'theme-button-primary text-foreground' : 'bg-muted border-border hover:border-[color:var(--accent-border)] hover:bg-[color:var(--accent-soft)] theme-accent-text'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsIconPickerOpen(!isIconPickerOpen);
                          if (!isIconPickerOpen) setIconSearch('');
                        }}
                      >
                        <DynamicIcon name={activeFeature.icon || 'Star'} className="w-6 h-6" />
                      </div>

                      {/* Floating Icon Picker */}
                      <AnimatePresence>
                        {isIconPickerOpen && (
                          <motion.div 
                            ref={iconDropdownRef}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute top-full left-0 mt-3 w-[280px] bg-muted border border-border rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100]"
                          >
                            <div className="p-3 border-b border-border">
                              <div className="relative">
                                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-[color:var(--text-dim)]" size={14} />
                                <input
                                  type="text"
                                  value={iconSearch}
                                  onChange={(e) => setIconSearch(e.target.value)}
                                  placeholder="Search icons..."
                                  className="theme-input theme-focus-accent w-full py-2 pl-9 pr-3 border border-border text-sm font-medium rounded-[10px] text-foreground transition-all placeholder:text-muted-foreground/40"
                                  autoFocus
                                />
                              </div>
                            </div>
                            
                            <div className="max-h-[200px] overflow-y-auto p-3 grid grid-cols-4 gap-2">
                              {filteredIcons.map((name) => {
                                const Icon = (LucideIcons as any)[name];
                                const isActive = activeFeature.icon === name;
                                return (
                                  <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                      handleUpdateFeature('icon', name);
                                      setIsIconPickerOpen(false);
                                    }}
                                    className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all duration-300 ${
                                      isActive 
                                        ? 'theme-button-primary text-foreground' 
                                        : 'hover:bg-foreground/5 text-[color:var(--text-dim)] hover:text-foreground'
                                    }`}
                                    title={name}
                                  >
                                    <Icon size={20} />
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <h5 className="text-foreground font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activeFeature.title?.[cardLang] || 'New Feature'}
                      </h5>
                      <p className="text-xs text-muted-foreground">Currently editing {cardLang === 'en' ? 'English' : 'Arabic'} translation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex bg-background p-1 rounded-[12px] border border-border">
                      <button 
                        onClick={() => setCardLang('en')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'en' ? 'theme-button-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => setCardLang('ar')}
                        className={`px-5 py-2 text-xs font-bold rounded-[8px] transition-all ${cardLang === 'ar' ? 'theme-button-primary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
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
                      {cardLang === 'en' ? 'Feature Title (English)' : 'اسم الميزة (بالعربية)'}
                    </label>
                    <input
                      type="text"
                      value={activeFeature.title?.[cardLang] || ''}
                      onChange={(e) => handleUpdateFeature('title', e.target.value)}
                      className={`theme-focus-accent w-full bg-card border border-border focus:bg-muted text-foreground rounded-[16px] px-5 py-4 transition-all placeholder:text-foreground/10 ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type feature title...' : 'اكتب اسم الميزة هنا...'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      {cardLang === 'en' ? 'Description (English)' : 'الوصف (بالعربية)'}
                    </label>
                    <textarea
                      value={activeFeature.description?.[cardLang] || ''}
                      onChange={(e) => handleUpdateFeature('description', e.target.value)}
                      className={`theme-focus-accent w-full bg-card border border-border focus:bg-muted text-foreground rounded-[16px] px-5 py-4 transition-all min-h-[140px] resize-y placeholder:text-foreground/10 ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                      dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                      placeholder={cardLang === 'en' ? 'Type description...' : 'اكتب الوصف هنا...'}
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
