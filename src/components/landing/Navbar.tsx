import { useEffect, useMemo, useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Settings, Sun, Moon, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_HEADER_SETTINGS } from '../../constants/headerSettings';

export default function Navbar() {
  const { content, language, setLanguage } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const headerSettings = content.headerSettings ?? DEFAULT_HEADER_SETTINGS;
  const mobileGlowColor = headerSettings.glowColors?.mobile ?? DEFAULT_HEADER_SETTINGS.glowColors.mobile;

  type NavKey = 'home' | 'features' | 'pricing' | 'faq' | 'contact';
  const navItems = useMemo(() => {
    const map: Array<{
      key: NavKey;
      label: { en: string; ar: string };
      enabledMobile: boolean;
      targetId: string;
    }> = [
      { key: 'home', label: { en: 'Home', ar: 'الرئيسية' }, enabledMobile: true, targetId: 'home' },
      { key: 'features', label: { en: 'Features', ar: 'المميزات' }, enabledMobile: true, targetId: 'features' },
      { key: 'pricing', label: { en: 'Pricing', ar: 'الأسعار' }, enabledMobile: true, targetId: 'pricing' },
      { key: 'faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' }, enabledMobile: true, targetId: 'faq' },
      { key: 'contact', label: { en: 'Contact', ar: 'تواصل معنا' }, enabledMobile: true, targetId: 'contact' },
    ];

    const links = headerSettings.mobileMenuLinks ?? DEFAULT_HEADER_SETTINGS.mobileMenuLinks;
    return map.map((item) => {
      const cfg = links[item.key] ?? DEFAULT_HEADER_SETTINGS.mobileMenuLinks[item.key];
      return { ...item, enabledMobile: cfg.enabled, targetId: cfg.targetId };
    });
  }, [headerSettings.mobileMenuLinks]);

  const MenuIcon = useMemo(() => {
    const iconName = headerSettings.menuIcon ?? DEFAULT_HEADER_SETTINGS.menuIcon;
    const Icon = (LucideIcons as any)[iconName];
    return Icon || (LucideIcons as any).Menu || X;
  }, [headerSettings.menuIcon]);

  return (
    <>
      <div
        className="fixed top-0 w-full z-50 flex justify-center px-4 pointer-events-none"
        style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top))' }}
      >
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`pointer-events-auto transition-all duration-500 ease-in-out px-6 flex items-center justify-between gap-8 h-16 rounded-full border shadow-2xl ${
            isScrolled
              ? 'glass w-full max-w-5xl shadow-blue-500/10'
              : 'bg-transparent border-transparent w-full max-w-7xl'
          }`}
        >
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                {content.brand?.logoUrl ? (
                  <img
                    src={content.brand.logoUrl}
                    alt="Logo"
                    className="h-10 object-contain relative z-10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center relative z-10 shadow-lg">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                )}
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.targetId)}
                className="text-[13px] font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all cursor-pointer relative group"
              >
                {language === 'en' ? link.label.en : link.label.ar}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              aria-label="Open menu"
              style={{ boxShadow: `0 0 24px ${mobileGlowColor}` }}
            >
              <MenuIcon size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            >
              <Globe size={14} />
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            <button
              onClick={() => (window.location.href = '/admin')}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer"
            >
              <Settings size={14} />
              <span className="hidden sm:inline">{language === 'en' ? 'Dashboard' : 'الإدارة'}</span>
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              role="button"
              tabIndex={-1}
              aria-label="Close menu overlay"
            />

            <motion.div
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -8, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative px-4"
              style={{
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'calc(88px + env(safe-area-inset-bottom))',
              }}
            >
              <div
                className="glass-card rounded-[2rem] border border-white/10 px-4 py-5 shadow-2xl"
                style={{ boxShadow: `0 0 40px ${mobileGlowColor}` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="font-black text-zinc-900 dark:text-white">
                    {language === 'en' ? 'Menu' : 'القائمة'}
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full glass flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                  {navItems
                    .filter((x) => x.enabledMobile)
                    .map((link) => (
                      <button
                        key={link.key}
                        onClick={() => {
                          setIsMenuOpen(false);
                          scrollTo(link.targetId);
                        }}
                        className="w-full flex items-center justify-between gap-4 px-4 py-4 rounded-[1.5rem] glass-card border-zinc-200/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
                      >
                        <span className="font-black text-zinc-900 dark:text-white">
                          {language === 'en' ? link.label.en : link.label.ar}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 font-black">→</span>
                      </button>
                    ))}

                  {navItems.filter((x) => x.enabledMobile).length === 0 && (
                    <div className="text-center text-zinc-400 font-bold py-10">
                      {language === 'en' ? 'No links enabled' : 'لا توجد روابط مفعلة'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
