# Marquee — MovieApp

A movie search app scaffold built with Next.js (App Router), TypeScript, and Tailwind CSS.
This is the **Phase: Foundations** deliverable for FE-05 — routing, layout, design tokens,
and a health-check page are in place. Search, Firebase auth, and favorites persistence
land in **Phase 3: Build (core)**.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Server Components by default; Client Components only for interactive bits
  (search input, login/register forms)

## Routes

| Route          | Type    | Purpose                                   |
|----------------|---------|--------------------------------------------|
| `/`            | Static  | Home — search bar + featured movie grid   |
| `/movie/[id]`  | Dynamic | Movie detail placeholder                  |
| `/favorites`   | Static  | Favorites placeholder (needs auth)        |
| `/login`       | Static  | Sign-in form (client component)           |
| `/register`    | Static  | Registration form (client component)      |
| `/health`      | Dynamic | Health check — renders live fetched data  |

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values. Nothing in this
repo requires secrets to build or run the placeholder pages — `.env.local`
is gitignored, so real keys never get committed.

```bash
cp .env.example .env.local
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: Next.js (auto-detected).
4. Add the environment variables from `.env.example` under
   Project Settings → Environment Variables (use real values, not the empty
   template).
5. Deploy. Every subsequent push to the repo generates a new preview URL
   automatically.
6. Visit `/health` on the deployed URL to confirm the build is live and can
   reach the network.

## Roadmap (Phase 3: Build core)

- Wire `/` search bar to the OMDB API
- Replace mock movie data with live OMDB fetches
- Add Firebase Authentication (login/register/logout)
- Add Firestore-backed favorites, scoped per user
- Protect `/favorites` behind auth
