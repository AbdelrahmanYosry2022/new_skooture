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
    { href: '#features', label: { en: 'Features', ar: 'المميزات' } },
    { href: '#pricing', label: { en: 'Pricing', ar: 'الأسعار' } },
    { href: '#company', label: { en: 'Company', ar: 'الشركة' } },
    { href: '#contact', label: { en: 'Contact', ar: 'اتصل بنا' } },
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
          ? "bg-[#1a1a1a]/80 backdrop-blur-md border-b border-white/10 shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            {content?.brand?.logoUrl ? (
              <img src={content.brand.logoUrl} alt="Skooture" className="h-8 w-auto" />
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff5722] to-[#fcbda2] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(255,87,34,0.3)] shrink-0">
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                </div>
                <span className="font-bold text-[19px] text-white tracking-tight">
                  Soft Pro
                </span>
              </>
            )}
          </a>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[15px] font-medium transition-colors hover:text-white text-white/90"
                >
                  {t(link.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center justify-end gap-6 shrink-0">
            <Button
              variant="ghost"
              onClick={handleLanguageToggle}
              className="text-white hover:text-white hover:bg-white/5 font-medium px-2"
            >
              <span>{language === 'en' ? 'عربي' : 'English'}</span>
            </Button>

            <Link to="/admin" className="text-[15px] font-medium text-white transition-colors hover:text-[#ff5722]">
              {t({ en: 'Login', ar: 'تسجيل الدخول' })}
            </Link>
            
            <a href="#contact">
              <Button className="px-5 py-[10px] rounded-[8px] bg-[#ff5722] text-white font-semibold text-[15px] transition-all duration-200 shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:bg-[#ff5024] border-0 h-auto">
                {t({ en: 'Get Template', ar: 'احصل على القالب' })}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
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
