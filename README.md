# PropertyHub — Next.js Rewrite

A luxury real estate listing platform built with **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS**. Designed with a premium dark obsidian + gold aesthetic. Ready for **Supabase** integration.

---

## Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + CSS custom properties
- **Fonts**: Cormorant Garamond (display) + DM Sans (body) via Google Fonts
- **Icons**: Lucide React
- **Database**: Supabase (wired up, swap mock data when ready)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Redirects to /welcome
│   ├── globals.css             # Design system + CSS tokens
│   ├── welcome/                # Splash page
│   ├── login/                  # OTP login flow
│   └── (app)/                  # Authenticated app shell
│       ├── layout.tsx          # Navbar + MobileNav wrapper
│       ├── home/               # Property listings + search/filter
│       ├── property/[id]/      # Property detail
│       ├── post-property/      # Multi-step listing form
│       ├── my-listings/        # Owner dashboard
│       └── admin/              # Admin panel (tabs: Overview, Properties, Users)
├── components/
│   ├── Navbar.tsx
│   ├── MobileNav.tsx
│   └── PropertyCard.tsx
├── lib/
│   ├── utils.ts                # cn(), mock data, CURRENT_USER
│   └── supabase.ts             # Supabase client + commented query helpers
└── types/
    └── index.ts                # Property, User, FilterState
```

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add Supabase credentials (optional for now — app runs on mock data)
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Connecting Supabase

When you're ready to wire up the real backend:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Add credentials to `.env.local`
3. Create a `properties` table matching the `Property` type in `src/types/index.ts`
4. Uncomment the query helpers in `src/lib/supabase.ts`
5. Replace `MOCK_PROPERTIES` imports with the async Supabase calls (use React Server Components or `useEffect` + state)

### Suggested Supabase table: `properties`

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | |
| location | text | |
| price_raw | int8 | Raw number for filtering |
| price | text | Formatted display string |
| type | text | 'Buy' or 'Rent' |
| category | text | Apartment, Villa, etc. |
| bedrooms | int4 | |
| bathrooms | int4 | |
| area | text | |
| images | text[] | Array of URLs |
| description | text | |
| amenities | text[] | |
| owner_id | uuid | Foreign key → auth.users |
| status | text | active/pending/expired |
| views | int4 | |
| is_featured | bool | |
| created_at | timestamptz | Default now() |

### Supabase Auth (OTP)

Replace the mock OTP flow in `src/app/login/page.tsx` with:

```typescript
import { supabase } from "@/lib/supabase";

// Send OTP
await supabase.auth.signInWithOtp({ phone: `+91${phone}` });

// Verify OTP
await supabase.auth.verifyOtp({ phone: `+91${phone}`, token: otp, type: "sms" });
```

---

## Pages

| Route | Description |
|---|---|
| `/welcome` | Animated splash / hero |
| `/login` | Phone OTP authentication |
| `/home` | Property listings with search, filters, sort |
| `/property/[id]` | Property detail with image gallery and contact |
| `/post-property` | Multi-step form to list a property |
| `/my-listings` | Owner dashboard with stats |
| `/admin` | Admin panel with charts, property & user management |
