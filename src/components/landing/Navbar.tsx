import { useState, useEffect } from 'react';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

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
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 shadow-sm py-4" 
          : "bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm border-b border-transparent py-6"
      )}
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
                <span className="font-bold text-2xl text-slate-900 dark:text-white">
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
                  className="text-sm font-medium transition-colors hover:text-blue-600 text-slate-600 dark:text-zinc-300"
                >
                  {t(link.label)}
                </a>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:border-zinc-800"></div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-slate-600 dark:text-zinc-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Button
                variant="ghost"
                onClick={handleLanguageToggle}
                className="text-slate-600 dark:text-zinc-300 gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'عربي' : 'English'}</span>
              </Button>

              <Link to="/admin">
                <Button variant="outline" className="font-medium">
                  {t({ en: 'Admin', ar: 'الإدارة' })}
                </Button>
              </Link>
              
              <a href="#contact">
                <Button className="font-medium">
                  {t(content?.cta?.button || { en: 'Get Started', ar: 'ابدأ الآن' })}
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
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
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="justify-start gap-3 text-slate-600 dark:text-zinc-400 px-0"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleLanguageToggle}
                  className="justify-start gap-2 text-slate-600 dark:text-zinc-400 px-0"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === 'en' ? 'عربي' : 'English'}</span>
                </Button>
              </div>

              <div className="flex flex-col gap-3 mt-4">
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full font-medium">
                    {t({ en: 'Admin Dashboard', ar: 'لوحة التحكم' })}
                  </Button>
                </Link>
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full font-medium">
                    {t(content?.cta?.button || { en: 'Get Started', ar: 'ابدأ الآن' })}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
