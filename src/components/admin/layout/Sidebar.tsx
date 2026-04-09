import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  HelpCircle,
  Mail
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
  const { adminLanguage, content } = useContent();
  const { t } = useTranslation('admin');
  const isRTL = adminLanguage === 'ar';

  const menuItems: { id: string; labelKey: string; icon: React.ElementType }[] = [
    { id: 'overview', labelKey: 'sidebar.overview', icon: LayoutDashboard },
    { id: 'hero', labelKey: 'sidebar.heroSection', icon: LayoutTemplate },
    { id: 'features', labelKey: 'sidebar.features', icon: Star },
    { id: 'topFeatures', labelKey: 'sidebar.topFeatures', icon: Target },
    { id: 'traction', labelKey: 'sidebar.traction', icon: TrendingUp },
    { id: 'pricing', labelKey: 'sidebar.pricing', icon: CreditCard },
    { id: 'legacy', labelKey: 'sidebar.legacy', icon: Users },
    { id: 'testimonials', labelKey: 'sidebar.testimonials', icon: MessageSquare },
    { id: 'faq', labelKey: 'sidebar.faq', icon: HelpCircle },
    { id: 'messages', labelKey: 'sidebar.messages', icon: FileQuestion },
    { id: 'subscribers', labelKey: 'sidebar.subscribers', icon: Mail },
    { id: 'settings', labelKey: 'sidebar.generalSettings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 start-0 h-screen z-50 flex flex-col w-64 bg-[#000000] border-e border-white/[0.05] transition-transform duration-300 overflow-hidden",
          isOpen ? "translate-x-0" : (isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0")
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/[0.05] bg-[#000000]">
          <div className="flex items-center gap-3">
            {content.brand?.logoUrl ? (
              <img src={content.brand.logoUrl} alt="Skooture" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-[10px] bg-[#191919] border border-white/[0.08] flex items-center justify-center font-bold text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.09)]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a86b] to-[#b3f0d4]">S</span>
                </div>
                <span className="font-bold text-xl text-white">Skooture</span>
              </>
            )}
          </div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-[#aeaeae] hover:text-white"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 bg-[#000000] custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={cn(
                  "w-full justify-start gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 text-sm font-medium border-0 hover:bg-white/[0.05]",
                  isActive 
                    ? "bg-[#191919] text-[#ffffff] shadow-[inset_0_1px_16px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/[0.02]" 
                    : "text-[#aeaeae] hover:text-[#ffffff]"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-[#00a86b]" : "opacity-70")} />
                <span className="truncate">{t(item.labelKey)}</span>
              </Button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/[0.05] bg-[#000000]">
          <div className="px-4 py-3 rounded-[12px] bg-[#191919] border border-white/[0.05] shadow-[inset_0_1px_16px_rgba(255,255,255,0.02)]">
            <p className="text-xs font-medium text-[#aeaeae] mb-1">Skooture Admin</p>
            <p className="text-sm font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]">v2.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
