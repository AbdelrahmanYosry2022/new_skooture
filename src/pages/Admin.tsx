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
        return <OverviewSection />;
      case 'general':
        return <GeneralSection {...sectionProps} />;
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
        return <OverviewSection />;
    }
  };

  return (
    <div
      className={`admin-dashboard min-h-screen bg-slate-50 dark:bg-zinc-950 flex transition-colors duration-500 ${isRTL ? 'font-arabic flex-row-reverse' : 'flex-row'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Sidebar
        currentSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-zinc-950 relative">
        <AdminHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Quick save actions bar - sticky at top */}
            <div className="sticky top-0 z-20 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                {activeSection.replace(/([A-Z])/g, ' $1').trim()}
              </h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={resetToDefault}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  {isRTL ? 'إعادة الضبط' : 'Reset'}
                </button>
                <button
                  onClick={handleSave}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                    isSaved 
                      ? 'bg-emerald-500 hover:bg-emerald-600' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/20'
                  }`}
                >
                  {isSaved ? (isRTL ? 'تم الحفظ' : 'Saved!') : (isRTL ? 'حفظ التغييرات' : 'Save Changes')}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
