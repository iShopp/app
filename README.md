<div align="center">

```
  ██╗███████╗██╗  ██╗ ██████╗ ██████╗      ███╗   ██╗███████╗ ██████╗ ███╗   ██╗    ███████╗██╗  ██╗
  ██║██╔════╝██║  ██║██╔═══██╗██╔══██╗     ████╗  ██║██╔════╝██╔═══██╗████╗  ██║    ██╔════╝╚██╗██╔╝
  ██║███████╗███████║██║   ██║██████╔╝     ██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║    █████╗   ╚███╔╝
  ██║╚════██║██╔══██║██║   ██║██╔═══╝      ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║    ██╔══╝   ██╔██╗
  ██║███████║██║  ██║╚██████╔╝██║          ██║ ╚████║███████╗╚██████╔╝██║ ╚████║    ██║     ██╔╝ ██╗
  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝          ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝
```

# iSHOP NEON FX Marketplace

**A full-stack dropshipping automation platform with a cyberpunk NEON FX design system.**

[![CI](https://github.com/iShopp/app/actions/workflows/ci.yml/badge.svg)](https://github.com/iShopp/app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS-11-red?logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-teal?logo=prisma)](https://www.prisma.io)

</div>

---

## Table of Contents

- [UI Screenshots](#ui-screenshots)
- [Features](#features)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Quick Start (User Guide)](#quick-start-user-guide)
- [Developer Guide](#developer-guide)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Running Everything Together](#running-everything-together)
- [CLI Command Reference](#cli-command-reference)
- [API Reference](#api-reference)
- [CI/CD](#cicd)
- [Security](#security)
- [Contributing](#contributing)

---

## UI Screenshots

> **Design System:** Dark theme (`#0a0a0f` base), cyan neon accents (`#00f5ff`), purple neon (`#bf00ff`), glassmorphism cards, and animated gradient borders.

### 🏠 Homepage — Hero / Landing

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ iSHOP                                      🛒  Sign In  Sign Up     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│           ╔══════════════════════════════════════════╗                  │
│           ║  DISCOVER THE FUTURE                     ║                  │
│           ║  OF SHOPPING                             ║                  │
│           ║  ─────────────────                       ║                  │
│           ║  Curated products from global            ║                  │
│           ║  marketplaces at the best prices         ║                  │
│           ║                                          ║                  │
│           ║  [◀ SHOP NOW ▶]  [Explore Deals]        ║                  │
│           ╚══════════════════════════════════════════╝                  │
│                                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                   │
│  │ PRODUCT │  │ PRODUCT │  │ PRODUCT │  │ PRODUCT │   Featured         │
│  │ ──────  │  │ ──────  │  │ ──────  │  │ ──────  │                   │
│  │ $29.99  │  │ $49.99  │  │ $19.99  │  │ $89.99  │                   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🛍️ Shop / Product Listing

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Filters ▼    Sort: Best Match ▼                        📦 128 results  │
├──────────────────┬──────────────────────────────────────────────────────┤
│                  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  Categories      │  │ [image]  │  │ [image]  │  │ [image]  │           │
│  ──────────      │  │ Product  │  │ Product  │  │ Product  │           │
│  ● Electronics   │  │ Title    │  │ Title    │  │ Title    │           │
│  ○ Fashion       │  │ ★★★★☆ 4.2│  │ ★★★★★ 5.0│  │ ★★★☆☆ 3.1│           │
│  ○ Home & Garden │  │ $29.99   │  │ $49.99   │  │ $19.99   │           │
│  ○ Sports        │  │[Add Cart]│  │[Add Cart]│  │[Add Cart]│           │
│                  │  └──────────┘  └──────────┘  └──────────┘           │
│  Price Range     │                                                       │
│  $0 ────── $500  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│                  │  │ [image]  │  │ [image]  │  │ [image]  │           │
│  Marketplaces    │  │ ...      │  │ ...      │  │ ...      │           │
│  ☑ AliExpress    │  └──────────┘  └──────────┘  └──────────┘           │
│  ☑ Temu          │                                                       │
│  ☑ Amazon        │                            ← 1  2  3  4  5 →        │
└──────────────────┴──────────────────────────────────────────────────────┘
```

### 🔐 Authentication Pages (Sign In / Sign Up)

```
┌─────────────────────────────┐     ┌─────────────────────────────┐
│   ⚡ iSHOP                  │     │   ⚡ iSHOP                  │
│                             │     │                             │
│   Welcome back              │     │   Create your account      │
│   Sign in to your account   │     │   Join iSHOP NEON FX today  │
│                             │     │                             │
│  ┌───────────────────────┐  │     │  ┌───────────────────────┐  │
│  │ ✉ Email               │  │     │  │ 👤 Full Name          │  │
│  └───────────────────────┘  │     │  └───────────────────────┘  │
│  ┌───────────────────────┐  │     │  ┌───────────────────────┐  │
│  │ 🔒 Password        👁 │  │     │  │ ✉ Email               │  │
│  └───────────────────────┘  │     │  └───────────────────────┘  │
│                             │     │  ┌───────────────────────┐  │
│  [◀━━━━ SIGN IN ━━━━▶]     │     │  │ 🔒 Password        👁 │  │
│         ── or ──            │     │  └───────────────────────┘  │
│  [ Google ]  [ Apple ]      │     │                             │
│                             │     │  [◀━━━ CREATE ACCOUNT ━━▶] │
│  Don't have an account?     │     │                             │
│  Sign up →                  │     │  Already have an account?   │
└─────────────────────────────┘     │  Sign in →                  │
                                    └─────────────────────────────┘
```

### 👤 User Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ iSHOP                                        Welcome back, Alex 👋  │
├──────────────┬──────────────────────────────────────────────────────────┤
│              │                                                           │
│  📊 Overview │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  📦 Orders   │  │  📦 Orders   │ │  ❤️ Wishlist  │ │  💰 Savings  │    │
│  ❤️ Wishlist  │  │     12       │ │     8        │ │   $47.32     │    │
│  🎫 Coupons  │  └──────────────┘ └──────────────┘ └──────────────┘    │
│  📍 Addresses│                                                           │
│  💳 Payment  │  Recent Orders                                           │
│  ⚙️  Settings │  ┌─────────────────────────────────────────────────┐   │
│              │  │ ORD-001  •  3 items  •  $89.97  •  ✅ Delivered  │   │
│              │  │ ORD-002  •  1 item   •  $29.99  •  🚚 Shipped    │   │
│              │  │ ORD-003  •  2 items  •  $54.98  •  ⏳ Processing  │   │
│              │  └─────────────────────────────────────────────────┘   │
└──────────────┴──────────────────────────────────────────────────────────┘
```

### ⚙️ Admin Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ iSHOP Admin                                          admin@shop.com  │
├─────────────────┬───────────────────────────────────────────────────────┤
│                 │                                                         │
│  📊 Dashboard   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  📦 Products ▼  │  │ Revenue  │ │ Orders   │ │ Products │ │  Users   ││
│    Categories   │  │$124,832  │ │  1,247   │ │  8,934   │ │  3,521   ││
│    Brands       │  │ +12.5% ↑ │ │ +8.3% ↑  │ │ +2.1% ↑  │ │ +5.7% ↑  ││
│    Import       │  └──────────┘ └──────────┘ └──────────┘ └──────────┘│
│  🛒 Orders      │                                                         │
│  👥 Users       │  Sales Trend (last 30 days)                            │
│  🎯 Affiliates  │  ╭────────────────────────────────────────────╮       │
│  🎫 Coupons     │  │      ▁▂▃▄▅▆▇█▇▆▅▆▇█████▇▆▇███▇▆▅▆▇      │       │
│  🔖 Banners     │  ╰────────────────────────────────────────────╯       │
│  💹 Pricing     │                                                         │
│  🤖 Automation  │  Top Products                   Recent Activity        │
│  🏪 Marketplaces│  1. Wireless Headphones $89.99  • Order #1247 placed  │
│  🧠 AI Builder  │  2. Leather Wallet      $34.99  • User registered     │
│  📈 Analytics   │  3. Smart Watch         $129.99 • Product imported    │
│  ⚙️  Settings    │                                                         │
└─────────────────┴───────────────────────────────────────────────────────┘
```

### 🌐 Marketplace Proxy (Search)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Search Marketplace Products                                             │
│                                                                          │
│  ┌─────────────────────────────────────────────┐  [AliExpress ▼]  [🔍] │
│  │ Search products (e.g. wireless headphones)  │                        │
│  └─────────────────────────────────────────────┘                        │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │  AliExpress  │  │    Amazon    │  │     Temu     │                  │
│  │ [image]      │  │ [image]      │  │ [image]      │                  │
│  │ Wireless     │  │ Premium      │  │ Budget        │                  │
│  │ Headphones   │  │ Headphones   │  │ Earbuds       │                  │
│  │ 🌐 $12.99   │  │ 🌐 $89.99   │  │ 🌐 $8.99    │                  │
│  │ [+ Import]   │  │ [+ Import]   │  │ [+ Import]   │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🤝 Affiliate Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ⚡ iSHOP Affiliate                                     John Smith 🔗   │
├──────────────────┬──────────────────────────────────────────────────────┤
│                  │                                                        │
│  📊 Overview     │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  🔗 Links        │  │  Total       │  │  Conversions │  │  Pending   │ │
│  💰 Earnings     │  │  Earnings    │  │   This Month │  │  Payout    │ │
│  📈 Conversions  │  │  $2,847.50   │  │    47        │  │  $312.00   │ │
│  🖼️  Banners      │  └──────────────┘  └──────────────┘  └────────────┘ │
│  ⚙️  Settings     │                                                        │
│                  │  Your Referral Link                                   │
│                  │  ┌──────────────────────────────────────────┐        │
│                  │  │ https://ishop.com/?ref=JOHN123      [📋] │        │
│                  │  └──────────────────────────────────────────┘        │
│                  │                                                        │
│                  │  Commission Rate: 8%   Cookie: 30 days               │
└──────────────────┴──────────────────────────────────────────────────────┘
```

---

## Features

### Storefront (Frontend)

| Feature | Description |
|---------|-------------|
| 🎨 NEON FX Design | Cyberpunk dark theme with cyan/purple neon accents and glassmorphism |
| 📱 Responsive PWA | Mobile-first layout, installable as a Progressive Web App |
| 🛒 Cart & Checkout | Persistent cart (localStorage), multi-step checkout, coupon codes |
| 🔍 Product Search | Debounced search with filters, sorting, and marketplace source filter |
| 🏷️ Categories & Brands | Browsable taxonomy with dedicated listing pages |
| ❤️ Wishlist | Save-for-later, shareable lists |
| 👤 User Accounts | Order history, address book, payment methods, settings |
| 🤝 Affiliate Portal | Referral links, commission tracking, banner downloads |

### Admin Panel

| Feature | Description |
|---------|-------------|
| 📦 Product Management | CRUD, bulk import from marketplaces, variant/image management |
| 🛒 Order Management | Status tracking, supplier fulfillment, timeline |
| 💹 Dynamic Pricing | Rule-based markup engine (%, fixed, per-marketplace) |
| 🤖 Automation | BullMQ job queues — price sync, stock sync, order fulfillment |
| 🌐 Marketplace Proxy | Unified search across AliExpress, Temu, Amazon, eBay |
| 🧠 AI Builder | OpenAI-powered store/product description generator |
| 📈 Analytics | Revenue, orders, users KPIs with AI-powered insights |
| 🎫 Coupons | % off, fixed, free shipping coupons with usage limits |
| 🔖 Banners | Promotional banners with position targeting |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   Browser / Mobile                                                       │
│      │                                                                   │
│      ▼                                                                   │
│   ┌─────────────────────────────────────────────┐                       │
│   │  Next.js 15  (frontend/)                    │                       │
│   │  App Router · TypeScript · Tailwind CSS     │                       │
│   │  React 19 · next-pwa · Zustand (hooks)      │                       │
│   └─────────────────────┬───────────────────────┘                       │
│                          │  REST API  (HTTP/JSON)                        │
│                          ▼                                               │
│   ┌─────────────────────────────────────────────┐                       │
│   │  NestJS 11  (backend/)                      │                       │
│   │  JWT Auth · Guards · Swagger · Helmet       │                       │
│   │  ValidationPipe · TransformInterceptor      │                       │
│   └──────┬─────────────────┬────────────────────┘                       │
│          │                 │                                             │
│          ▼                 ▼                                             │
│   ┌──────────────┐  ┌─────────────────────┐                             │
│   │ PostgreSQL   │  │  Redis + BullMQ      │                             │
│   │ (Prisma ORM) │  │  5 worker queues     │                             │
│   └──────────────┘  └─────────────────────┘                             │
│                                                                          │
│   External: AliExpress · Temu · Amazon PAAPI · eBay · OpenAI            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
app/
├── .github/
│   └── workflows/
│       ├── ci.yml            # Lint, type-check, build + unit tests on every push/PR
│       └── cd.yml            # Production deploy (Vercel + Docker/Railway)
├── frontend/                 # Next.js 15 App Router frontend
│   ├── public/
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── app/              # File-based routing (App Router)
│   │   │   ├── layout.tsx            # Root layout (Navbar, Footer, providers)
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── globals.css           # Tailwind base + NEON FX custom properties
│   │   │   ├── auth/
│   │   │   │   ├── signin/page.tsx   # Sign in → calls useAuth().signIn()
│   │   │   │   └── signup/page.tsx   # Sign up → calls useAuth().signUp()
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx          # All products
│   │   │   │   └── [category]/page.tsx
│   │   │   ├── product/
│   │   │   │   └── [slug]/page.tsx   # Product detail (async params)
│   │   │   ├── brands/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── search/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── deals/page.tsx
│   │   │   ├── affiliates/page.tsx
│   │   │   ├── users/                # Customer portal (requires auth)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx          # Dashboard overview
│   │   │   │   ├── orders/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx
│   │   │   │   ├── wishlist/page.tsx
│   │   │   │   ├── coupons/page.tsx
│   │   │   │   ├── addresses/page.tsx
│   │   │   │   ├── payment/page.tsx
│   │   │   │   ├── track/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   ├── admin/                # Admin panel (requires admin role)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx          # KPI dashboard
│   │   │   │   ├── products/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── categories/page.tsx
│   │   │   │   │   ├── brands/page.tsx
│   │   │   │   │   └── import/page.tsx
│   │   │   │   ├── orders/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── supplier/page.tsx
│   │   │   │   ├── marketplaces/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [name]/page.tsx  # Per-marketplace search (React.use params)
│   │   │   │   ├── analytics/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── ai/page.tsx
│   │   │   │   ├── affiliates/page.tsx
│   │   │   │   ├── automation/page.tsx
│   │   │   │   ├── banners/page.tsx
│   │   │   │   ├── builder/page.tsx
│   │   │   │   ├── coupons/page.tsx
│   │   │   │   ├── pricing/page.tsx
│   │   │   │   └── settings/page.tsx
│   │   │   └── affiliate/            # Affiliate portal
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── links/page.tsx
│   │   │       ├── earnings/page.tsx
│   │   │       ├── conversions/page.tsx
│   │   │       ├── banners/page.tsx
│   │   │       └── settings/page.tsx
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx        # Top navigation bar
│   │   │   │   ├── Footer.tsx        # Site footer
│   │   │   │   └── MobileNav.tsx     # Mobile bottom navigation
│   │   │   ├── ui/
│   │   │   │   ├── NeonButton.tsx    # Animated neon CTA button
│   │   │   │   ├── NeonCard.tsx      # Glassmorphism card with neon border
│   │   │   │   ├── ProductCard.tsx   # Product tile with add-to-cart
│   │   │   │   ├── Badge.tsx         # Status/label badge
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── admin/
│   │   │   │   ├── KPICard.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── affiliate/
│   │   │   │   └── Sidebar.tsx
│   │   │   └── users/
│   │   │       └── Sidebar.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts    # JWT auth state → localStorage (mock in dev, real API in prod)
│   │   │   └── useCart.ts    # Cart state → localStorage, deduplicated state updates
│   │   ├── lib/
│   │   │   ├── api.ts        # Axios API client (base URL from NEXT_PUBLIC_API_URL)
│   │   │   ├── constants.ts  # App-wide constants (routes, defaults)
│   │   │   └── utils.ts      # cn(), formatPrice(), debounce()
│   │   └── types/
│   │       └── index.ts      # Shared TypeScript interfaces (Product, User, Order…)
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── backend/                   # NestJS 11 REST API
    ├── prisma/
    │   └── schema.prisma      # 18 models, 9 enums (PostgreSQL)
    ├── src/
    │   ├── main.ts            # Bootstrap: helmet, CORS, Swagger, ValidationPipe
    │   ├── app.module.ts      # Root module (imports all feature modules)
    │   ├── auth/              # JWT + Local auth strategies, guards, decorators
    │   │   ├── auth.controller.ts   # POST /auth/sign-in, sign-up, GET /auth/me
    │   │   ├── auth.service.ts
    │   │   ├── auth.module.ts
    │   │   ├── strategies/
    │   │   │   ├── jwt.strategy.ts   # Throws if JWT_SECRET missing
    │   │   │   └── local.strategy.ts
    │   │   ├── guards/
    │   │   │   ├── jwt-auth.guard.ts
    │   │   │   └── roles.guard.ts
    │   │   └── decorators/
    │   │       └── roles.decorator.ts
    │   ├── users/             # User CRUD — ownership enforced
    │   ├── products/          # Product CRUD with search/filter
    │   ├── categories/        # Category tree
    │   ├── brands/            # Brand management
    │   ├── orders/            # Order placement (server-side pricing), status tracking
    │   ├── affiliates/        # Affiliate accounts and links
    │   ├── coupons/           # Coupon CRUD + authenticated validation
    │   ├── pricing/           # Rule-based pricing engine (%, fixed, per-marketplace)
    │   ├── banners/           # Promotional banner management
    │   ├── analytics/         # Revenue, orders, user KPIs
    │   ├── ai/                # OpenAI gpt-4o-mini content generation
    │   ├── builder/           # AI-powered store suggestion engine
    │   ├── proxy/             # Marketplace proxy (AliExpress, Temu, Amazon, eBay)
    │   │   └── adapters/      # Per-marketplace adapter pattern
    │   ├── workers/           # BullMQ job processors (5 queues)
    │   ├── prisma/            # PrismaService (singleton)
    │   └── common/            # Shared DTOs, interceptors
    ├── .env.example
    ├── nest-cli.json
    ├── tsconfig.json
    └── package.json
```

---

## Quick Start (User Guide)

### Browsing the Store

1. Navigate to the store URL (or `http://localhost:3000` locally).
2. Browse products on the **Shop** page, or use the search bar at the top.
3. Filter by **category**, **brand**, or **price range** in the left sidebar.
4. Click any product card to view the full product detail page.

### Creating an Account

1. Click **Sign Up** in the top navigation.
2. Enter your name, email, and a password (min. 8 characters).
3. Click **Create Account** — you'll be redirected to your dashboard.

### Placing an Order

1. Add items to your cart using the **Add to Cart** button on any product.
2. Click the 🛒 cart icon in the navigation to review your cart.
3. Proceed to **Checkout**, enter your shipping address, and apply any coupon codes.
4. Complete payment to place your order.

### Tracking Orders

- Visit **My Account → Orders** to see all your orders and their current status.
- Click any order to view the full timeline (Pending → Processing → Shipped → Delivered).

### Using Coupon Codes

- Enter your coupon code in the cart or at checkout.
- Valid coupons will show the discount amount before you confirm.

### Becoming an Affiliate

1. Visit the **Affiliates** page and apply to join the program.
2. Once approved, log in and go to the **Affiliate Portal** (`/affiliate`).
3. Copy your unique referral link from **My Links**.
4. Share it — earn commission on every sale you refer.

---

## Developer Guide

### Prerequisites

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| Node.js | 20.x LTS | Use [nvm](https://github.com/nvm-sh/nvm) |
| npm | 10.x | Comes with Node 20 |
| PostgreSQL | 14+ | Or use Docker |
| Redis | 6+ | Or use Docker |
| Git | 2.x | |

### Environment Variables

#### Backend (`backend/.env`)

Copy the example and fill in your values:

```bash
cp backend/.env.example backend/.env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | **Strong random secret** — app won't start without this |
| `JWT_EXPIRES_IN` | ✅ | Token TTL (e.g. `7d`, `24h`) |
| `REDIS_URL` | ✅ | Redis connection string for BullMQ queues |
| `PORT` | ✅ | API server port (default `3001`) |
| `NODE_ENV` | ✅ | `development` / `production` / `test` |
| `OPENAI_API_KEY` | ⬜ | Required for AI Builder and AI Analytics |
| `TEMU_API_KEY` | ⬜ | Temu marketplace adapter |
| `ALIEXPRESS_APP_KEY` | ⬜ | AliExpress Open Platform App Key |
| `ALIEXPRESS_APP_SECRET` | ⬜ | AliExpress Open Platform App Secret |
| `AMAZON_ACCESS_KEY` | ⬜ | Amazon Product Advertising API 5.0 |
| `AMAZON_SECRET_KEY` | ⬜ | Amazon PAAPI5 secret |
| `AMAZON_PARTNER_TAG` | ⬜ | Amazon Associates tag |
| `EBAY_APP_ID` | ⬜ | eBay Developer App ID |
| `FRONTEND_URL` | ⬜ | Production frontend URL for CORS (localhost allowed in dev) |

#### Frontend (`frontend/.env.local`)

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev          # Start development server on http://localhost:3000
```

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env — set DATABASE_URL, JWT_SECRET, REDIS_URL at minimum

npm install

# Generate Prisma client
npx prisma generate

# Create database and run all migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
# npx prisma db seed

# Start development server with hot-reload
npm run start:dev    # API at http://localhost:3001
                     # Swagger UI at http://localhost:3001/api/docs
```

### Running Everything Together

#### Option A — Two terminals

```bash
# Terminal 1 — Frontend
cd frontend && npm run dev

# Terminal 2 — Backend
cd backend && npm run start:dev
```

#### Option B — Docker Compose (recommended for production-like local dev)

> Create a `docker-compose.yml` at the project root if you need a containerised setup.

```yaml
# docker-compose.yml (example)
version: '3.9'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: ishop_neon_fx
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports: ['5432:5432']

  redis:
    image: redis:7-alpine
    ports: ['6379:6379']
```

```bash
docker compose up -d      # Start Postgres + Redis
cd backend && npm run start:dev
cd frontend && npm run dev
```

---

## CLI Command Reference

### Frontend Commands

```bash
cd frontend

npm run dev           # Start Next.js dev server (http://localhost:3000)
npm run build         # Production build → .next/
npm run start         # Start production server (requires npm run build first)
npm run lint          # Run ESLint
npm run type-check    # Run tsc --noEmit (zero TypeScript errors required)
```

### Backend Commands

```bash
cd backend

# ── Development ─────────────────────────────────────────────────────────────
npm run start:dev     # NestJS dev server with hot-reload (http://localhost:3001)

# ── Build & Production ───────────────────────────────────────────────────────
npm run build         # Compile TypeScript → dist/
npm run start:prod    # Run compiled production build

# ── Testing ─────────────────────────────────────────────────────────────────
npm test              # Run all unit tests
npm run test:watch    # Watch mode
npm run test:cov      # Coverage report → coverage/
npm run test:e2e      # End-to-end tests

# ── Code Quality ─────────────────────────────────────────────────────────────
npm run lint          # ESLint + auto-fix

# ── Prisma / Database ────────────────────────────────────────────────────────
npx prisma generate          # Regenerate Prisma client from schema
npx prisma migrate dev       # Create + apply a new migration (dev)
npx prisma migrate deploy    # Apply pending migrations (production)
npx prisma migrate reset     # ⚠️  Drop database and re-run all migrations
npx prisma studio            # Open Prisma Studio GUI (http://localhost:5555)
npx prisma db pull           # Introspect existing DB → update schema.prisma
npx prisma db push           # Push schema changes without a migration file
npx prisma format            # Format schema.prisma
```

### CI / Type-Check (both workspaces)

```bash
# From repo root — run these before pushing to keep CI green:
cd frontend && npx tsc --noEmit && cd ..
cd backend  && npx tsc --noEmit && cd ..
```

---

## API Reference

Swagger UI is available at **`http://localhost:3001/api/docs`** when the backend is running.

### Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/sign-up` | `POST` | Public | Register a new user |
| `/auth/sign-in` | `POST` | Public | Get JWT access token |
| `/auth/me` | `GET` | JWT | Get current user profile |

### Users

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/users` | `GET` | Admin | List all users (paginated) |
| `/users/:id` | `GET` | JWT (own or Admin) | Get user profile |
| `/users/:id` | `PATCH` | JWT (own or Admin) | Update user profile |
| `/users/:id` | `DELETE` | Admin | Delete user |

### Products, Categories, Brands

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/products` | `GET` | Public | List/search products |
| `/products/:id` | `GET` | Public | Get product detail |
| `/products` | `POST` | Admin | Create product |
| `/products/:id` | `PATCH` | Admin | Update product |
| `/products/:id` | `DELETE` | Admin | Delete product |
| `/categories` | `GET/POST/PATCH/DELETE` | Public / Admin | Category CRUD |
| `/brands` | `GET/POST/PATCH/DELETE` | Public / Admin | Brand CRUD |

### Orders

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/orders` | `GET` | JWT | List orders (admin = all; customer = own) |
| `/orders/:id` | `GET` | JWT (own or Admin) | Get order (ownership enforced) |
| `/orders` | `POST` | JWT | Create order (prices fetched server-side) |
| `/orders/:id/status` | `PATCH` | Admin | Update order status |

### Coupons

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/coupons/validate` | `GET` | JWT | Validate a coupon code |
| `/coupons` | `GET/POST/PATCH/DELETE` | Admin | Coupon CRUD |

### Proxy (Marketplace Search)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/proxy/search` | `GET` | JWT | Search products on a marketplace |
| `/proxy/products/:marketplace/:id` | `GET` | JWT | Get product from marketplace |

### Automation (Admin)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/automation/stats` | `GET` | Admin | BullMQ queue statistics |
| `/automation/jobs/:type/trigger` | `POST` | Admin | Trigger a job queue |

**Job types:** `price-sync` · `stock-sync` · `order-fulfillment` · `product-import` · `image-optimization`

### AI & Builder (Admin)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/ai/generate` | `POST` | Admin | Generate AI product content |
| `/builder/suggestions` | `GET/POST` | Admin | AI store builder |

---

## CI/CD

### Continuous Integration (`.github/workflows/ci.yml`)

Runs on every push and pull request:

```
push / pull_request
         │
         ├── Frontend — lint & build
         │     ├── npm ci --legacy-peer-deps
         │     ├── npx tsc --noEmit
         │     └── npm run build
         │
         ├── Backend — lint, type-check & build
         │     ├── npm ci
         │     ├── npx prisma generate
         │     └── npm run build
         │
         └── Backend — unit tests (needs: backend-build)
               ├── npm ci
               ├── npx prisma generate
               └── npm test -- --passWithNoTests
```

### Continuous Deployment (`.github/workflows/cd.yml`)

Runs on push to `main`/`master`:

- **Frontend** — builds and deploys to Vercel (configure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` in repo secrets).
- **Backend** — builds Docker image and pushes to GHCR, then deploys to Railway / Fly.io (uncomment and configure the relevant steps in `cd.yml`).

---

## Security

This project follows secure-by-default patterns:

| Area | Protection |
|------|-----------|
| JWT Secret | App throws at startup if `JWT_SECRET` env var is not set — no weak fallback |
| Auth | All non-public endpoints require a valid JWT (`JwtAuthGuard`) |
| Authorization | Ownership checks on user profiles and orders; admin-only endpoints protected by `RolesGuard` |
| Privilege Escalation | `role` field removed from `UpdateUserDto` — role changes require a separate admin-only endpoint |
| Price Manipulation | Client cannot supply item prices; server always looks up authoritative price from the database |
| Coupon Enumeration | `GET /coupons/validate` requires authentication to prevent brute-force enumeration |
| Open Proxy | Marketplace proxy endpoints require JWT to prevent API key abuse |
| CORS | `localhost` origins allowed only outside production; production requires explicit `FRONTEND_URL` |
| Dependencies | `next` ≥ 15.5.12, `serialize-javascript` ≥ 7.0.3, `axios` ≥ 1.13.5, `@nestjs/*` ≥ 11 |

**Reporting a vulnerability:** Please open a private security advisory via GitHub rather than a public issue.

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes — ensure `tsc --noEmit` passes in both workspaces.
3. Run lint: `npm run lint` in both `frontend/` and `backend/`.
4. Open a Pull Request against `main`. CI will run automatically.

### Code Style

- TypeScript strict mode — no `any` unless unavoidable.
- NestJS conventions: one module per feature, DTOs with `class-validator`, services handle business logic.
- React: hooks for state, `'use client'` on all interactive components, Next.js 15 async `params`.

---

<div align="center">

Built with ⚡ by the iSHOP NEON FX team  
MIT License — see [LICENSE](LICENSE)

</div> 
