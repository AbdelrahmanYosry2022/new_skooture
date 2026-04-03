import { LucideIcon, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  sections: {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
  }[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ sections, activeSection, setActiveSection, onLogout }: SidebarProps) {
  const { adminLanguage, content } = useContent();
  const { t } = useTranslation('admin');
  const isRTL = adminLanguage === 'ar';

  return (
    <aside className={`w-[20rem] h-screen sticky top-0 flex flex-col p-6 transition-all duration-500 shadow-xl shadow-zinc-200/50 dark:shadow-none z-40 glass ${isRTL ? 'order-2' : 'order-1'} ${
      isRTL ? 'border-l border-zinc-200 dark:border-white/5' : 'border-r border-zinc-200 dark:border-white/5'
    }`}>
      {/* Branding */}
      <div className="mb-10 px-2 mt-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20" />
            {content.brand?.logoUrl ? (
              <img 
                src={content.brand.logoUrl} 
                alt="Logo" 
                className="h-12 w-12 object-contain relative z-10 rounded-xl" 
                referrerPolicy="no-referrer" 
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10">
                <span className="text-white font-black text-2xl">S</span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest opacity-80">{t('sidebar.brand')}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-2.5 overflow-y-auto custom-scrollbar ${isRTL ? 'pl-2 -ml-2' : 'pr-2 -mr-2'}`}>
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-white/5'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/5'
              }`}
            >
              {/* Active Indicator Pipe */}
              {isActive && (
                <motion.div 
                  layoutId="active-pipe"
                  className={`absolute top-1/4 bottom-1/4 w-1.5 bg-blue-600 rounded-full ${isRTL ? '-right-1' : '-left-1'}`}
                />
              )}

              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              </div>
              <span className={`font-black text-sm tracking-tight flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {section.label}
              </span>
              
              {section.badge !== undefined && section.badge > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-blue-500/20 animate-pulse">
                  {section.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-black text-sm group cursor-pointer uppercase tracking-widest"
        >
          <LogOut size={18} className={`transition-transform ${isRTL ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          {t('sidebar.logout')}
        </button>
      </div>
    </aside>
  );
}
