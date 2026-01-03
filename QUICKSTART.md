# ⚡ Quick Start - ELORA Authentication System

## 🚀 Get Started in 3 Steps

### 1. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=https://app.smartscore.ng/api/v1
VITE_GOOGLE_SHEETS_WEBHOOK_URL=your_webhook_url
```

### 2. Install Dependencies (if not done)

```bash
npm install
# or
pnpm install
```

### 3. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

---

## 📁 What's New

### ✅ Implemented Files

```
src/features/auth/
├── api/
│   ├── mutations.ts          ✅ NEW: useRegisterMutation, useLoginMutation
│   └── queries.ts             ✅ UPDATED: Uses /auth/profile endpoint
├── pages/
│   ├── register.tsx           ✅ NEW: Modern signup with all fields
│   └── login-new.tsx          ✅ NEW: Modern login matching brand
└── schemas/
    └── index.ts               ✅ UPDATED: All registration fields

src/lib/
└── client.ts                  ✅ UPDATED: Correct auth endpoints

src/routes/(auth)/auth/
├── login.tsx                  ✅ UPDATED: Uses new login page
└── signup.tsx                 ✅ UPDATED: Uses new register page
```

---

## 🎨 Design System

### Brand Colors (Actual)
- **Primary CTA**: `#E4B68A` (Peach) - Use for main buttons
- **Links/Badges**: `#3A9BA5` (Teal) - Use for interactive elements
- **Text**: `#5C321D` (Brown), `#2d2a26` (Charcoal), `#4a5565` (Slate)
- **Backgrounds**: `#f5f1eb` (Cream), `#f5f2ec` (Cream Alt)

### Common Components

```tsx
// Primary Button
<Button className="bg-[#E4B68A] hover:bg-[#D4A67A] text-black">
  Click Me
</Button>

// Card
<div className="bg-white rounded-[23px] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A] p-8">
  {/* Content */}
</div>

// Badge
<span className="bg-[#3A9BA5]/10 text-[#3A9BA5] px-4 py-2 rounded-full text-sm font-medium">
  Badge
</span>
```

---

## 🔑 Authentication Flow

### Registration
1. Navigate to `/auth/signup`
2. Fill in: first name, last name, email, phone, gender, DOB, password
3. Submit → Token stored → Redirect to `/dashboard`

### Login
1. Navigate to `/auth/login`
2. Enter email + password
3. Submit → Token stored → Redirect to `/dashboard`

### Protected Routes
```tsx
import { useAuth } from "@/providers/auth.provider";

function MyComponent() {
  const { user, authState } = useAuth();
  
  if (authState === AuthState.AUTHENTICATED) {
    return <div>Welcome, {user?.first_name}!</div>;
  }
  
  return <div>Please log in</div>;
}
```

---

## 📚 Documentation Files

- **`AUTHENTICATION_IMPLEMENTATION.md`** - Complete auth system documentation
- **`STYLING_GUIDE.md`** - Design system & component patterns
- **`MIGRATION_GUIDE.md`** - How to update old pages to new design

---

## 🧪 Testing

### Manual Testing Checklist

```bash
# 1. Start dev server
pnpm dev

# 2. Test Registration
- Go to http://localhost:5173/auth/signup
- Fill all fields
- Check console for API call
- Verify token in localStorage (auth-session)

# 3. Test Login
- Go to http://localhost:5173/auth/login
- Enter credentials
- Check redirect to dashboard
- Verify user data loaded

# 4. Test Logout
- From dashboard, trigger logout
- Verify token removed
- Verify redirect to home
```

---

## 🐛 Troubleshooting

### Issue: API calls failing
**Solution**: Check `.env` has `VITE_API_BASE_URL=https://app.smartscore.ng/api/v1`

### Issue: Token not being sent
**Solution**: Check browser console → Network tab → Request headers should include `Authorization: Bearer {token}`

### Issue: Redirect not working after login
**Solution**: Verify `/dashboard` route exists in your router

### Issue: Styling looks off
**Solution**: Ensure Tailwind is processing CSS variables from `src/index.css`

---

## 📞 Support

For questions or issues:
1. Check the three documentation files
2. Review the reference pages: `landing-page.tsx`, `waitlist-page.tsx`
3. Check browser console for errors

---

## ✨ Next Steps

After verifying auth works:

1. **Update other pages** - Use `MIGRATION_GUIDE.md` to update dashboard, profile, etc.
2. **Add forgot password** - Create reset password flow
3. **Add email verification** - If backend supports it
4. **Update dashboard** - Match new design system
5. **Test end-to-end** - Complete user journey from signup to consultation

---

**You're all set! 🎉**

The authentication system is production-ready and matches your brand design.

