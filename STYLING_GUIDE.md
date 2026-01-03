# ELORA Design System & Styling Guide

## 🎨 Brand Colors

### Primary Palette

```css
/* Browns & Earth Tones - Primary Brand */
--color-brown-darkest: #200801;    /* Deepest brown for overlays */
--color-brown-dark: #5c321d;       /* Primary brown for text/headers */
--color-brown: #8b7355;            /* Medium brown for icons */
--color-tan: #d2977a;              /* Light brown/tan accents */

/* Peach/Beige - Accent Colors */
--color-peach-light: #e4b68a;      /* PRIMARY CTA BUTTONS */
--color-peach-lighter: #e7c3b1;    /* Hover/secondary */
--color-peach-lightest: #f8efe8;   /* Backgrounds/badges */
--color-beige: #eadccb;            /* Cards/containers */

/* Teal/Cyan - Interactive Elements */
--color-teal: #3a9ba5;             /* Links, badges, focus states */
--color-teal-dark: #2a7b85;        /* Hover state for teal */

/* Neutral Backgrounds */
--color-cream: #f5f1eb;            /* Primary page background */
--color-cream-alt: #f5f2ec;        /* Alternative background */
--color-white-neutral: #f9fafb;    /* Pure white variant */

/* Dark Neutrals */
--color-charcoal: #2d2a26;         /* Dark buttons/text */
--color-gray-dark: #1a1a1a;        /* Footer/dark sections */
--color-gray-darker: #010101;      /* Darkest text */
--color-gray-darkest: #020202;     /* Headers/titles */

/* Text Colors */
--color-slate: #4a5565;            /* Secondary text */
--color-slate-dark: #364153;       /* Tertiary text */
--color-gray-blue: #99a1af;        /* Muted text */
```

### Semantic Colors

```css
/* Semantic - Status/Feedback */
--color-success: #10b981;          /* Success states */
--color-error: #ef4444;            /* Errors/validation */
--color-warning: #f59e0b;          /* Warnings */
--color-info: #3b82f6;             /* Information */

/* Status with backgrounds */
--color-green: #008236;            /* Dark green for text */
--color-green-light: #dcfce7;      /* Light green background */
--color-blue: #155dfc;             /* Primary blue */
--color-blue-light: #eff6ff;       /* Light blue background */
--color-blue-dark: #193cb8;        /* Dark blue for contrast */
```

---

## 🎯 Usage Guidelines

### Buttons

#### Primary CTA (Call-to-Action)
```tsx
<Button className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium">
  Get Started
</Button>
```

#### Secondary CTA
```tsx
<Button className="bg-(--color-charcoal) text-(--color-white-neutral) hover:bg-transparent hover:text-(--color-charcoal) border border-(--color-charcoal)">
  Learn More
</Button>
```

#### Gradient Button (Premium)
```tsx
<Button className="bg-[linear-gradient(90deg,#E4B68A_0%,#FFD7B1_50%,#E4B68A_100%)] bg-[size:200%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%] text-black">
  Try Elora AI Now
</Button>
```

---

### Typography

#### Font Family
```css
/* Primary Font */
font-family: "Bricolage Grotesque", sans-serif;

/* Monospace (for forms/technical) */
font-family: "Roboto Mono", monospace;

/* Apply via Tailwind */
font-bricolage
font-roboto-mono
```

#### Headings
```tsx
// H1 - Page Titles
<h1 className="text-6xl leading-[104%] font-semibold text-(--color-charcoal)">
  
// H2 - Section Headers
<h2 className="text-[50px] leading-[100%] font-semibold text-(--color-gray-darker)">

// H3 - Subsections
<h3 className="text-[40px] leading-[48px] font-semibold text-(--color-peach-light)">

// H4 - Card Headers
<h4 className="text-[28px] font-semibold text-(--color-peach-light)">
```

