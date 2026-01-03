# Migration Guide - Updating Legacy Code to New Design System

## 🎯 Purpose

This guide helps you update existing pages and components to match the new ELORA design system based on the landing and waitlist pages.

---

## 🔄 Color Mapping

### Old → New Color Replacements

```tsx
// OLD (Generic)
bg-primary         → bg-[#E4B68A]
text-primary       → text-(--color-teal) or text-[#3A9BA5]
bg-background      → bg-(--color-cream-alt)
text-text-primary  → text-(--color-gray-darker)
text-text-secondary → text-(--color-slate)
bg-error           → bg-[#ef4444]
text-error         → text-red-500

// OLD (Previous brand - INCORRECT)
--color-primary: #3a9ba5  ❌ → This is now TEAL/accent, not primary!
--color-accent: #e4b68a   ✅ → This is now PRIMARY CTA color
```

### Correct Brand Color Usage

```tsx
// PRIMARY BUTTONS - Use Peach
✅ bg-[#E4B68A] hover:bg-[#D4A67A]
❌ bg-primary (old teal color)

// LINKS & BADGES - Use Teal
✅ text-[#3A9BA5] or bg-[#3A9BA5]/10
❌ text-accent

// TEXT - Use Brown/Charcoal
✅ text-(--color-gray-darker) or text-(--color-charcoal)
❌ text-text-primary

// BACKGROUNDS - Use Cream
✅ bg-(--color-cream-alt)
❌ bg-background
```

---

## 📋 Component Updates

### 1. Buttons

#### Before (Old Generic Style)
```tsx
<Button className="bg-primary hover:bg-primary-dark text-white">
  Submit
</Button>
```

#### After (New ELORA Style)
```tsx
<Button className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg">
  Submit
</Button>
```

---

### 2. Cards

#### Before
```tsx
<div className="p-8 border border-border rounded-lg bg-card">
  Content
</div>
```

#### After
```tsx
<div className="bg-white rounded-[23px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] p-8">
  Content
</div>
```

---

### 3. Form Inputs

#### Before
```tsx
<Input
  type="email"
  placeholder="Email"
  className="w-full"
/>
```

#### After
```tsx
<Input
  type="email"
  placeholder="you@example.com"
  className="h-11 border-gray-300 rounded-lg"
/>
```

---

### 4. Page Layouts

#### Before
```tsx
<div className="min-h-screen bg-background flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <Card className="p-8 border border-border">
      {/* Content */}
    </Card>
  </div>
</div>
```

#### After
```tsx
<div className="min-h-screen bg-(--color-cream-alt) flex items-center justify-center px-4 py-8">
  <div className="w-full max-w-md">
    <div className="bg-white rounded-[23px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] p-8 md:p-10">
      {/* Content */}
    </div>
  </div>
</div>
```

---

### 5. Headers/Navigation

#### Before
```tsx
<header className="bg-surface border-b border-border">
  <nav className="container mx-auto px-4 py-4">
    {/* Nav items */}
  </nav>
</header>
```

#### After
```tsx
<header className="mt-[31px] mb-[21px] px-12.5">
  <nav className="mx-auto flex w-full max-w-335 items-center justify-between">
    {/* Nav items */}
  </nav>
</header>
```

---

### 6. Badges/Tags

#### Before
```tsx
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
  New
</span>
```

#### After
```tsx
<span className="bg-[#3A9BA5]/10 text-[#3A9BA5] px-4 py-2 rounded-full text-sm font-medium">
  New
</span>
```

---

## 🎨 Typography Updates

### Headings

#### Before
```tsx
<h1 className="text-3xl font-bold text-text-primary mb-2">
  Page Title
</h1>
```

#### After
```tsx
<h1 className="text-3xl md:text-4xl font-bold text-(--color-gray-darker) mb-2">
  Page Title
</h1>
```

### Body Text

#### Before
```tsx
<p className="text-text-secondary">
  Description text
</p>
```

#### After
```tsx
<p className="text-(--color-slate) text-base">
  Description text
</p>
```

---

## 🔧 Common Patterns to Update

### Error Messages

#### Before
```tsx
<div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error text-sm">
  {error}
</div>
```

#### After
```tsx
<p className="text-sm text-red-500">{error}</p>
```

### Links

#### Before
```tsx
<Link to="/login" className="text-primary hover:text-primary-dark">
  Sign In
</Link>
```

