# Sleep Guard — Website

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Setup

### 1. Install PostgreSQL

You need a Postgres server running. Easiest options:
- **Local install**: https://www.postgresql.org/download/
- **Docker**: `docker run --name sleepguard-web-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=sleepguard_web -p 5432:5432 -d postgres`
- **Free hosted option (no local install)**: [Neon](https://neon.tech) or [Supabase](https://supabase.com)

### 2. Configure environment variables

```bash
cp .env.example .env.local
```
Fill in:
- `DATABASE_URL` — your Postgres connection string
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — test-mode keys from https://dashboard.stripe.com/test/apikeys
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32` (needed for Sign In/Sign Up)
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — optional, only if you want order confirmation emails to actually send (see below)

### 3. Install dependencies and set up the database

```bash
npm install
npx prisma migrate dev --name init
```
This creates the `User` and `Order` tables.

### 4. Run it

```bash
npm run dev
```
Open http://localhost:3000

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage |
| `/product` | "What is Sleep Guard" product page |
| `/learn` | Pairing basics / how-to page |
| `/support` | FAQ page |
| `/signup` | Create an account |
| `/signin` | Sign in |
| `/admin/orders` | View every order placed (no login protecting it yet — see below) |

Header and footer are shared across every page via `app/layout.tsx`.

## Ordering, explained

"Order Now" no longer goes to a separate page — it opens a **modal** on top
of whatever page you're on (`app/components/OrderModal.tsx` +
`OrderModalProvider.tsx`), containing the same 3-step flow: Details →
Location → Payment → Success. There's no delivery-date field, since devices
ship within 2 days automatically.

## Sign In / Sign Up, explained

This uses the exact same pattern as the patient portal project:
- **NextAuth.js** (Credentials provider) manages sessions via a signed cookie
- **bcrypt** hashes passwords — plain-text passwords are never stored
- Two REST API endpoints handle it:
  - `POST /api/auth/register` — creates the account (`app/api/auth/register/route.ts`)
  - `/api/auth/[...nextauth]` — NextAuth's own sign-in/sign-out/session endpoints
- The header shows "Sign in / Sign up" or the user's name + "Sign out"
  depending on session state, using NextAuth's `useSession()` hook

This is real account creation/login, **and orders now link to accounts**:
when someone is signed in at checkout, their order is tagged with their
`userId`. `/orders` (protected — redirects to `/signin` if not logged in)
shows only that account's own past orders. Guest checkout (not signed in)
still works fine — those orders just have no `userId`.

## The backend, explained

Everything under `app/api/` is **backend code** — it runs on the server (via
Node.js), never in the browser. This matters because some of what the order
flow needs (talking to Stripe with a secret key, verifying a payment actually
succeeded, sending an email) can't safely happen in client-side JavaScript.

### `app/api/create-payment-intent/route.ts`
Creates a Stripe **PaymentIntent** in test mode using your secret key, which
never leaves the server. Re-validates the order with the same Zod schema
used on the client first.

### `app/api/orders/route.ts`
Called only *after* Stripe confirms the payment succeeded. Re-checks with
Stripe directly that the payment actually succeeded (never trust a
"success" flag from the browser), saves the order to Postgres, then sends
the confirmation email.

## Confirmation email — sent via your own Gmail, no third-party API

`lib/mailer.ts` uses **Nodemailer** with Gmail's SMTP servers directly —
not a third-party email API/service. To make it actually send:

1. Turn on 2-Step Verification on your Google account (required)
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Set `GMAIL_USER` (your Gmail address) and `GMAIL_APP_PASSWORD` (the
   16-character App Password, not your normal password) in `.env.local`

Without these set, the order flow still works end-to-end — it just logs the
email content to your terminal instead of sending it.

## What's simulated / what to wire up for a real launch

| Piece | Current state | To make it real |
|---|---|---|
| Payments | Real Stripe integration, **test mode only** | Swap test keys for live keys |
| Order storage | **Real PostgreSQL via Prisma** | Already production-ready |
| Accounts | **Real** — Postgres + bcrypt + NextAuth, orders linked to accounts via `userId` | Add profile editing, password reset |
| Confirmation email | Sent via your Gmail if configured, otherwise logged | Add `GMAIL_USER`/`GMAIL_APP_PASSWORD` |
| `/admin/orders` | No login protecting it | Add an auth check using the same NextAuth session, restricted to a specific admin email |

## Validation

`lib/validation.ts` holds Zod schemas used **both** in the browser (instant
field-level errors) **and** again on the server inside the API routes —
client-side validation is for UX, server-side is for security, since the
client-side check can always be bypassed.

## Testing the payment flow

Use Stripe's test card: `4242 4242 4242 4242`, any future expiry date, any
3-digit CVC, any postal code.
