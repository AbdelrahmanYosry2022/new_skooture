import { useEffect } from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import IconPicker from '../shared/IconPicker';
import type { AdminSectionProps, HeaderSettings, HeaderMobileMenuLinkConfig } from '../../../types';
import { useContent } from '../../../context/ContentContext';
import { DEFAULT_HEADER_SETTINGS } from '../../../constants/headerSettings';

type MobileMenuKey = 'home' | 'features' | 'pricing' | 'faq' | 'contact';

const MOBILE_MENU_KEYS: MobileMenuKey[] = ['home', 'features', 'pricing', 'faq', 'contact'];

function resolveMenuLink(
  headerSettings: HeaderSettings | undefined,
  key: MobileMenuKey,
): HeaderMobileMenuLinkConfig {
  return headerSettings?.mobileMenuLinks?.[key] ?? DEFAULT_HEADER_SETTINGS.mobileMenuLinks[key];
}

export default function HeaderSettingsSection({
  localContent,
  updateNestedContent,
}: AdminSectionProps) {
  const { adminLanguage } = useContent();

  useEffect(() => {
    const existing = localContent.headerSettings;
    if (!existing) {
      updateNestedContent(['headerSettings'], DEFAULT_HEADER_SETTINGS);
      return;
    }

    // Deep merge missing headerSettings parts for older DBs.
    const merged: HeaderSettings = {
      ...DEFAULT_HEADER_SETTINGS,
      ...existing,
      glowColors: {
        ...DEFAULT_HEADER_SETTINGS.glowColors,
        ...(existing.glowColors ?? {}),
      },
      mobileMenuLinks: {
        ...DEFAULT_HEADER_SETTINGS.mobileMenuLinks,
        ...(existing.mobileMenuLinks ?? {}),
      },
      bottomNav: {
        ...DEFAULT_HEADER_SETTINGS.bottomNav,
        ...(existing.bottomNav ?? {}),
        home: {
          ...DEFAULT_HEADER_SETTINGS.bottomNav.home,
          ...(existing.bottomNav?.home ?? {}),
        },
        courses: {
          ...DEFAULT_HEADER_SETTINGS.bottomNav.courses,
          ...(existing.bottomNav?.courses ?? {}),
        },
      },
    };

    const isSameAsDefaults =
      JSON.stringify(existing) === JSON.stringify(merged);
    if (!isSameAsDefaults) {
      updateNestedContent(['headerSettings'], merged);
    }
  }, [localContent.headerSettings, updateNestedContent]);

  const hs = localContent.headerSettings ?? DEFAULT_HEADER_SETTINGS;
  const mobileGlowColor = hs.glowColors?.mobile ?? DEFAULT_HEADER_SETTINGS.glowColors.mobile;

  const bottomHome = hs.bottomNav?.home ?? DEFAULT_HEADER_SETTINGS.bottomNav.home;
  const bottomCourses = hs.bottomNav?.courses ?? DEFAULT_HEADER_SETTINGS.bottomNav.courses;
  const accountHref = hs.bottomNav?.accountHref ?? DEFAULT_HEADER_SETTINGS.bottomNav.accountHref;

  const labelForKey = (key: MobileMenuKey) => {
    const map = {
      home: { en: 'Home', ar: 'الرئيسية' },
      features: { en: 'Features', ar: 'المميزات' },
      pricing: { en: 'Pricing', ar: 'الأسعار' },
      faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
      contact: { en: 'Contact', ar: 'تواصل معنا' },
    } as const;
    return map[key][adminLanguage];
  };

  return (
    <SectionWrapper
      key="header-settings"
      title="Header Settings"
      description="Control mobile menu links, icon, glow colors, and bottom navigation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <IconPicker
            label="Menu Icon"
            value={hs.menuIcon ?? DEFAULT_HEADER_SETTINGS.menuIcon}
            onChange={(val) => updateNestedContent(['headerSettings', 'menuIcon'], val)}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[11px] uppercase tracking-[0.2em] font-black text-zinc-400 dark:text-zinc-500 px-1">
            Mobile Glow Color (CSS)
          </label>
          <input
            type="text"
            value={mobileGlowColor}
            onChange={(e) => updateNestedContent(['headerSettings', 'glowColors', 'mobile'], e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 focus:border-blue-500/50 dark:focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            placeholder="rgba(59, 130, 246, 0.35)"
          />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Example: <span className="font-mono">{'rgba(59, 130, 246, 0.35)'}</span>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-black text-zinc-900 dark:text-white">{adminLanguage === 'en' ? 'Mobile Menu Links' : 'روابط قائمة الموبايل'}</h4>

        <div className="space-y-4">
          {MOBILE_MENU_KEYS.map((key) => {
            const link = resolveMenuLink(hs, key);
            return (
              <div
                key={key}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5"
              >
                <div className="min-w-[9rem]">
                  <div className="font-black text-sm text-zinc-900 dark:text-white">{labelForKey(key)}</div>
                  <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                    targetId
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 justify-end">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={link.enabled}
                      onChange={(e) =>
                        updateNestedContent(['headerSettings', 'mobileMenuLinks', key, 'enabled'], e.target.checked)
                      }
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      {adminLanguage === 'en' ? 'Show' : 'إظهار'}
                    </span>
                  </label>

                  <input
                    type="text"
                    value={link.targetId}
                    onChange={(e) =>
                      updateNestedContent(['headerSettings', 'mobileMenuLinks', key, 'targetId'], e.target.value)
                    }
                    className="w-[11rem] px-4 py-2 rounded-xl bg-white/60 dark:bg-black/20 border border-zinc-200 dark:border-white/5 focus:border-blue-500 outline-none transition-all font-bold text-zinc-900 dark:text-white"
                    placeholder={DEFAULT_HEADER_SETTINGS.mobileMenuLinks[key].targetId}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-black text-zinc-900 dark:text-white">
            {adminLanguage === 'en' ? 'Bottom Navigation Bar' : 'شريط التنقل السفلي'}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
              <div className="font-black text-sm text-zinc-900 dark:text-white">{adminLanguage === 'en' ? 'Home' : 'الرئيسية'}</div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bottomHome.enabled}
                  onChange={(e) => updateNestedContent(['headerSettings', 'bottomNav', 'home', 'enabled'], e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{adminLanguage === 'en' ? 'Show' : 'إظهار'}</span>
              </label>
              <input
                type="text"
                value={bottomHome.targetId}
                onChange={(e) => updateNestedContent(['headerSettings', 'bottomNav', 'home', 'targetId'], e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-black/20 border border-zinc-200 dark:border-white/5 focus:border-blue-500 outline-none transition-all font-bold text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
              <div className="font-black text-sm text-zinc-900 dark:text-white">{adminLanguage === 'en' ? 'Courses' : 'الدورات'}</div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bottomCourses.enabled}
                  onChange={(e) =>
                    updateNestedContent(['headerSettings', 'bottomNav', 'courses', 'enabled'], e.target.checked)
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{adminLanguage === 'en' ? 'Show' : 'إظهار'}</span>
              </label>
              <input
                type="text"
                value={bottomCourses.targetId}
                onChange={(e) => updateNestedContent(['headerSettings', 'bottomNav', 'courses', 'targetId'], e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-black/20 border border-zinc-200 dark:border-white/5 focus:border-blue-500 outline-none transition-all font-bold text-zinc-900 dark:text-white"
              />
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5">
              <div className="font-black text-sm text-zinc-900 dark:text-white">{adminLanguage === 'en' ? 'Account' : 'الحساب الشخصي'}</div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                href
              </div>
              <input
                type="text"
                value={accountHref}
                onChange={(e) => updateNestedContent(['headerSettings', 'bottomNav', 'accountHref'], e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/60 dark:bg-black/20 border border-zinc-200 dark:border-white/5 focus:border-blue-500 outline-none transition-all font-bold text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