#### After
```tsx
<Link to="/auth/login" className="text-[#3A9BA5] hover:text-[#2a7b85] font-medium transition-colors">
  Sign In
</Link>
```

### Loading States

#### Before
```tsx
<Button disabled={loading} className="w-full">
  {loading ? "Loading..." : "Submit"}
</Button>
```

#### After
```tsx
<Button
  disabled={isLoading}
  className="w-full h-12 bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium rounded-lg"
>
  {isLoading ? "Processing..." : "Submit"}
</Button>
```

---

## 📱 Responsive Design Patterns

### Before (Basic)
```tsx
<div className="max-w-md mx-auto p-4">
  {/* Content */}
</div>
```

### After (Enhanced)
```tsx
<div className="w-full max-w-md mx-auto px-4 py-8">
  <div className="bg-white rounded-[23px] p-8 md:p-10">
    {/* Content */}
  </div>
</div>
```

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T DO THIS:

```tsx
// 1. Don't use old "primary" color for buttons
<Button className="bg-primary">Click</Button>

// 2. Don't hardcode old colors
<div className="bg-blue-500">

// 3. Don't use generic class names
<div className="bg-background text-foreground">

// 4. Don't use small input heights
<Input className="h-8">

// 5. Don't forget responsive classes
<h1 className="text-4xl">
```

### ✅ DO THIS INSTEAD:

```tsx
// 1. Use peach for primary buttons
<Button className="bg-[#E4B68A] hover:bg-[#D4A67A]">Click</Button>

// 2. Use CSS variables or brand colors
<div className="bg-(--color-cream)">

// 3. Use semantic brand color names
<div className="bg-(--color-cream-alt) text-(--color-charcoal)">

// 4. Use h-11 for proper touch targets
<Input className="h-11 border-gray-300">

// 5. Always add mobile-first responsive classes
<h1 className="text-2xl md:text-4xl lg:text-6xl">
```

---

## 📋 Checklist for Page Migration

When updating a page, ensure:

- [ ] Replace `bg-primary` buttons with `bg-[#E4B68A]`
- [ ] Replace `bg-background` with `bg-(--color-cream-alt)`
- [ ] Update card styles to use `rounded-[23px]` with proper shadows
- [ ] Change input heights to `h-11`
- [ ] Update text colors to use brown/charcoal/slate
- [ ] Use teal (#3A9BA5) only for links and badges, not buttons
- [ ] Add responsive classes (mobile-first)
- [ ] Use Bricolage Grotesque font (should be default)
- [ ] Update spacing to use custom scale (12.5, 17, 18.5, etc.)
- [ ] Add proper transitions (`transition-colors duration-300`)
- [ ] Test on mobile, tablet, and desktop

---

## 🔍 Quick Find & Replace

Use these regex patterns in your editor:

```regex
# Find old button classes
bg-primary\s+hover:bg-primary-dark
# Replace with:
bg-[#E4B68A] hover:bg-[#D4A67A]

# Find old background classes
className="([^"]*?)bg-background([^"]*?)"
# Replace with:
className="$1bg-(--color-cream-alt)$2"

# Find old text colors
text-text-primary
# Replace with:
text-(--color-gray-darker)

# Find old text colors (secondary)
text-text-secondary
# Replace with:
text-(--color-slate)
```

---

## 🎯 Priority Order

Migrate pages in this order:

1. **High Priority** (User-facing):
   - ✅ Login page (done)
   - ✅ Signup page (done)
   - Dashboard home
   - Profile page
   - Consultation booking

2. **Medium Priority**:
   - Settings pages
   - History/Records
   - Notifications

3. **Low Priority**:
   - Admin pages (separate repo planned)
   - Error pages
   - Static content pages

---

## 💡 Tips

1. **Use the existing landing/waitlist pages as reference** - They're the source of truth
2. **Test each change** - Colors affect accessibility and brand perception
3. **Be consistent** - Use the same patterns across all pages
4. **Document variations** - If you create a new pattern, add it to STYLING_GUIDE.md
5. **Mobile first** - Always test responsive behavior

---

## 📞 Questions?

If unsure about a design decision:

1. Check `STYLING_GUIDE.md` for examples
2. Look at `landing-page.tsx` or `waitlist-page.tsx`
3. Reference `index.css` for CSS variables
4. Ask for clarification on specific use cases

---

**Remember**: The goal is consistency. When in doubt, match the landing page style! 🎨

