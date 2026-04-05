import { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content, t, language, setLanguage } = useContent();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: { en: 'Home', ar: 'الرئيسية' } },
    { href: '#features', label: { en: 'Features', ar: 'المميزات' } },
    { href: '#pricing', label: { en: 'Pricing', ar: 'الأسعار' } },
    { href: '#faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' } },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isRTL = language === 'ar';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            {content?.brand?.logoUrl ? (
              <img src={content.brand.logoUrl} alt="Skooture" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <span className={`font-bold text-2xl ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                  Skooture
                </span>
              </>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    scrolled ? 'text-slate-600 dark:text-zinc-300' : 'text-slate-600 dark:text-zinc-300'
                  }`}
                >
                  {t(link.label)}
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-zinc-800"></div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  scrolled 
                    ? 'text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800' 
                    : 'text-slate-600 hover:bg-slate-100/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={handleLanguageToggle}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  scrolled 
                    ? 'text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800' 
                    : 'text-slate-600 hover:bg-slate-100/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'عربي' : 'English'}</span>
              </button>

              <a
                href="#contact"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-sm shadow-blue-600/20"
              >
                {t(content?.cta?.button || { en: 'Get Started', ar: 'ابدأ الآن' })}
              </a>
              
              <Link
                to="/admin"
                className={`px-4 py-2.5 text-sm font-medium transition-colors hover:text-blue-600 ${
                  scrolled ? 'text-slate-600 dark:text-zinc-300' : 'text-slate-600 dark:text-zinc-300'
                }`}
              >
                {t({ en: 'Admin', ar: 'الإدارة' })}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-900 dark:text-white"
                >
                  {t(link.label)}
                </a>
              ))}
              
              <hr className="border-slate-200 dark:border-zinc-800 my-2" />
              
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-slate-600 dark:text-zinc-400"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center gap-2 text-slate-600 dark:text-zinc-400"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === 'en' ? 'عربي' : 'English'}</span>
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium text-center"
                >
                  {t(content?.cta?.button || { en: 'Get Started', ar: 'ابدأ الآن' })}
                </a>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-slate-100 dark:bg-zinc-900 text-slate-900 dark:text-white rounded-xl font-medium text-center"
                >
                  {t({ en: 'Admin Dashboard', ar: 'لوحة التحكم' })}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
