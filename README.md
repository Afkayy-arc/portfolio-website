# Muhammad Abdullah — portfolio

Personal site for Muhammad Abdullah, full-stack software engineer. Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, next-themes.

## Design system

Two documented systems, one per theme, selected by system preference with a manual toggle in the nav:

- **Light — [`DESIGN.md`](./DESIGN.md)** (Vercel): white canvas, near-black ink, `#0070f3` as the single accent, pill CTAs, stacked hairline shadows.
- **Dark — [`DESIGN.dark.md`](./DESIGN.dark.md)** (Linear): `#010102` canvas, four-step surface ladder, lavender `#5e6ad2` accent, 8px CTAs.

Both share Geist Sans/Mono and the same layout. Every colour is a CSS variable in `app/globals.css` (`:root` = light, `.dark` = dark) referenced from `tailwind.config.ts`, so components never branch on theme. To change a colour, edit the variable, not a component.

## Editing content

Everything on the page comes from **`constants/data.ts`**: personal info, metrics, projects, stack, experience, nav. Edit that file and redeploy.

## Running

```bash
npm install
cp .env.example .env.local   # fill in Gmail values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Environment

| Variable | Purpose |
|---|---|
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `RECIPIENT_EMAIL` | Contact form delivery via Nodemailer |
| `RATE_LIMIT_MAX_REQUESTS`, `RATE_LIMIT_WINDOW_MS` | Contact form rate limit (default 3/hour/IP, in-memory) |
| `NEXT_PUBLIC_SITE_URL` | Production URL for sitemap, robots and OpenGraph |

## Structure

```
app/
  layout.tsx          fonts, metadata, theme provider, skip link
  page.tsx            section composition
  api/contact/        contact form endpoint (Zod validation, rate limit, Nodemailer)
  opengraph-image.tsx generated OG card
  not-found.tsx       404
components/
  Navbar, ThemeToggle, Hero, Section, ProjectList, TechStack, ExperienceList,
  ContactForm, CopyEmail, Footer, Reveal (motion primitive), icons
constants/data.ts     all content
lib/                  email, rate limiter, validation, site URL
public/CV/            downloadable CV
public/images/        unused legacy project art
```

## Deploy

Push to GitHub, import on Vercel, add the environment variables above. Analytics and Speed Insights activate automatically on Vercel.
