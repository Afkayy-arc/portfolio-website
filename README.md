# Muhammad Abdullah — portfolio

Personal site for Muhammad Abdullah, full-stack software engineer. Next.js 15 (App Router), TypeScript, Tailwind CSS 3, Framer Motion, next-themes.

## Design system

Two documented systems, one per theme, selected by system preference with a manual toggle in the nav:

- **Light — [`DESIGN.md`](./DESIGN.md)** (Vercel): white canvas, near-black ink, `#0070f3` as the single accent, pill CTAs, stacked hairline shadows.
- **Dark — [`DESIGN.dark.md`](./DESIGN.dark.md)** (Linear): `#010102` canvas, four-step surface ladder, lavender `#5e6ad2` accent, 8px CTAs.

Both share Geist Sans/Mono and the same layout. Every colour is a CSS variable in `app/globals.css` (`:root` = light, `.dark` = dark) referenced from `tailwind.config.ts`, so components never branch on theme. To change a colour, edit the variable, not a component.

## Editing content

Everything on the page comes from **`constants/data.ts`**: personal info, metrics, projects, stack, experience, nav. Edit that file and redeploy. The chat assistant's knowledge is generated from the same file, so it stays in sync automatically.

## Page structure

There is no top navigation. A **side rail** (`components/Rail.tsx`; a bottom bar below `md`) holds Ask · Demos · Work · About · Terminal · theme. Components talk through a tiny window-event bus (`lib/bus.ts`): `open-demo`, `open-project`, `toggle-terminal`, `focus-ask`.

- **Ask hero** (`AskHero.tsx`) — the AI assistant is the front door. Streams from `app/api/chat/route.ts` (Gemini, system prompt built from `constants/data.ts`, scoped to Muhammad's work, 30 msg/hour/IP). The model appends `[[cards: id, …]]`; the hero strips it and renders demo/project/contact/CV cards. `LiveStatus.tsx` shows live facts from `app/api/status/route.ts` (GitHub last commit, Open-Meteo weather; cached 10–30 min; anything that fails is omitted, never faked).
- **Demos** (`DemoCanvas.tsx`) — n8n-style workflow canvas: drag to pan, click a node to mount that demo below. Below `lg`, and via the Canvas/List toggle, `LiveDemos.tsx` (tabbed carousel) is the fallback. Demo metadata lives in `constants/data.ts` (`demos`); components in `components/demos/`, keyed by id in `components/demos/index.ts`.
- **Work** (`ProjectStrips.tsx`) — film-strip gallery; hover/focus widens a strip. Below `md`, `ProjectList.tsx` rows.
- **About** — `BioToggle.tsx` (short/long), facts panel, `ExperienceList`, `TechStack`, `ContactForm`.
- **Terminal** (`Terminal.tsx`) — press `` ` `` or the rail icon. `help`, `projects`, `open <slug>`, `demo <id>`, `stack`, `experience`, `contact`, `cv`, `ask <q>`, `theme`, `clear`.

Gemini notes: `GEMINI_MODEL` defaults to `gemini-3.5-flash`; keep `thinkingConfig.thinkingBudget: 0` in the chat route or flash models spend the output budget on hidden reasoning.

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
  api/chat/           chat assistant endpoint (Gemini, streaming, rate limit, card tags)
  api/status/         live status facts (GitHub, Open-Meteo), cached
  opengraph-image.tsx generated OG card
  not-found.tsx       404
components/
  Rail, ThemeToggle, AskHero, LiveStatus, DemoCanvas, LiveDemos, ProjectStrips,
  ProjectList, BioToggle, TechStack, ExperienceList, ContactForm, CopyEmail,
  Footer, Terminal, Reveal (motion primitive), icons
  demos/ (SeatMap, ClinicFlow, ReviewFlow, RagSearch, EtlPipeline, index)
constants/data.ts     all content, demo catalog, card ids
lib/                  bus (events), email, rate limiter, validation, site URL
public/CV/            downloadable CV
public/images/        unused legacy project art
```

## Deploy

Push to GitHub, import on Vercel, add the environment variables above. Analytics and Speed Insights activate automatically on Vercel.
