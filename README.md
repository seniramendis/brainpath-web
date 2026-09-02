This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Authentication

Real email/password + Google sign-in was added on top of this template. Quick setup:

```bash
cp .env.example .env       # then fill in DATABASE_URL, AUTH_SECRET (and Google keys, optional)
npm install
npx prisma migrate dev --name add-users   # creates the User table in your database
npm run seed                              # optional: seeds the SFT module data
npm run dev
```

- `DATABASE_URL` — required, a real Postgres connection string (e.g. from
  [Neon](https://neon.tech), Vercel Postgres, or Supabase — all have free
  tiers). SQLite doesn't work on Vercel because serverless functions don't
  share a persistent filesystem.
- `AUTH_SECRET` — required. Generate one with `openssl rand -base64 32`.
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — optional. Without them the
  "Continue with Google" button redirects back to `/login` with a friendly
  "not set up yet" message instead of erroring. To enable it, create an
  OAuth 2.0 **Web application** client at
  [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials)
  and add `http://localhost:3000/api/auth/google/callback` (plus your
  production URL equivalent) as an authorized redirect URI.

How it works, in short:
- `/dashboard`, `/practice`, `/analytics`, `/resources`, and `/settings` are
  gated by `proxy.ts` (Next.js 16's replacement for `middleware.ts`) — no
  session cookie, no access.
- Sessions are signed, httpOnly JWT cookies (`lib/session.ts`, via `jose`).
- Passwords are hashed with bcrypt (`lib/passwords.ts`).
- Signup/login/logout are Server Actions in `app/actions/auth.ts`.
- Google sign-in is a hand-rolled OAuth flow under `app/api/auth/google/`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
