# Design & Code Guidelines — new_skooture

> **مهم جداً:** هذا الملف هو المرجع الرئيسي لكل تعديل على الموقع.
> أي موديل أو مطور يعمل على هذا المشروع **يجب** الالتزام بكل ما يلي.
> المصدر الأصلي: [SaasPro Framer Design](https://www.figma.com/design/gzY6vaHVdoDnB7tCEEnrJa/saaspro-framer-design)

---

## 1. Color System (نظام الألوان)

### الألوان الأساسية من Figma (SaasPro)

| اسم اللون في Figma | القيمة الـ HEX | الاستخدام |
|---|---|---|
| `Cod Gray` | `#1a1a1a` | الخلفية الرئيسية (dark background) |
| `White` | `#ffffff` | النصوص على الخلفية الداكنة، عناصر مضيئة |
| `Orange` | `#ff5722` | الـ CTA buttons، العناصر التفاعلية الرئيسية |
| `Silver Chalice` | `#a1a1a1` | النصوص الثانوية (body text) |
| `Pomegranate` | `#f44336` | عناصر destructive / تحذيرات |

### ترجمتها في `src/index.css`

أضف هذه الألوان إلى الـ `@theme` block كمتغيرات:

```css
@theme {
  /* SaasPro Design Tokens */
  --color-cod-gray: #1a1a1a;
  --color-saas-orange: #ff5722;
  --color-silver-chalice: #a1a1a1;
  --color-pomegranate: #f44336;

  /* الموقع الحالي يستخدم Dark Mode كـ default */
  --color-background: #1a1a1a;          /* Cod Gray */
  --color-foreground: #ffffff;           /* White */
  --color-muted-foreground: #a1a1a1;     /* Silver Chalice */
  --color-accent: #ff5722;              /* Orange — CTA */
  --color-accent-foreground: #ffffff;
}
```

### قواعد استخدام الألوان

1. **الخلفية الرئيسية** دائماً `Cod Gray` (`#1a1a1a`) — لا تستخدم أبيض أو رمادي فاتح للخلفية الرئيسية
2. **الـ CTA الرئيسي** دائماً `Orange` (`#ff5722`) مع نص أبيض وـ box-shadow برتقالي خفيف
3. **النصوص الثانوية** `Silver Chalice` (`#a1a1a1`) — ليس أبيض ولا أسود
4. **الـ Cards** تأخذ خلفية أغمق قليلاً من الـ background، مع border شفاف أبيض (`rgba(255,255,255,0.08)`)
5. **التدرجات (Glows)** تُستخدم برتقالية أو بيضاء شفافة كـ radial gradient لإضافة depth

---

## 2. Typography (الخطوط والتصميم النصي)

### الخط الرئيسي

- **Inter** — الخط الوحيد المستخدم في SaasPro
- الأوزان المستخدمة: `400 (Regular)`, `500 (Medium)`, `600 (Semi Bold)`
- لا يُستخدم `700 (Bold)` في Figma الأصلي — استخدم `600` كحد أقصى

### مقاسات النصوص (من Figma)

| العنصر | الحجم التقريبي | الوزن | اللون |
|---|---|---|---|
| `h1` — Hero Heading | `clamp(2.5rem, 5vw, 4.5rem)` | `500 (Medium)` | White |
| `h2` — Section Heading | `clamp(2rem, 3.5vw, 3rem)` | `500 (Medium)` | White |
| `h3` — Card Heading | `1.25rem – 1.5rem` | `500 (Medium)` | White |
| Body / Paragraph | `1rem` | `400 (Regular)` | Silver Chalice |
| Badge Text | `0.75rem – 0.875rem` | `500 (Medium)` | Orange / White Gradient |
| Button Text | `1rem` | `600 (Semi Bold)` | White |
| Caption / Small | `0.875rem` | `400 (Regular)` | Silver Chalice |

### قواعد التصميم النصي

1. **Headings** لا تأخذ `font-weight: bold` (700) — استخدم `font-medium` (500) دائماً
2. **Line height** للـ headings: `1.1 – 1.2` (tight)
3. **Line height** للـ body: `1.6`
4. **Letter spacing** للـ headings: `-0.02em` (tight tracking)
5. **RTL**: استخدم `IBM Plex Sans Arabic` — مُضبوط تلقائياً في `[dir="rtl"]`

---

## 3. Component Patterns (أنماط المكونات)

### 3.1 Badge / Pill Component

مكون الـ badge المستخدم في بداية كل section لتصنيف المحتوى.

**البنية من Figma:**
```
Default (frame)
├── Dot (SVG — نقطة ملونة)
└── Badge text (frame)
    └── p.framer-text
        └── TEXT
```

**التطبيق في React + Tailwind:**
```tsx
// components/ui/SectionBadge.tsx
interface SectionBadgeProps {
  children: React.ReactNode;
}

export function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-[#1a1a1a] border border-white/10
                    text-sm font-medium text-white/80">
      {/* Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5722] flex-shrink-0" />
      {children}
    </div>
  );
}
```

**القواعد:**
- `border-radius: 21px` (fully rounded) دائماً
- الخلفية: `Cod Gray` مع border أبيض شفاف `rgba(255,255,255,0.1)`
- النقطة: دائماً Orange (`#ff5722`)
- النص: أبيض أو gradient أبيض-رمادي

---

### 3.2 Button — Primary (CTA)

**البنية من Figma:**
```
Large (frame) — Orange fill, border-radius: 10px, box-shadow orange glow
└── Text → Button (frame)
    └── p.framer-text
        └── TEXT — White, Semi Bold
```

**التطبيق:**
```tsx
// الـ Tailwind classes للـ CTA button الرئيسي
className="px-6 py-3 rounded-[10px] bg-[#ff5722] text-white font-semibold
           text-base transition-all duration-200
           shadow-[0_0_20px_rgba(255,87,34,0.4)]
           hover:shadow-[0_0_30px_rgba(255,87,34,0.6)]
           hover:bg-[#e64a19]"
```

**القواعد:**
- `border-radius: 10px` — ليس fully rounded
- Box shadow برتقالي خفيف دائماً (glow effect)
- Hover: يزيد الـ glow ويغمق اللون قليلاً
- لا يوجد border على الـ primary button

---

### 3.3 Card Component

**من Figma (Cards في "How it Works"):**
```
Card (frame) — dark fill, border-radius: 24px
├── Heading
│   ├── Number (circle) — orange/dark fill, glow shadow
│   └── Title (TEXT — White, Medium)
└── Description (TEXT — Silver Chalice, Regular)
```

**التطبيق:**
```tsx
className="p-6 md:p-8 rounded-[24px] bg-white/[0.04] border border-white/[0.08]
           backdrop-blur-sm"

// Number badge داخل الكارد
className="w-10 h-10 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/20
           flex items-center justify-center text-[#ff5722] font-medium text-sm
           shadow-[0_0_12px_rgba(255,87,34,0.2)]"
```

**القواعد:**
- `border-radius: 24px` للكارد الكامل
- الخلفية: `rgba(255,255,255,0.04)` — شفافية خفيفة جداً
- Border: `rgba(255,255,255,0.08)` — خط أبيض شفاف
- أرقام الخطوات: دائرة برتقالية مع glow

---

### 3.4 Section Layout Pattern

**كل section في الموقع يتبع هذا النمط:**
```
Section (full-width, dark background)
├── Container (max-width: 1280px, centered, padding: 0 24px)
│   ├── SectionBadge (centered أو left-aligned)
│   ├── Section Heading (h2, White, Medium)
│   ├── Section Subtext (Silver Chalice, Regular)
│   └── Content (cards / grid / etc.)
└── Decorative elements (glow circles, lines — optional)
```

**التطبيق:**
```tsx
// Section wrapper
<section className="py-20 md:py-32 bg-[#1a1a1a] relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    {/* Badge */}
    <div className="flex justify-center mb-6">
      <SectionBadge>How it Works</SectionBadge>
    </div>
    {/* Heading */}
    <h2 className="text-3xl md:text-5xl font-medium text-white text-center
                   tracking-tight leading-tight mb-4">
      Seamless Process,<br />Effortless Management
    </h2>
    {/* Subtext */}
    <p className="text-[#a1a1a1] text-center max-w-2xl mx-auto mb-16">
      ...
    </p>
    {/* Content */}
  </div>
</section>
```

---

### 3.5 Hero Section Pattern

**من Figma:**
- **Layout**: Two-column (Left: text + CTA | Right: Product image/mockup)
- **Badge** في الأعلى مع نص إنجاز (مثل "We raised $200,000 series A")
- **H1**: كبير جداً، Multi-line، font-weight: 500
- **Subtext**: Silver Chalice، max-width محدود
- **CTA**: Orange button + optionally secondary ghost button
- **Logos bar**: "Join X,000+ companies" + صف logos

**قواعد الـ Hero:**
```
- H1 font-size: clamp(2.5rem, 5vw, 4.5rem)
- H1 font-weight: 500 (Medium) — ليس Bold
- الـ left column: max-width: 540px
- spacing بين العناصر: 24px–32px
- الـ product image: opacity: 0.9، border-radius: 16px
```

---

### 3.6 Navbar Pattern

**من Figma:**
- خلفية: `Cod Gray` مع border-bottom شفاف (`rgba(255,255,255,0.08)`)
- Logo: يسار، Links: وسط، CTA: يمين
- Links: White، font-weight: 400، حجم: 15px
- CTA Navbar: نفس الـ Primary Button لكن أصغر (padding أقل)
- Sticky مع backdrop-blur عند الـ scroll

---

### 3.7 Glow / Decorative Effects

الـ glow effects المستخدمة في الـ background كـ decorative elements:

```tsx
// Circle glow (كالموجود في "Value" section)
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[588px] h-[588px] rounded-full opacity-90
                bg-[radial-gradient(ellipse,rgba(255,87,34,0.15),transparent_70%)]
                pointer-events-none" />

// Horizontal line separator
<div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
```

**القواعد:**
- Glow circles دائماً `opacity: 0.9` أو أقل
- لا تستخدم ألوان ساطعة جداً للـ glow — subtlety مهمة
- الـ glow الرئيسي: Orange (`#ff5722`) بشفافية `0.1–0.2`
- يمكن استخدام White glow للـ sections الخاصة

---

## 4. Spacing System (المسافات)

| الاستخدام | القيمة |
|---|---|
| Section vertical padding | `80px–128px` (`py-20 md:py-32`) |
| Container horizontal padding | `24px` (`px-6`) |
| Gap بين عناصر الـ Hero | `24px–32px` |
| Gap بين الـ Cards في الـ grid | `24px` (`gap-6`) |
| Border radius — Sections | `0` (full-width) |
| Border radius — Cards | `24px` (`rounded-3xl`) |
| Border radius — Badges | `21px` (`rounded-full`) |
| Border radius — Buttons | `10px` (`rounded-[10px]`) |
| Border radius — Inputs | `8px–10px` |
| Max-width Container | `1280px` (`max-w-7xl`) |

---

## 5. Effects & Shadows

### Box Shadows
```css
/* CTA Button glow */
--shadow-cta: 0 0 20px rgba(255, 87, 34, 0.4);
--shadow-cta-hover: 0 0 30px rgba(255, 87, 34, 0.6);

/* Card subtle shadow */
--shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3);

/* Number badge glow */
--shadow-badge: 0 0 12px rgba(255, 87, 34, 0.2);
```

### Borders
```css
/* Standard card border */
border: 1px solid rgba(255, 255, 255, 0.08);

/* Navbar border */
border-bottom: 1px solid rgba(255, 255, 255, 0.08);

/* Highlighted card border */
border: 1px solid rgba(255, 87, 34, 0.3);
```

---

## 6. Animation & Transitions

- **Duration**: `200ms` للـ hover effects العادية، `300ms` للـ transitions الأكبر
- **Easing**: `ease-out` أو `cubic-bezier(0.16, 1, 0.3, 1)` (snappy ease-out)
- **Hover on cards**: scale خفيف (`scale(1.02)`) أو رفع الـ border brightness
- **لا** تستخدم animations كثيرة — الـ subtlety هي الأساس

```tsx
// Standard transition class
className="transition-all duration-200 ease-out"

// Card hover
className="hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
```

---

## 7. Layout & Grid Rules

### Grid الرئيسي
- **Desktop**: 12-column grid
- **Cards Grid**: 3 columns على desktop، 2 على tablet، 1 على mobile
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Breakpoints (Tailwind defaults)
| Breakpoint | Size |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

### الـ Hero Layout
```tsx
// Two-column hero
className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
```

---

## 8. Dark Mode — القاعدة الأساسية

> **الموقع يعمل على Dark Mode فقط كـ default.**

الـ `Cod Gray` (`#1a1a1a`) هي الخلفية الرئيسية، ليس Dark Mode اختياري — هو الوضع الافتراضي والوحيد.

إذا احتجت تطبيق Light mode، استشر أولاً — لأن الـ Figma design كله مبني على Dark.

---

## 9. RTL Support

المشروع يدعم العربية. القواعد:

1. استخدم `IBM Plex Sans Arabic` للنصوص العربية (مُضبوط تلقائياً في `[dir="rtl"]`)
2. استخدم logical properties حيثما أمكن:
   - `ps-` / `pe-` بدل `pl-` / `pr-`
   - `ms-` / `me-` بدل `ml-` / `mr-`
3. الـ Icons الاتجاهية تحتاج `rotate-180` في RTL
4. الـ flex direction ينعكس تلقائياً مع `dir="rtl"`

---

## 10. Code Conventions (قواعد الكود)

### ملفات المكونات
- كل component في ملف منفصل في `src/components/landing/`
- اسم الملف: PascalCase يطابق اسم الـ component
- كل component يقبل بياناته من `content.json` عبر الـ props

### الـ Tailwind Classes
- استخدم **Tailwind utility classes** أولاً، ثم CSS مخصص إذا لزم
- اجمع الـ classes المتكررة في متغيرات:
```tsx
const cardClass = "p-8 rounded-[24px] bg-white/[0.04] border border-white/[0.08]"
```
- **لا** تكتب CSS inline styles إلا للقيم الديناميكية

### الألوان في الكود
- استخدم الـ CSS variables (`var(--color-accent)`) للألوان الـ semantic
- استخدم القيم المباشرة بين brackets (`bg-[#ff5722]`) للألوان الـ Figma-specific
- **لا** تستخدم Tailwind built-in colors (مثل `bg-orange-500`) — استخدم القيم المحددة

### الـ Icons
- المكتبة المستخدمة: **Lucide React** (محددة في `components.json`)
- استخدم `DynamicIcon` component للـ icons الديناميكية من الـ content

---

## 11. Content Structure

المحتوى يأتي من `src/content.json` ويدعم:
- `{ en: "...", ar: "..." }` للنصوص الثنائية اللغة
- الـ component يستقبل الـ locale المناسب عبر الـ props

---

## 12. Figma Reference

| المعلومة | القيمة |
|---|---|
| File Key | `gzY6vaHVdoDnB7tCEEnrJa` |
| Main Page Node | `1:5518` |
| الأدوات المتاحة | `figma_get_figma_data`, `figma_download_figma_images` |
| الـ MCP Config | `opencode.json` في جذر المشروع |

للرجوع لأي section بعينه:
```
Hero:        node 1:4125
How it Works: node 1:4276
Value:       node 1:4246
Pricing:     (موجود في الـ canvas)
Footer:      (موجود في الـ canvas)
```

---

*آخر تحديث: أبريل 2026 — مصدر: Figma SaasPro + فحص الـ codebase الحالي*
