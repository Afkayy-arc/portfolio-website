// Single source of truth for everything rendered on the public site.

// Semantic hues defined in app/globals.css (--hue-*) and tailwind (hue.*). One per project/demo for identity.
export type Hue = "blue" | "violet" | "emerald" | "amber" | "rose" | "cyan";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  image?: string; // public/projects/<slug>.png
  hue: Hue;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tech: string[];
}

export const personalInfo = {
  name: "Muhammad Abdullah",
  title: "Full-stack software engineer",
  summary:
    "Full-stack software engineer with three years across MERN, Next.js, Flutter and n8n. Ticketing platforms, workflow automation, and the APIs underneath them.",
  email: "m.abdullah.work.1385@gmail.com",
  location: "Islamabad, Pakistan",
  timezone: "UTC+5",
  availability: "Available for freelance and full-time work",
  cvPath: "/CV/Full_Stack_CV.pdf",
  bioShort:
    "Three years across MERN, Next.js, Flutter and n8n. Currently at Twodotzero in Barcelona, remote from Islamabad; previously AI engineering at DevMechanix.",
  bioLong:
    "Three years across MERN, Next.js, Flutter and n8n. Currently a Software Developer at Twodotzero Innovation Agency in Barcelona, working remotely from Islamabad, where I own backend admin systems and Firestore data layers for SME clients and built event ticketing with live seat management for venues of 1,000+ seats. Before that I was an AI Engineer at DevMechanix: n8n automations that cut manual operations by 35%, a dental-clinic workflow that reduced no-shows by 40%, and RAG search over client knowledge bases. I'm happiest owning a system end to end — the seat-map that has to survive a 500-buyer on-sale, the workflow that has to send the right reminder at 18:00, the pipeline that can't lose a row.",
  github: { owner: "Afkayy-arc", repo: "portfolio-website" },
  coords: { lat: 33.6844, lon: 73.0479 }, // Islamabad, for the live weather line
  social: {
    github: "https://github.com/Afkayy-arc",
    linkedin: "https://linkedin.com/in/afkayyy",
    upwork: "https://www.upwork.com/freelancers/afkayy",
  },
};

export const metrics = [
  { value: "3+", label: "years shipping full-stack" },
  { value: "1,000+", label: "seats rendered live per venue" },
  { value: "500+", label: "concurrent buyers at peak sale" },
  { value: "45%", label: "API latency cut on a video platform" },
];

export const projects: Project[] = [
  {
    slug: "talkvane",
    hue: "rose",
    title: "Talkvane",
    summary:
      "Multi-tenant AI receptionist for small businesses. Answers the phone from the owner's own documents, books on Cal.com mid-call, texts a confirmation, and hands off to a human when asked. Twilio media streams into Pipecat with Deepgram and Groq, per-tenant row-level security, BYO LLM keys in Vault, Stripe metering with prepaid overage, and fraud gates on the outbound leg.",
    tags: ["Next.js", "Python", "Pipecat", "Twilio", "Supabase", "Stripe"],
    liveUrl: "https://talkvane.vercel.app",
    featured: true,
  },
  {
    slug: "tickly",
    hue: "blue",
    image: "/projects/tickly.png",
    title: "Tickly",
    summary:
      "Event ticketing with a drag-and-drop seat designer. Canvas rendering stays smooth past 1,000 seats, and bookings go through a REST API with mutex locking, so double-bookings dropped to zero.",
    tags: ["React", "PHP", "Fabric.js", "MySQL", "Stripe"],
    liveUrl: "https://tickly-project.devmechanix.com",
    featured: true,
  },
  {
    slug: "houdini",
    hue: "violet",
    image: "/projects/houdini.png",
    title: "Houdini Tickets",
    summary:
      "Real-time seat-map storefront with Stripe checkout. API caching and a CDN kept it responsive through 500+ simultaneous buyers during peak on-sales.",
    tags: ["Canvas API", "React", "Stripe", "CDN caching"],
    liveUrl: "https://houdinitickets.com",
    featured: true,
  },
  {
    slug: "tapreview",
    hue: "amber",
    image: "/projects/tapreview.png",
    title: "TapReview",
    summary:
      "QR-to-Google-review flow for restaurants and clinics. Scan, rate on a half-star slider, pick a generated review in English or Urdu, copy, and land on Google's write-review page. Static site, embeddable widget, Sheets-backed analytics.",
    tags: ["Vanilla JS", "Google Apps Script", "Embeddable widget"],
    liveUrl: "https://afkayy-arc.github.io/tapreview/",
    repoUrl: "https://github.com/Afkayy-arc/tapreview",
    featured: true,
  },
  {
    slug: "clinic",
    hue: "emerald",
    image: "/projects/clinic.png",
    title: "Dental clinic automation",
    summary:
      "n8n workflows that book, remind and follow up: LLM chat intake, text-to-speech phone reminders, Stripe payments, WhatsApp notifications and Google Calendar sync. 200+ appointments a month, 40% fewer no-shows.",
    tags: ["n8n", "LLM", "TTS", "Stripe", "WhatsApp API"],
  },
  {
    slug: "crm",
    hue: "cyan",
    image: "/projects/crm.png",
    title: "CRM interaction logger",
    summary:
      "n8n webhooks capture email, chat and call events into PostgreSQL; dashboards give the sales team a per-rep activity view synced in real time.",
    tags: ["n8n", "Webhooks", "PostgreSQL"],
  },
  {
    slug: "mern-blog",
    hue: "rose",
    image: "/projects/mern-blog.png",
    title: "MERN blog platform",
    summary:
      "Blogging platform with JWT auth, admin and user roles, a rich-text editor, and a Redis cache layer that cut database reads by 60%.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis"],
    repoUrl: "https://github.com/Afkayy-arc/Mern-Blog-",
  },
  {
    slug: "purrfect",
    hue: "violet",
    image: "/projects/purrfect.png",
    title: "Purrfect Assistant",
    summary:
      "Flutter app for pet owners: Firebase auth and Firestore, on-device breed detection, a health log, GPS vet finder and vaccination push reminders.",
    tags: ["Flutter", "Firebase", "ML", "Maps"],
  },
  {
    slug: "rag",
    hue: "blue",
    image: "/projects/rag.png",
    title: "RAG semantic search",
    summary:
      "Retrieval-augmented search over client document sets. Vector embeddings with similarity search, natural-language queries and context-aware answers.",
    tags: ["Python", "LangChain", "Vector DB"],
  },
  {
    slug: "etl",
    hue: "cyan",
    image: "/projects/etl.png",
    title: "Transaction reclassification ETL",
    summary:
      "Airflow pipeline that validates, transforms and reclassifies 100K+ daily transactions into PostgreSQL, with retries and monitoring on every stage.",
    tags: ["Apache Airflow", "Python", "PostgreSQL"],
  },
];

