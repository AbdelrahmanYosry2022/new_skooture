import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, ArrowLeftRight, Settings2, Activity, Search } from 'lucide-react';
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

export default function TractionSection({ localContent, updateNestedContent }: AdminSectionProps) {
  const { t } = useTranslation('admin');

  const tractionData = localContent.traction || [];
  
  const [activeStatId, setActiveStatId] = useState<string | null>(null);
  const [cardLang, setCardLang] = useState<'en' | 'ar'>('en');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  
  // Icon picker state
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const iconDropdownRef = useRef<HTMLDivElement>(null);

  // Local state for smooth drag and drop
  const [localStats, setLocalStats] = useState<any[]>([]);

  useEffect(() => {
    const initializedStats = tractionData.map((stat: any) => ({
      ...stat,
      _id: stat._id || Math.random().toString(36).substring(2, 9)
    }));
    setLocalStats(initializedStats);
    
    if (!activeStatId && initializedStats.length > 0) {
      setActiveStatId(initializedStats[0]._id);
    }
  }, [tractionData]);

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
    setLocalStats(newOrder); // visual only
  };

  const handleDragEnd = () => {
    updateNestedContent(['traction'], localStats.map(({ _id, ...rest }) => rest)); // actual save
  };

  const activeIndex = localStats.findIndex((stat: any) => stat._id === activeStatId);
  const activeStat = localStats[activeIndex !== -1 ? activeIndex : 0];

  const handleUpdateStat = (field: 'label' | 'value' | 'icon', val: any) => {
    if (!activeStat) return;
    const newStats = [...localStats];
    const targetIndex = activeIndex !== -1 ? activeIndex : 0;
    
    if (field === 'icon' || field === 'value') {
        newStats[targetIndex][field] = val;
    } else {
        if (!newStats[targetIndex][field]) newStats[targetIndex][field] = { en: '', ar: '' };
        newStats[targetIndex][field][cardLang] = val;
    }
    
    setLocalStats(newStats);
    updateNestedContent(['traction'], newStats.map(({ _id, ...rest }) => rest));
  };

  const handleDeleteStat = (idToDelete: string) => {
    const newStats = localStats.filter((stat: any) => stat._id !== idToDelete);
    setLocalStats(newStats);
    updateNestedContent(['traction'], newStats.map(({ _id, ...rest }) => rest));
    if (activeStatId === idToDelete) {
      setActiveStatId(newStats.length > 0 ? newStats[0]._id : null);
    }
  };

  const handleAddStat = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newStats = [...localStats, {
      _id: newId,
      value: 0,
      label: { en: 'New Stat', ar: 'إحصائية جديدة' },
      icon: 'Activity'
    }];
    setLocalStats(newStats);
    updateNestedContent(['traction'], newStats.map(({ _id, ...rest }) => rest));
    setActiveStatId(newId);
  };

  return (
    <SectionWrapper key="traction">
      <div className="bg-[#000000] border border-white/[0.05] rounded-[24px] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/[0.05] flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[16px] bg-[#111111] border border-white/[0.05] flex items-center justify-center text-[#00a86b] shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="text-xl font-bold tracking-tight text-white mb-1">Traction & Stats</h4>
              <p className="text-sm text-[#aeaeae]">Manage the core numbers that represent your impact.</p>
            </div>
          </div>
          
          {/* Note: Traction has no title/subtitle in current structure, so Header Settings might not be needed, but kept for consistency */}
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
              <div className="p-6 md:p-8 grid grid-cols-1 gap-6 max-w-5xl">
                 <p className="text-sm text-[#aeaeae]">No global header settings for this section.</p>
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
              values={localStats} 
              onReorder={handleReorder} 
              className="flex items-center gap-3"
            >
              {localStats.map((stat: any, index: number) => {
                const isActive = stat._id === activeStatId;
                return (
                  <Reorder.Item 
                    key={stat._id} 
                    value={stat}
                    onDragEnd={handleDragEnd}
                    className={`relative flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border cursor-grab active:cursor-grabbing select-none group ${
                      isActive 
                        ? 'bg-[#00a86b] border-[#00a86b] text-white shadow-[0_4px_20px_rgba(0,168,107,0.4)] z-10' 
                        : 'bg-[#111111] border-white/[0.05] text-[#aeaeae] hover:bg-white/[0.05] hover:text-white hover:border-white/[0.1] z-0'
                    }`}
                    onClick={() => setActiveStatId(stat._id)}
                  >
                    <span className="font-bold text-sm transition-opacity group-hover:opacity-0">S{index + 1}</span>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[#aeaeae]">
                      <ArrowLeftRight size={20} />
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <button 
              onClick={handleAddStat} 
              className="flex items-center justify-center min-w-[56px] h-[56px] rounded-[16px] border border-dashed border-white/[0.1] bg-[#111111] text-[#aeaeae] hover:bg-[#00a86b]/10 hover:border-[#00a86b]/50 hover:text-[#00a86b] transition-colors shrink-0"
              title="Add Impact Stat"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Active Stat Editor Card */}
          <AnimatePresence mode="wait">
            {activeStat ? (
              <motion.div
                key={activeStat._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#111111] border border-white/[0.05] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-[24px] overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 md:px-8 border-b border-white/[0.05] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black/[0.2]">
                  <div className="flex items-center gap-4">
                    {/* Interactive Icon Picker */}
                    <div className="relative z-50">
                      <div 
                        className={`w-12 h-12 rounded-[14px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer group/icon ${isIconPickerOpen ? 'bg-[#00a86b] border-[#00a86b] text-white' : 'bg-[#1a1a1a] border-white/[0.05] hover:border-[#00a86b]/50 hover:bg-[#00a86b]/10 text-[#00a86b]'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsIconPickerOpen(!isIconPickerOpen);
                          if (!isIconPickerOpen) setIconSearch('');
                        }}
                      >
                        <DynamicIcon name={activeStat.icon || 'Activity'} className="w-6 h-6" />
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
                            className="absolute top-full left-0 mt-3 w-[280px] bg-[#111111] border border-white/[0.1] rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[100]"
                          >
                            <div className="p-3 border-b border-white/[0.05]">
                              <div className="relative">
                                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-white/[0.3]" size={14} />
                                <input
                                  type="text"
                                  value={iconSearch}
                                  onChange={(e) => setIconSearch(e.target.value)}
                                  placeholder="Search icons..."
                                  className="w-full py-2 pl-9 pr-3 bg-white/[0.03] border border-white/[0.05] focus:border-[#00a86b]/50 text-sm font-medium rounded-[10px] text-white outline-none transition-all placeholder:text-white/[0.2]"
                                  autoFocus
                                />
                              </div>
                            </div>
                            
                            <div className="max-h-[200px] overflow-y-auto p-3 grid grid-cols-4 gap-2">
                              {filteredIcons.map((name) => {
                                const Icon = (LucideIcons as any)[name];
                                const isActive = activeStat.icon === name;
                                return (
                                  <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                      handleUpdateStat('icon', name);
                                      setIsIconPickerOpen(false);
                                    }}
                                    className={`flex flex-col items-center justify-center p-3 rounded-[12px] transition-all duration-300 ${
                                      isActive 
                                        ? 'bg-[#00a86b] text-white' 
                                        : 'hover:bg-white/[0.05] text-white/[0.5] hover:text-white'
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
                      <h5 className="text-white font-medium truncate max-w-[200px] md:max-w-[400px]">
                        {activeStat.label?.[cardLang] || 'New Stat'}
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
                      onClick={() => handleDeleteStat(activeStat._id)}
                      className="p-2.5 rounded-[10px] text-red-400 hover:text-white hover:bg-red-500/20 transition-colors"
                      title="Delete Stat"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Number' : 'الرقم'}
                      </label>
                      <input
                        type="number"
                        value={activeStat.value || ''}
                        onChange={(e) => handleUpdateStat('value', parseInt(e.target.value))}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#00a86b]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] text-center`}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#aeaeae] uppercase tracking-wider mb-3">
                        {cardLang === 'en' ? 'Stat Label (English)' : 'اسم الإحصائية (بالعربية)'}
                      </label>
                      <input
                        type="text"
                        value={activeStat.label?.[cardLang] || ''}
                        onChange={(e) => handleUpdateStat('label', e.target.value)}
                        className={`w-full bg-[#0a0a0a] border border-white/[0.05] focus:border-[#00a86b]/50 focus:bg-[#111] text-white rounded-[16px] px-5 py-4 outline-none transition-all placeholder:text-white/[0.1] ${cardLang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={cardLang === 'ar' ? 'rtl' : 'ltr'}
                        placeholder={cardLang === 'en' ? 'Type label here...' : 'اكتب التسمية هنا...'}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/[0.1] rounded-[24px] bg-[#111111]/50">
                <Activity className="w-16 h-16 text-white/[0.05] mx-auto mb-4" />
                <p className="text-white font-medium text-lg mb-2">No Stats Available</p>
                <p className="text-[#aeaeae] text-sm">Click the + button above to add your first stat.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
