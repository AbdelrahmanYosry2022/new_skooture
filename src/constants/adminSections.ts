import {
  LayoutDashboard,
  Type,
  BarChart3,
  History,
  Zap,
  Quote,
  CreditCard,
  HelpCircle,
  Settings,
  Target,
  Layout,
  MessageSquare,
  Menu,
} from 'lucide-react';
import type { AdminSection } from '../types';

export function getAdminSections(
  t: (key: string) => string,
  messageCount: number,
): AdminSection[] {
  return [
    { id: 'overview', label: t('sections.overview'), icon: LayoutDashboard },
    { id: 'general', label: t('sections.general'), icon: Layout },
    { id: 'header', label: t('sections.header'), icon: Menu },
    { id: 'hero', label: t('sections.hero'), icon: Type },
    { id: 'traction', label: t('sections.traction'), icon: BarChart3 },
    { id: 'legacy', label: t('sections.legacy'), icon: History },
    { id: 'features', label: t('sections.features'), icon: Zap },
    { id: 'topFeatures', label: t('sections.topFeatures'), icon: Target },
    { id: 'testimonials', label: t('sections.testimonials'), icon: Quote },
    { id: 'pricing', label: t('sections.pricing'), icon: CreditCard },
    { id: 'faq', label: t('sections.faq'), icon: HelpCircle },
    { id: 'messages', label: t('sections.messages'), icon: MessageSquare, badge: messageCount },
    { id: 'settings', label: t('sections.settings'), icon: Settings },
  ];
}
