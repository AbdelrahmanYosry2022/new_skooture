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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 dark:bg-zinc-950/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 start-0 h-screen z-50 flex flex-col w-64 bg-background border-e transition-transform duration-300 overflow-hidden",
          isOpen ? "translate-x-0" : (isRTL ? "translate-x-full lg:translate-x-0" : "-translate-x-full lg:translate-x-0")
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="p-6 flex items-center justify-between border-b bg-background">
          <div className="flex items-center gap-3">
            {content.brand?.logoUrl ? (
              <img src={content.brand.logoUrl} alt="Skooture" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                  S
                </div>
                <span className="font-bold text-xl text-foreground">Skooture</span>
              </>
            )}
          </div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 bg-background">
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
                    ? "bg-primary/10 text-primary hover:bg-primary/15 shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", !isActive && "opacity-70")} />
                <span className="truncate">{t(item.labelKey)}</span>
              </Button>
            );
          })}
        </nav>

        <div className="p-6 border-t bg-background">
          <div className="px-4 py-3 rounded-xl bg-muted/50 border">
            <p className="text-xs font-medium text-muted-foreground mb-1">Skooture Admin</p>
            <p className="text-sm font-bold text-foreground">v2.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
