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
import type { AdminSection } from '../../../types';
import { useContent } from '../../../context/ContentContext';

interface SidebarProps {
  currentSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ currentSection, onSectionChange, isOpen, setIsOpen }: SidebarProps) {
  const { language } = useContent();
  const isRTL = language === 'ar';

  const menuItems: { id: AdminSection; label: { en: string; ar: string }; icon: React.ElementType }[] = [
    { id: 'overview', label: { en: 'Overview', ar: 'نظرة عامة' }, icon: LayoutDashboard },
    { id: 'general', label: { en: 'General Settings', ar: 'الإعدادات العامة' }, icon: Settings },
    { id: 'hero', label: { en: 'Hero Section', ar: 'القسم الرئيسي' }, icon: LayoutTemplate },
    { id: 'features', label: { en: 'Features', ar: 'المميزات' }, icon: Star },
    { id: 'topFeatures', label: { en: 'Top Features', ar: 'أهم المميزات' }, icon: Target },
    { id: 'whyUs', label: { en: 'Why Choose Us', ar: 'لماذا نحن' }, icon: ShieldCheck },
    { id: 'traction', label: { en: 'Traction', ar: 'الأرقام والإحصائيات' }, icon: TrendingUp },
    { id: 'pricing', label: { en: 'Pricing', ar: 'الباقات والأسعار' }, icon: CreditCard },
    { id: 'legacy', label: { en: 'Legacy', ar: 'الإرث' }, icon: Users },
    { id: 'testimonials', label: { en: 'Testimonials', ar: 'آراء العملاء' }, icon: MessageSquare },
    { id: 'faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' }, icon: HelpCircle },
    { id: 'messages', label: { en: 'Messages', ar: 'الرسائل' }, icon: FileQuestion },
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
        className={`fixed lg:sticky top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen z-50 flex flex-col admin-sidebar transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xl">
              S
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">Skooture</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? '' : 'opacity-70'}`} />
                <span className="truncate">{item.label[language]}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-zinc-800">
          <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800">
            <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 mb-1">Skooture Admin</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">v2.0.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
