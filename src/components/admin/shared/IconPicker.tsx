import * as LucideIcons from 'lucide-react';
import { Search, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';

const COMMON_ICONS = [
  'Brain', 'Zap', 'Settings', 'MessageSquare', 'School', 'Users', 'GraduationCap', 
  'Globe', 'Shield', 'BarChart3', 'History', 'CheckCircle', 'ArrowRight', 
  'Bell', 'Calendar', 'Briefcase', 'Star', 'Heart', 'Layout', 'Sparkles', 
  'Database', 'Cloud', 'Cpu', 'Rocket', 'Activity'
];

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
  label?: string;
}

export default function IconPicker({ value, onChange, label }: IconPickerProps) {
  const { adminLanguage } = useContent();
  const isRTL = adminLanguage === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const CurrentIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

  const filteredIcons = COMMON_ICONS.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inputClasses = "theme-input w-full px-5 py-3.5 rounded-2xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-foreground placeholder:text-muted-foreground";

  return (
    <div className="space-y-4">
      {label && (
        <label className={`text-[11px] uppercase tracking-[0.2em] font-black text-[color:var(--text-dim)] px-1 flex items-center gap-2 ${isRTL ? 'justify-end' : ''}`}>
          <Sparkles size={12} className="text-blue-500" />
          {label}
        </label>
      )}
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`${inputClasses} flex items-center justify-between cursor-pointer ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
              <CurrentIcon size={20} />
            </div>
            <span className="font-bold tracking-tight">{value || 'Select Platform Icon'}</span>
          </div>
          <ChevronDown size={20} className={`text-[color:var(--text-dim)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${isRTL ? 'scale-x-[-1]' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="theme-panel-strong absolute z-50 top-full mt-3 w-full rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 text-[color:var(--text-dim)] ${isRTL ? 'right-4' : 'left-4'}`} size={16} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search all icons..."
                    className={`theme-input w-full py-3 border-none focus:ring-2 focus:ring-blue-500/20 text-sm font-bold rounded-xl outline-none ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                    autoFocus
                  />
                </div>
              </div>
              
              <div className="max-h-72 overflow-y-auto p-4 grid grid-cols-4 gap-3">
                {filteredIcons.map((name) => {
                  const Icon = (LucideIcons as any)[name];
                  const isActive = value === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        onChange(name);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 group cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                          : 'hover:bg-blue-50/60 dark:hover:bg-blue-600/10 text-[color:var(--text-dim)] hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      title={name}
                    >
                      <Icon size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                  );
                })}
              </div>
              
              {filteredIcons.length === 0 && (
                <div className="p-8 text-center text-[color:var(--text-dim)] text-sm font-bold italic">
                  Explore other keywords...
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
