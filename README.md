# SignFlow — Freelance E-Signing

A secure e-signature platform built for freelancers. Create, send, and sign contracts in minutes.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Auth & Database:** Supabase
- **Payments:** Lemon Squeezy
- **PDF:** pdf-lib
- **Email:** Resend
- **Styling:** Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3010](http://localhost:3010) in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `https://signflow-iota.vercel.app`) |

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
npm run build
```

Recommended: enable Supabase Row Level Security and set `NEXT_PUBLIC_SITE_URL` to your production domain.
