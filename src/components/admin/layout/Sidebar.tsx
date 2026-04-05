import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Settings, 
  MessageSquare,
  LayoutTemplate,
  Star,
  Users,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  CreditCard,
  Target,
  FileQuestion,
  HelpCircle
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';
import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ currentSection, onSectionChange, isOpen, setIsOpen }: SidebarProps) {
  const { language, content } = useContent();
  const { t } = useTranslation('admin');
  const isRTL = language === 'ar';

  const menuItems: { id: string; labelKey: string; icon: React.ElementType }[] = [
    { id: 'overview', labelKey: 'sidebar.overview', icon: LayoutDashboard },
    { id: 'general', labelKey: 'sidebar.generalSettings', icon: Settings },
    { id: 'hero', labelKey: 'sidebar.heroSection', icon: LayoutTemplate },
    { id: 'features', labelKey: 'sidebar.features', icon: Star },
    { id: 'topFeatures', labelKey: 'sidebar.topFeatures', icon: Target },
    { id: 'whyUs', labelKey: 'sidebar.whyChooseUs', icon: ShieldCheck },
    { id: 'traction', labelKey: 'sidebar.traction', icon: TrendingUp },
    { id: 'pricing', labelKey: 'sidebar.pricing', icon: CreditCard },
    { id: 'legacy', labelKey: 'sidebar.legacy', icon: Users },
    { id: 'testimonials', labelKey: 'sidebar.testimonials', icon: MessageSquare },
    { id: 'faq', labelKey: 'sidebar.faq', icon: HelpCircle },
    { id: 'messages', labelKey: 'sidebar.messages', icon: FileQuestion },
    { id: 'settings', labelKey: 'sidebar.generalSettings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 dark:bg-zinc-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (isRTL ? '100%' : '-100%'),
          width: '280px'
        }}
        className={`fixed lg:sticky top-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} h-screen z-50 flex flex-col bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 transition-transform duration-300 lg:translate-x-0 overflow-hidden`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center gap-3">
            {content.brand?.logoUrl ? (
              <img src={content.brand.logoUrl} alt="Skooture" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <span className="font-bold text-xl text-slate-900 dark:text-white">Skooture</span>
              </>
            )}
          </div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 bg-white dark:bg-zinc-950">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? 'secondary' : 'ghost'}
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={cn(
                  "w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  isActive 
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 shadow-sm" 
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", !isActive && "opacity-70")} />
                <span className="truncate">{t(item.labelKey)}</span>
              </Button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
            <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 mb-1">Skooture Admin</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">v2.0.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