#### Body Text
```tsx
// Primary Body
<p className="text-lg leading-[115.99999999999999%] text-(--color-slate)">

// Secondary Body
<p className="text-base leading-6.5 text-(--color-slate)">

// Small Text / Captions
<span className="text-sm text-(--color-gray-blue)">
```

---

### Cards & Containers

#### Standard Card
```tsx
<div className="bg-white rounded-[23px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] p-8">
  {/* Content */}
</div>
```

#### Card with Border
```tsx
<div className="rounded-2xl border-[0.77px] border-white bg-white p-[32.76px]">
  {/* Content */}
</div>
```

#### Feature Card (How It Works)
```tsx
<div className="relative min-h-[326px] rounded-2xl bg-white px-8 pt-14 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
  {/* Icon/badge positioning */}
  <div className="absolute -top-4 left-8 flex size-12 items-center justify-center rounded-full bg-(--color-brown) text-white">
    01
  </div>
  {/* Content */}
</div>
```

---

### Badges & Tags

#### Info Badge (Teal)
```tsx
<span className="bg-[#3A9BA5]/10 text-[#3A9BA5] px-4 py-2 rounded-full text-sm font-medium">
  Welcome Back
</span>
```

#### Neutral Badge
```tsx
<span className="rounded-[44px] bg-(--color-beige) px-[21px] py-3 text-sm text-(--color-charcoal)">
  Connect with Dermatologists
</span>
```

#### Light Badge (White border)
```tsx
<span className="bg-white border border-gray-300 text-black px-4 py-2 rounded-full text-lg font-medium">
  For Every Skin
</span>
```

---

### Form Elements

#### Input Fields
```tsx
<Input
  className="h-11 border-gray-300 rounded-lg"
  placeholder="Enter your email"
/>
```

#### Select Dropdown
```tsx
<Select>
  <SelectTrigger className="h-11 w-full border-gray-300">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

#### Labels
```tsx
<Label htmlFor="email" className="text-(--color-gray-darker)">
  Email Address <span className="text-red-500">*</span>
</Label>
```

---

### Backgrounds

#### Page Backgrounds
```tsx
// Primary
<div className="bg-(--color-cream-alt)">

// Alternative
<div className="bg-(--color-cream)">

// White
<div className="bg-white">

// Dark
<div className="bg-(--color-brown-dark)">
```

#### Gradient Backgrounds
```tsx
// Linear gradient overlay
<div style={{
  background: 'linear-gradient(135deg, #E4B68A 0%, #D4A67A 50%, #C4966A 100%)'
}}>

// With image blend
<div style={{
  backgroundImage: `linear-gradient(var(--color-brown-darkest)), url(${image})`
}}>
```

---

### Spacing System

```css
/* Custom spacing values (via Tailwind config) */
12.5  = 50px  (3.125rem)
17    = 68px  (4.25rem)
17.5  = 70px  (4.375rem)
18    = 72px  (4.5rem)
18.5  = 74px  (4.625rem)
29.5  = 118px (7.375rem)
45.5  = 182px (11.375rem)
48.5  = 194px (12.125rem)
61    = 244px (15.25rem)
62    = 248px (15.5rem)
80.5  = 322px (20.125rem)
87.5  = 350px (21.875rem)
120   = 480px (30rem)
165   = 660px (41.25rem)
168   = 672px (42rem)
172.5 = 690px (43.125rem)
268   = 1072px (67rem)
320   = 1280px (80rem)
335   = 1340px (83.75rem)
```

---

### Shadows

#### Subtle Card Shadow
```css
shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]
```

#### Button Shadow
```css
shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]
```

#### Soft Shadow (xs)
```css
shadow-xs
```

---

### Border Radius

```css
/* Standard rounded corners */
rounded-[6px]      /* Small elements */
rounded-[10px]     /* Input fields */
rounded-lg         /* Medium (8px) */
rounded-[23px]     /* Cards/dialogs */
rounded-2xl        /* Large (16px) */
rounded-[28px]     /* Sections */
rounded-[34px]     /* Hero sections */
rounded-[39px]     /* Large buttons */
rounded-[41px]     /* Pills */
rounded-[44px]     /* Extra large badges */
rounded-full       /* Circular */
```

---

## 🎭 Dark Mode (Future)

Currently not implemented, but CSS variables are prepared:

```css
.dark {
  --background: #111827;
  --foreground: #f9fafb;
  --card: #1f2937;
  --primary: #3a9ba5;
  /* ... etc */
}
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind defaults */
sm:   640px   @media (min-width: 640px)
md:   768px   @media (min-width: 768px)
lg:   1024px  @media (min-width: 1024px)
xl:   1280px  @media (min-width: 1280px)
2xl:  1536px  @media (min-width: 1536px)
```

### Common Responsive Patterns

```tsx
// Stack on mobile, grid on desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Different text sizes
<h1 className="text-2xl md:text-4xl lg:text-6xl">

