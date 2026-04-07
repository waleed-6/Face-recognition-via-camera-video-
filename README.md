# Ikhtibarni Web App (اختبرني)

Production-ready React + Vite frontend for Ikhtibarni, an AI-powered exam generation platform.

## Tech
- React 18 + Vite
- Tailwind CSS v3
- React Router v6
- Context API (auth, language, theme)
- PostgreSQL SQL files (schema + seed + migration)

## Setup
1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```

## Database
Apply schema:
```bash
psql "$DATABASE_URL" -f database/schema.sql
```
Apply migration:
```bash
psql "$DATABASE_URL" -f database/migrations/001_initial.sql
```
Run seed data:
```bash
psql "$DATABASE_URL" -f database/seed.sql
```

## Free trial logic
Backend should read `config.subscription.freeTrialDays` and set trial dates during registration. On each authenticated request, status transitions to `expired` if trial/subscription end date passed.

## Payment flow
Frontend calls backend APIs:
- `POST /payments/initiate`
- `GET /payments/:id/status`

Backend-only webhook endpoint:
- `POST /payments/webhook`
- Verify signature using `config.payment.webhookSecret`
- Replace signature verification logic when provider is chosen.

## Switching Payment Provider
All payment provider logic is isolated in `src/services/payment.js`.
1. Keep function signatures unchanged:
   - `initiatePayment`
   - `verifyPayment`
   - `getPaymentStatus`
2. Replace placeholder bodies with provider SDK calls (e.g. Moyasar).
3. Keep `PaymentError` usage so app-wide error handling stays consistent.
4. Do not call payment SDK from other files.

## Seed mode toggle
- `config.features.useSeedData = true` enables local seed simulation.
- Set to `false` before production deployment.

## Routes
- Public: `/`, `/register`, `/login`
- Protected: `/dashboard`, `/generate`, `/exam/:id`, `/subscribe`, `/settings`
- Payment result: `/subscribe/success`, `/subscribe/fail`
- Fallback: `*` (404)
