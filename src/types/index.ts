import { LucideIcon } from 'lucide-react';

export type Language = 'en' | 'ar';

export interface Translatable {
  en: string;
  ar: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
  createdAt?: string; // from backend
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface TractionStat {
  value: number;
  label: Translatable;
  icon: string;
}

export interface LegacyItem {
  year: string;
  title: Translatable;
  description: Translatable;
}

export interface AiFeature {
  title: Translatable;
  description: Translatable;
  icon: string;
}

export interface BentoFeature {
  title: Translatable;
  description: Translatable;
  icon: string;
}

export interface TestimonialItem {
  quote: Translatable;
  author: Translatable;
  role: Translatable;
}

export interface PlanFeature {
  name: Translatable;
  included: boolean;
}

export interface PricingPlan {
  name: Translatable;
  badge: Translatable;
  details: (Translatable | string)[];
  features: PlanFeature[];
  highlighted?: boolean;
  popular?: boolean;
  price?: {
    monthly: string;
    annual: string;
  };
}

export interface FaqItem {
  question: Translatable;
  answer: Translatable;
}

export interface SiteContent {
  brand: { logoUrl: string };
  hero: {
    topBadge: Translatable;
    videoUrl: string;
    headline: Translatable;
    subheadline: Translatable;
    buttons: {
      demo: Translatable;
      explore: Translatable;
    };
  };
  partners: {
    title: Translatable;
    logos: string[];
  };
  traction: TractionStat[];
  legacy: {
    title: Translatable;
    items: LegacyItem[];
  };
  why: {
    title: Translatable;
    content: Translatable;
    labels: {
      v1: string;
      legacySystem: Translatable;
      monolithic: Translatable;
      globalAi: Translatable;
      scalable: Translatable;
    };
  };
  global: {
    title: Translatable;
    locations: { name: Translatable }[];
  };
  aiCore: {
    title: Translatable;
    features: AiFeature[];
  };
  topFeatures: {
    title: Translatable;
    buttonMore: Translatable;
    buttonLess: Translatable;
    items: Translatable[];
  };
  bentoFeatures: {
    title: Translatable;
    features: BentoFeature[];
  };
  testimonials: {
    title: Translatable;
    items: TestimonialItem[];
  };
  pricing: {
    title: Translatable;
    button: Translatable;
    plans: PricingPlan[];
  };
  faq: {
    title: Translatable;
    items: FaqItem[];
  };
  cta: {
    title: Translatable;
    subtitle: Translatable;
    button: Translatable;
  };
  footer?: {
    social?: { icon: string; url: string }[];
    columns?: {
      title: Translatable;
      links: { label: Translatable; url: string }[];
    }[];
    copyright?: Translatable;
    bottomLinks?: { label: Translatable; url: string }[];
  };
}

export interface AdminSection {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export interface AdminSectionProps {
  localContent: SiteContent;
  updateNestedContent: (path: string[], value: any) => void;
  isRTL: boolean;
}