// Different padding
<div className="px-4 md:px-8 lg:px-12.5">
```

---

## 🔥 Common Patterns

### Hero Section
```tsx
<section className="px-12.5 pb-8">
  <div className="relative mx-auto mb-8 min-h-[703px] w-full max-w-335 overflow-hidden rounded-[28px] bg-(--color-peach-light)">
    <div className="relative z-10 ml-18.5 max-w-[485px] pt-48.5 text-(--color-charcoal)">
      <h1 className="text-6xl leading-[104%]">Hero Title</h1>
      <p className="mt-[13px] text-lg">Description</p>
      <Button className="mt-6 rounded-[41px]">CTA</Button>
    </div>
  </div>
</section>
```

### Section with Badge Header
```tsx
<div className="text-center mb-16">
  <div className="mb-4 flex flex-col gap-2 items-center">
    <span className="bg-[#3A9BA5]/10 text-[#3A9BA5] px-4 py-2 rounded-full text-sm font-medium">
      Section Label
    </span>
    <img src="/img/svg/swoosh.svg" alt="" width={129} height={13} />
  </div>
  <h2 className="text-[40px] font-semibold text-(--color-gray-darker)">
    Section Title
  </h2>
  <p className="text-lg text-(--color-slate)">
    Section description
  </p>
</div>
```

### Feature List Item
```tsx
<li className="flex gap-x-4">
  <div className="flex size-12 shrink-0 items-center justify-center rounded-[16.4px] bg-(--color-cream)">
    <CircleCheckBig className="text-(--color-brown)" size={20} />
  </div>
  <div className="space-y-2">
    <h4 className="text-[28px] font-semibold text-(--color-peach-light)">
      Feature Title
    </h4>
    <p className="font-inter text-base leading-[25.6px] text-(--color-white-neutral)">
      Feature description
    </p>
  </div>
</li>
```

---

## ✅ Best Practices

1. **Consistency**: Use CSS variables (`--color-*`) for colors, not hardcoded hex
2. **Spacing**: Follow the custom spacing system for consistent layouts
3. **Typography**: Use Bricolage Grotesque as primary font
4. **Buttons**: Primary CTAs should use peach (#E4B68A), secondary use charcoal
5. **Cards**: Use rounded-[23px] with subtle shadows
6. **Forms**: Input height should be h-11 (44px) for accessibility
7. **Icons**: Use lucide-react icons, size-20 or size-32 typically
8. **Transitions**: Add `transition-colors duration-300` for smooth hovers

---

## 🚀 Quick Start

```tsx
// Import color classes
import "src/index.css"; // Contains all CSS variables

// Use in components
<div className="bg-(--color-cream-alt) text-(--color-slate)">
  <Button className="bg-[#E4B68A] hover:bg-[#D4A67A]">
    Get Started
  </Button>
</div>
```

---

This design system ensures:
- ✅ Consistent branding across all pages
- ✅ Accessible color contrasts
- ✅ Responsive, mobile-first design
- ✅ Reusable component patterns
- ✅ Easy maintenance and scalability

