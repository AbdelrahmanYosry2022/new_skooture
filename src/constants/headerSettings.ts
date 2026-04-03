import type { HeaderSettings } from '../types';

export const DEFAULT_HEADER_SETTINGS: HeaderSettings = {
  menuIcon: 'Menu',
  glowColors: {
    mobile: 'rgba(59, 130, 246, 0.35)',
  },
  mobileMenuLinks: {
    home: { enabled: true, targetId: 'home' },
    features: { enabled: true, targetId: 'features' },
    pricing: { enabled: true, targetId: 'pricing' },
    faq: { enabled: true, targetId: 'faq' },
    contact: { enabled: true, targetId: 'contact' },
  },
  bottomNav: {
    home: { enabled: true, targetId: 'home' },
    courses: { enabled: true, targetId: 'features' },
    accountHref: '/login',
  },
};

