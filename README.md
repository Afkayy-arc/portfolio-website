# Muhammad Abdullah — portfolio

Personal site for Muhammad Abdullah, full-stack software engineer. Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, next-themes.

## Design system

Two documented systems, one per theme, selected by system preference with a manual toggle in the nav:

- **Light — [`DESIGN.md`](./DESIGN.md)** (Vercel): white canvas, near-black ink, `#0070f3` as the single accent, pill CTAs, stacked hairline shadows.
- **Dark — [`DESIGN.dark.md`](./DESIGN.dark.md)** (Linear): `#010102` canvas, four-step surface ladder, lavender `#5e6ad2` accent, 8px CTAs.

Both share Geist Sans/Mono and the same layout. Every colour is a CSS variable in `app/globals.css` (`:root` = light, `.dark` = dark) referenced from `tailwind.config.ts`, so components never branch on theme. To change a colour, edit the variable, not a component.

## Editing content

Everything on the page comes from **`constants/data.ts`**: personal info, metrics, projects, stack, experience, nav. Edit that file and redeploy. The chat assistant's knowledge is generated from the same file, so it stays in sync automatically.

## Interactive demos

`components/demos/` holds five self-contained React demos (seat-map booking with locks, clinic n8n flow, TapReview review flow, RAG search, Airflow-style ETL). They use fake data and no network calls — the client products they're modelled on are private. `components/LiveDemos.tsx` is the tabbed, swipeable carousel that hosts them; add a demo by appending to its `demos` array.

## Chat assistant

`components/ChatWidget.tsx` is the floating "Ask about my work" button. It streams from `app/api/chat/route.ts`, which calls Google Gemini with a system prompt built from `constants/data.ts` and restricts answers to Muhammad and his work. Rate limited to 30 messages/hour/IP (in-memory). Needs `GEMINI_API_KEY`; `GEMINI_MODEL` defaults to `gemini-3.5-flash` — keep `thinkingConfig.thinkingBudget: 0` in the route or flash models spend the output budget on hidden reasoning.

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
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Chat assistant (Google AI Studio key; model defaults to `gemini-3.5-flash`) |

## Structure

```
app/
  layout.tsx          fonts, metadata, theme provider, skip link
  page.tsx            section composition
  api/contact/        contact form endpoint (Zod validation, rate limit, Nodemailer)
  api/chat/           chat assistant endpoint (Gemini, streaming, rate limit)
  opengraph-image.tsx generated OG card
  not-found.tsx       404
components/
  Navbar, ThemeToggle, Hero, Section, ProjectList, TechStack, ExperienceList,
  ContactForm, CopyEmail, Footer, Reveal (motion primitive), icons
  LiveDemos (carousel) + demos/ (SeatMap, ClinicFlow, ReviewFlow, RagSearch, EtlPipeline)
  ChatWidget
constants/data.ts     all content
lib/                  email, rate limiter, validation, site URL
public/CV/            downloadable CV
public/images/        unused legacy project art
```

## Deploy

Push to GitHub, import on Vercel, add the environment variables above. Analytics and Speed Insights activate automatically on Vercel.
