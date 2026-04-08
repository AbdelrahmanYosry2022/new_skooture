import { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { logout } from '../api/client';

import { getAdminSections } from '../constants/adminSections';
import { useAdminContent } from '../hooks/useAdminContent';

import Sidebar from '../components/admin/layout/Sidebar';
import AdminHeader from '../components/admin/layout/AdminHeader';

import OverviewSection from '../components/admin/sections/OverviewSection';
import HeroSection from '../components/admin/sections/HeroSection';
import TractionSection from '../components/admin/sections/TractionSection';
import LegacySection from '../components/admin/sections/LegacySection';
import FeaturesSection from '../components/admin/sections/FeaturesSection';
import TopFeaturesSection from '../components/admin/sections/TopFeaturesSection';
import TestimonialsSection from '../components/admin/sections/TestimonialsSection';
import PricingSection from '../components/admin/sections/PricingSection';
import FaqSection from '../components/admin/sections/FaqSection';
import MessagesSection from '../components/admin/sections/MessagesSection';
import SubscribersSection from '../components/admin/sections/SubscribersSection';
import SettingsSection from '../components/admin/sections/SettingsSection';

export default function Admin() {
  const { content, setContent, resetToDefault, adminLanguage, setAdminLanguage, messages, refreshMessages } = useContent();
  const { adminTheme, setAdminTheme } = useTheme();
  const { t } = useTranslation('admin');
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<any>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { localContent, updateNestedContent } = useAdminContent(content);

  useEffect(() => { refreshMessages(); }, [refreshMessages]);

  const sections = getAdminSections(t, messages.length);
  // Always use adminLanguage for dashboard layout direction to ensure consistency
  const isRTL = adminLanguage === 'ar' || (adminLanguage as string) === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
    // Force specific classes on body for RTL support in the dashboard
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [isRTL]);

  const handleSave = async () => {
    await setContent(localContent as any);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sectionProps = { localContent, updateNestedContent, isRTL };

  const getTitleKey = (id: string) => {
    const map: Record<string, string> = {
      overview: 'sidebar.overview',
      hero: 'sidebar.heroSection',
      features: 'sidebar.features',
      topFeatures: 'sidebar.topFeatures',
      traction: 'sidebar.traction',
      pricing: 'sidebar.pricing',
      legacy: 'sidebar.legacy',
      testimonials: 'sidebar.testimonials',
      faq: 'sidebar.faq',
      messages: 'sidebar.messages',
      subscribers: 'sidebar.subscribers',
      settings: 'sidebar.generalSettings'
    };
    return map[id] || 'header.dashboard';
  };
  const activeSectionTitle = t(getTitleKey(activeSection));

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'hero':
        return <HeroSection {...sectionProps} />;
      case 'traction':
        return <TractionSection {...sectionProps} />;
      case 'legacy':
        return <LegacySection {...sectionProps} />;
      case 'features':
        return <FeaturesSection {...sectionProps} />;
      case 'topFeatures':
        return <TopFeaturesSection {...sectionProps} />;
      case 'testimonials':
        return <TestimonialsSection {...sectionProps} />;
      case 'pricing':
        return <PricingSection {...sectionProps} />;
      case 'faq':
        return <FaqSection {...sectionProps} />;
      case 'messages':
        return <MessagesSection messages={messages} isRTL={isRTL} />;
      case 'subscribers':
        return <SubscribersSection isRTL={isRTL} />;
      case 'settings':
        return (
          <SettingsSection
            isRTL={isRTL}
            adminLanguage={adminLanguage}
            adminTheme={adminTheme}
            setAdminLanguage={setAdminLanguage}
            setAdminTheme={setAdminTheme}
            localContent={localContent}
            updateNestedContent={updateNestedContent}
          />
        );
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#000000] flex transition-colors duration-500 font-sans"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Sidebar
        currentSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#000000] relative">
        <AdminHeader
          title={activeSectionTitle}
          onMenuClick={() => setIsSidebarOpen(true)}
          onSave={handleSave}
          onReset={resetToDefault}
          isSaved={isSaved}
          showActions={activeSection !== 'overview' && activeSection !== 'messages' && activeSection !== 'subscribers'}
        />
        
        {/* Dynamic App-like Layout - Removed the double container wrapper */}
        <div className="flex-1 w-full h-full bg-[#000000] overflow-hidden flex flex-col relative">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(235,69,32,0.05)_0%,transparent_70%)] pointer-events-none" />

          {/* Form Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
            <div className="w-[90%] mx-auto py-8">
              <AnimatePresence mode="wait">
                {renderSection()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
