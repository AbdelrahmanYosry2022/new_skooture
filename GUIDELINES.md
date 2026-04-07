# Design & Code Guidelines — Soft Pro (new_skooture)

> **مهم جداً:** هذا الملف هو المرجع الرئيسي لكل تعديل على الموقع.
> أي موديل أو مطور يعمل على هذا المشروع **يجب** الالتزام بكل ما يلي لضمان التطابق التام (Pixel-Perfect) مع روح التصميم المرجعي (Soft Pro).
> المصدر الأصلي: [Soft Pro Framer Design](https://www.figma.com/design/gzY6vaHVdoDnB7tCEEnrJa/saaspro-framer-design?node-id=1-5518)

---

## 1. Color System (نظام الألوان الدقيق)

### الألوان الأساسية
- **الخلفية الرئيسية (Main Background):** الأسود الصريح `#000000` (ليس `#1a1a1a` ولا رمادي غامق).
- **اللون الأساسي التفاعلي (CTA & Accent):** البرتقالي المائل للأحمر `#eb4520` (Hover: `#d63d1a`).
- **النصوص الرئيسية (Headings):** متدرجة من الأبيض `#ffffff` إلى الرمادي الفاتح `#999999` لإعطاء مظهر Metallic/Premium.
- **النصوص الثانوية (Subtext):** رمادي فاتح `#aeaeae`.
- **خلفية الـ Badges (Pills):** رمادي داكن جداً `#191919` مع ظلال داخلية (Inset Shadows).

### تحديث `src/index.css`
استخدم هذه القيم في الـ Theme:
```css
@theme {
  --color-background: #000000;
  --color-foreground: #ffffff;
  --color-muted-foreground: #aeaeae;
  --color-accent: #eb4520;
  --color-accent-hover: #d63d1a;
  --color-badge-bg: #191919;
}
```

---

## 2. Typography (التصميم النصي وتأثيرات النصوص)

### الخط الرئيسي
- **الخط:** `Inter` للغة الإنجليزية، و `IBM Plex Sans Arabic` للغة العربية.
- **الأوزان:** `400 (Regular)` للنصوص العادية، و `500 (Medium)` للعناوين الرئيسية (لا تستخدم Bold 700 مطلقاً).

### تأثيرات العناوين (Headings - H1, H2, H3)
للحصول على نفس "روح" الهيرو سيكشن، كل العناوين الرئيسية يجب أن تحمل هذا التأثير:
```tsx
className="font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#999999]"
```
- **Line height:** ضيق جداً (tight) مثل `leading-[1.1]` أو `1.15`.
- **Letter spacing:** `tracking-tight` (حوالي `-0.05em`).

### النصوص الثانوية (Body / Subtext)
```tsx
className="text-[#aeaeae] leading-[1.6]"
```

---

## 3. Component Patterns (الأنماط والمكونات المطابقة)

### 3.1 Badge / Pill Component (تحديث مهم)
الـ Badge في هذا التصميم يمتلك Inset Shadows معقدة تعطي إحساس الـ 3D / Neumorphism:

**التطبيق المرجعي:**
```tsx
<div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[21px] bg-[#191919] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)]">
  {/* Gradient Dot */}
  <span className="w-2.5 h-2.5 rounded-full bg-[radial-gradient(100%_100%_at_50%_0%,#ffa984_0%,#ff5911_100%)] shadow-[inset_0_1px_16px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.09)] shrink-0"></span>
  {/* Gradient Text */}
  <span className="text-[14px] font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#e86f3a] to-[#fcbda2]">
    Badge Text Here
  </span>
</div>
```

### 3.2 Button — Primary (CTA)
**مواصفات الزر التفاعلي الوحيد (لا تضف أزرار ثانوية إلا إذا طلبت):**
- الارتفاع: `h-[48px]`
- الـ Padding الجانبي: `px-[20px]`
- الـ Radius: `rounded-[10px]`
- بدون Border.
- لون الخلفية: `bg-[#eb4520]`
- Hover: `hover:bg-[#d63d1a]` مع إضافة ظل: `hover:shadow-[0_0_20px_rgba(255,80,36,0.4)]`
- الـ Shadow الأساسي: `shadow-[0_1px_2px_rgba(82,88,102,0.06)]`

**التطبيق المرجعي:**
```tsx
<Button className="h-[48px] px-[20px] rounded-[10px] bg-[#eb4520] hover:bg-[#d63d1a] text-white font-semibold text-[16px] transition-all duration-200 shadow-[0_1px_2px_rgba(82,88,102,0.06)] hover:shadow-[0_0_20px_rgba(255,80,36,0.4)] border-0">
  Button Text
</Button>
```

### 3.3 الإضاءة الخلفية (Background Glow)
الـ Glow هو العنصر الأساسي الذي يعطي الروح الخاصة بالتصميم. لا تستخدم ألوان ساطعة جداً.

**التطبيق المرجعي للـ Glow خلف الصور/النصوص:**
```tsx
<div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-[1000px] h-[800px] rounded-full opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(235,69,32,0.25)_0%,rgba(235,69,32,0.05)_40%,transparent_70%)] pointer-events-none blur-[60px]" />
```

### 3.4 Cards & UI Containers
الـ Cards أو أي صورة UI يجب أن تكون متوافقة مع هذه الخصائص:
- خلفية داكنة مع حدود خفيفة جداً `border border-white/[0.05]` أو `border-white/[0.08]`.
- الـ Radius للـ Cards الكبيرة `rounded-[24px]`، وللأشياء الأصغر `16px`.
- الـ Box Shadow للصور العائمة/البارزة: `shadow-[0_20px_60px_rgba(0,0,0,0.5)]` لتعطي تأثير الطفو فوق الخلفية السوداء.

---

## 4. Spacing System & Layout

- **الخلفية دائماً `bg-[#000000]` للسكاشن.**
- **Container Max-Width:** `max-w-[1200px]` (أو `1280px` حسب الحاجة، لكن الـ `px-6` ثابتة).
- **التمركز:** العناصر يجب أن تكون موزعة بدقة (Pixel-perfect alignments)، خاصة في السكاشن التي تحتوي Absolute positioning للصور مثل الهيرو سيكشن.
- **تأثير مسح اللوجوهات (Logos Scrolling Mask):**
لإعطاء تأثير التلاشي للشرائط المتحركة استخدم هذا الستايل للكونتينر:
```tsx
style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)' }}
```

---

## 5. Animation (الحركات)

- استخدم `framer-motion` للحركات البسيطة مثل الـ Fade-up والـ Scroll المستمر.
- لا تبالغ في الحركات، حافظ على طابع الاحترافية والهدوء.
- الترانزيشن العادي للأزرار: `transition-all duration-200`.

---

## 6. RTL Support (دعم العربية)

1. الـ Gradient يجب أن يكون متوافقاً مع الاتجاهين إذا دعت الحاجة، ولكن `bg-gradient-to-r` يعمل جيداً لتدرجات النصوص في كلا اللغتين.
2. استخدم logical properties (`ms`, `me`, `ps`, `pe`) عند إضافة هوامش.
3. الخط العربي (IBM Plex Sans Arabic) يطبق تلقائياً بناءً على `dir="rtl"`.

---

*تم التحديث كلياً ليتطابق مع الـ Pixel-Perfect Hero Section والمرجع (Soft Pro).*
