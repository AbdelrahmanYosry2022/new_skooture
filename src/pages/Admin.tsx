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
import GeneralSection from '../components/admin/sections/GeneralSection';
import HeroSection from '../components/admin/sections/HeroSection';
import TractionSection from '../components/admin/sections/TractionSection';
import LegacySection from '../components/admin/sections/LegacySection';
import FeaturesSection from '../components/admin/sections/FeaturesSection';
import TopFeaturesSection from '../components/admin/sections/TopFeaturesSection';
import TestimonialsSection from '../components/admin/sections/TestimonialsSection';
import PricingSection from '../components/admin/sections/PricingSection';
import FaqSection from '../components/admin/sections/FaqSection';
import MessagesSection from '../components/admin/sections/MessagesSection';
import SettingsSection from '../components/admin/sections/SettingsSection';
import HeaderSettingsSection from '../components/admin/sections/HeaderSettingsSection';

export default function Admin() {
  const { content, setContent, resetToDefault, adminLanguage, setAdminLanguage, messages, refreshMessages } = useContent();
  const { adminTheme, setAdminTheme } = useTheme();
  const { t } = useTranslation('admin');
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('hero');
  const [isSaved, setIsSaved] = useState(false);
  const { localContent, updateNestedContent } = useAdminContent(content);

  useEffect(() => { refreshMessages(); }, [refreshMessages]);

  const sections = getAdminSections(t, messages.length);
  const isRTL = adminLanguage === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.body.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const handleSave = () => {
    setContent(localContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sectionProps = { localContent, updateNestedContent, isRTL };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection isRTL={isRTL} messages={messages} setActiveSection={setActiveSection} />;
      case 'general':
        return <GeneralSection {...sectionProps} />;
      case 'header':
        return <HeaderSettingsSection {...sectionProps} />;
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
      case 'settings':
        return (
          <SettingsSection
            isRTL={isRTL}
            adminLanguage={adminLanguage}
            adminTheme={adminTheme}
            setAdminLanguage={setAdminLanguage}
            setAdminTheme={setAdminTheme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`admin-dashboard min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-row transition-colors duration-500 ${isRTL ? 'admin-rtl font-arabic' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <main className="flex-1 overflow-y-auto max-h-screen scroll-smooth bg-[#f8fafc] dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-8 py-10 space-y-10">
          <AdminHeader
            adminLanguage={adminLanguage}
            isRTL={isRTL}
            activeSection={activeSection}
            sections={sections}
            isSaved={isSaved}
            onSave={handleSave}
            onReset={resetToDefault}
          />

          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
