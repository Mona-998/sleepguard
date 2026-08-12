# Sleep Guard — Website

A full-stack e-commerce site for a sleep apnea monitoring device, built as a
graduation project to demonstrate production-style patterns: secure
payments, real authentication, a relational database, and a REST API — not
just a static frontend.

**Live demo:** _add your Vercel link here_
**Tech stack:** Next.js 14 · TypeScript · Tailwind CSS · PostgreSQL · Prisma · Stripe · NextAuth.js

---

## What this project demonstrates

- **A modal-based checkout flow** (Details → Location → Payment → Success)
  that opens over any page instead of navigating away, with a live Stripe
  Elements payment form
- **Real authentication** — bcrypt-hashed passwords, NextAuth.js sessions,
  and orders linked to the signed-in account (guest checkout also supported)
- **A REST API you can inspect** under `app/api/` — account creation,
  payment-intent creation, and order confirmation are each their own
  endpoint, with server-side validation independent of the client
- **Payment verification done correctly** — the server re-confirms with
  Stripe that a payment actually succeeded before saving an order, rather
  than trusting a "success" flag sent from the browser
- **Order confirmation emails sent via Gmail SMTP** (Nodemailer) — no
  third-party email vendor
- **A relational schema in PostgreSQL** (via Prisma) with a proper
  `User` ↔ `Order` relationship

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers (Node.js) |
| Database | PostgreSQL, via Prisma ORM |
| Auth | NextAuth.js (Credentials provider) + bcrypt |
| Payments | Stripe (test mode), Stripe Elements |
| Email | Nodemailer over Gmail SMTP |
| Validation | Zod — shared schemas between client and API routes |
| Deployment | Vercel |

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage |
| `/product` | Product details page |
| `/learn` | Device pairing / how-to page |
| `/support` | FAQ page |
| `/signup`, `/signin` | Account creation and login |
| `/orders` | A signed-in user's own order history (protected route) |
| `/admin/orders` | All orders placed (demo-only, not access-controlled) |

## Notable implementation details

**Checkout is a modal, not a page.** `OrderModalProvider` exposes a
`useOrderModal()` hook so any "Order Now" button anywhere in the app can
open the same flow without prop drilling or route changes.

**Payments are verified server-side, twice.** `create-payment-intent`
creates a Stripe PaymentIntent using a secret key that never reaches the
browser. `orders/route.ts` then re-checks the PaymentIntent's status
directly with Stripe's API before writing anything to the database —
closing the gap where a client could otherwise fake a "payment succeeded"
message.

**Validation runs twice, on purpose.** The same Zod schemas
(`lib/validation.ts`) validate in the browser for instant feedback, and
again inside each API route, since client-side checks can always be
bypassed.

**Orders link to accounts when signed in.** `Order.userId` is optional —
guest checkout still works, but if a user is authenticated at checkout,
the order is tagged to their account and shows up on `/orders`.

## Running it locally

### 1. Install PostgreSQL

- Local install: https://www.postgresql.org/download/
- Docker: `docker run --name sleepguard-web-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sleepguard_web -p 5432:5432 -d postgres`
- Or a free hosted option (no local install): [Neon](https://neon.tech) / [Supabase](https://supabase.com)

### 2. Configure environment variables

```bash
cp .env.example .env.local
```
Fill in `DATABASE_URL`, Stripe test keys (from
https://dashboard.stripe.com/test/apikeys), `NEXTAUTH_SECRET` (generate with
`openssl rand -base64 32`), and optionally `GMAIL_USER`/`GMAIL_APP_PASSWORD`
for real confirmation emails.

### 3. Install, migrate, run

```bash
npm install --legacy-peer-deps
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000. Test payments with card `4242 4242 4242 4242`,
any future expiry, any CVC.

## Honest scope notes

This is a portfolio project, not a live business — a few things are
intentionally simplified rather than hidden:

| Piece | Current state |
|---|---|
| Payments | Real Stripe integration, **test mode only** |
| `/admin/orders` | No access control — anyone with the URL can view it |
| Accounts | Login/signup work fully; no password reset or profile editing yet |

## Author

Built by [Your Name] — [LinkedIn] · [Portfolio]