export const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Firebase"] },
  { group: "Backend", items: ["Node.js", "Express", "PHP", "REST", "GraphQL", "WebSockets"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Firestore", "Redis"] },
  { group: "Automation & AI", items: ["n8n", "Apache Airflow", "LangChain", "RAG", "OpenAI API"] },
  { group: "Infra", items: ["AWS", "Docker", "Linux", "CI/CD", "Vercel", "Git"] },
];

export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Twodotzero Innovation Agency",
    location: "Barcelona · remote",
    period: "Nov 2025 — present",
    bullets: [
      "Own backend admin systems and data layers on Firestore for SME client platforms.",
      "Built event ticketing with live seat management for venues of 1,000+ seats.",
      "REST backend with mutex locking on concurrent bookings; double-bookings went to zero.",
      "Admin dashboards with analytics and payment-gateway integration.",
    ],
    tech: ["Firestore", "React", "PHP", "Fabric.js", "MySQL"],
  },
  {
    role: "AI Engineer",
    company: "DevMechanix",
    location: "Islamabad",
    period: "Feb 2025 — Oct 2025",
    bullets: [
      "Automated marketing and support workflows in n8n, cutting manual operations by 35%.",
      "RAG-based semantic search for client knowledge bases.",
      "End-to-end dental clinic automation: LLM chatbot, TTS reminders, CRM; no-shows down 40%.",
      "Multi-channel CRM logging via n8n webhooks into PostgreSQL.",
    ],
    tech: ["n8n", "LLM", "Webhooks", "PostgreSQL", "TTS"],
  },
  {
    role: "Full-stack Engineer Intern",
    company: "IT Solera",
    location: "Remote",
    period: "Jul 2023 — Sep 2023",
    bullets: [
      "Deployed an ML-powered video platform on a MERN backend.",
      "Cut API latency 45% by fixing GPU utilisation.",
      "Real-time features over WebSockets; React and Redux on the front end.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "WebSockets"],
  },
  {
    role: "Backend Database Developer Intern",
    company: "ROBX.AI",
    location: "Remote",
    period: "Apr 2022 — Sep 2022",
    bullets: [
      "Optimised SQL queries and REST endpoints for an analytics platform.",
      "35% faster data access for 500+ active users through schema and index work.",
    ],
    tech: ["SQL", "REST", "Node.js"],
  },
];

export const navLinks = [
  { name: "Demos", href: "#demos" },
  { name: "Projects", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Interactive demos. Components live in components/demos/index.ts, keyed by id.
export interface Demo {
  id: string;
  title: string;
  from: string;
  blurb: string;
  tags: string[];
  projectSlugs: string[];
  hue: Hue;
}

export const demos: Demo[] = [
  { id: "talkvane", hue: "rose", title: "AI call assistant", from: "Talkvane", blurb: "An inbound call answered from the knowledge base, booked on the calendar, confirmed by text.", tags: ["Pipecat", "Twilio", "RAG"], projectSlugs: ["talkvane"] },
  { id: "seatmap", hue: "blue", title: "Seat-map booking", from: "Tickly · Houdini Tickets", blurb: "Concurrent buyers, per-seat mutex locks, zero double-bookings.", tags: ["React", "canvas"], projectSlugs: ["tickly", "houdini"] },
  { id: "clinic", hue: "emerald", title: "Clinic automation", from: "DevMechanix", blurb: "An n8n flow from WhatsApp message to confirmed, reminded appointment.", tags: ["n8n", "LLM"], projectSlugs: ["clinic"] },
  { id: "tapreview", hue: "amber", title: "Review flow", from: "TapReview", blurb: "Half-star rating to a copied, editable Google review in three taps.", tags: ["JS"], projectSlugs: ["tapreview"] },
  { id: "rag", hue: "violet", title: "RAG search", from: "DevMechanix", blurb: "Retrieve, rank, and answer from a small knowledge base.", tags: ["Python", "LangChain"], projectSlugs: ["rag"] },
  { id: "etl", hue: "cyan", title: "ETL pipeline", from: "Airflow", blurb: "Transactions moving through validate → transform → reclassify → load, with retries.", tags: ["Airflow"], projectSlugs: ["etl"] },
];

// Cards the assistant can attach to an answer. Ids are stable; the chat route lists them to the model.
export const cardIds = [
  ...demos.map((d) => `demo:${d.id}`),
  ...projects.map((p) => `project:${p.slug}`),
  "contact",
  "cv",
  "stack",
  "availability",
] as const;
