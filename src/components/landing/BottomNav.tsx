import { useEffect, useMemo, useState } from 'react';
import { Home, BookOpen, User } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { DEFAULT_HEADER_SETTINGS } from '../../constants/headerSettings';

function scrollToTargetId(targetId: string) {
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function BottomNav() {
  const { content, language } = useContent();

  const headerSettings = content.headerSettings ?? DEFAULT_HEADER_SETTINGS;
  const bottomNav = headerSettings.bottomNav ?? DEFAULT_HEADER_SETTINGS.bottomNav;
  const home = bottomNav.home;
  const courses = bottomNav.courses;
  const accountHref = bottomNav.accountHref;

  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  });

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  const offlineText = language === 'en' ? 'You are browsing without connection' : 'أنت الآن تتصفح بدون اتصال';

  const onAccountClick = () => {
    if (!accountHref) return;
    window.location.href = accountHref;
  };

  const glowStyle = useMemo(() => {
    const mobileGlow = headerSettings.glowColors?.mobile ?? DEFAULT_HEADER_SETTINGS.glowColors.mobile;
    return { boxShadow: `0 0 24px ${mobileGlow}` };
  }, [headerSettings.glowColors?.mobile]);

  return (
    <div className="md:hidden fixed left-0 right-0 bottom-0 z-40 pointer-events-none" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="pointer-events-auto mx-4 mb-4">
        <div className="glass-card rounded-[2rem] px-4 py-3 flex flex-col items-stretch">
          {!isOnline && (
            <div
              className="mb-3 rounded-2xl px-4 py-2 text-center border border-white/10 bg-white/20 dark:bg-zinc-950/30 backdrop-blur-xl"
              style={glowStyle}
              role="status"
            >
              <span className="text-xs font-black text-zinc-900 dark:text-white">{offlineText}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <div className="flex justify-center">
              {home.enabled ? (
                <button
                  onClick={() => scrollToTargetId(home.targetId)}
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
                  aria-label="Home"
                >
                  <Home size={20} className="text-blue-600 dark:text-blue-400" />
                </button>
              ) : (
                <div className="w-12 h-12 rounded-2xl" aria-hidden />
              )}
            </div>

            <div className="flex justify-center">
              {courses.enabled ? (
                <button
                  onClick={() => scrollToTargetId(courses.targetId)}
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
                  aria-label="Courses"
                >
                  <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                </button>
              ) : (
                <div className="w-12 h-12 rounded-2xl" aria-hidden />
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onAccountClick}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
                aria-label="Account"
              >
                <User size={20} className="text-zinc-700 dark:text-zinc-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

