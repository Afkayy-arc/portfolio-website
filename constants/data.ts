// Single source of truth for everything rendered on the public site.

export interface Project {
  title: string;
  summary: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
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
  social: {
    github: "https://github.com/Afkayy-arc",
    linkedin: "https://linkedin.com/in/afkayyy",
    upwork: "https://www.upwork.com/freelancers/~01fbe990a14ce10108",
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
    title: "Tickly",
    summary:
      "Event ticketing with a drag-and-drop seat designer. Canvas rendering stays smooth past 1,000 seats, and bookings go through a REST API with mutex locking, so double-bookings dropped to zero.",
    tags: ["React", "PHP", "Fabric.js", "MySQL", "Stripe"],
    liveUrl: "https://tickly-project.devmechanix.com",
    featured: true,
  },
  {
    title: "Houdini Tickets",
    summary:
      "Real-time seat-map storefront with Stripe checkout. API caching and a CDN kept it responsive through 500+ simultaneous buyers during peak on-sales.",
    tags: ["Canvas API", "React", "Stripe", "CDN caching"],
    liveUrl: "https://houdinitickets.com",
    featured: true,
  },
  {
    title: "TapReview",
    summary:
      "QR-to-Google-review flow for restaurants and clinics. Scan, rate on a half-star slider, pick a generated review in English or Urdu, copy, and land on Google's write-review page. Static site, embeddable widget, Sheets-backed analytics.",
    tags: ["Vanilla JS", "Google Apps Script", "Embeddable widget"],
    liveUrl: "https://afkayy-arc.github.io/tapreview/",
    repoUrl: "https://github.com/Afkayy-arc/tapreview",
    featured: true,
  },
  {
    title: "Dental clinic automation",
    summary:
      "n8n workflows that book, remind and follow up: LLM chat intake, text-to-speech phone reminders, Stripe payments, WhatsApp notifications and Google Calendar sync. 200+ appointments a month, 40% fewer no-shows.",
    tags: ["n8n", "LLM", "TTS", "Stripe", "WhatsApp API"],
  },
  {
    title: "CRM interaction logger",
    summary:
      "n8n webhooks capture email, chat and call events into PostgreSQL; dashboards give the sales team a per-rep activity view synced in real time.",
    tags: ["n8n", "Webhooks", "PostgreSQL"],
  },
  {
    title: "MERN blog platform",
    summary:
      "Blogging platform with JWT auth, admin and user roles, a rich-text editor, and a Redis cache layer that cut database reads by 60%.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis"],
    repoUrl: "https://github.com/Afkayy-arc/Mern-Blog-",
  },
  {
    title: "Purrfect Assistant",
    summary:
      "Flutter app for pet owners: Firebase auth and Firestore, on-device breed detection, a health log, GPS vet finder and vaccination push reminders.",
    tags: ["Flutter", "Firebase", "ML", "Maps"],
  },
  {
    title: "RAG semantic search",
    summary:
      "Retrieval-augmented search over client document sets. Vector embeddings with similarity search, natural-language queries and context-aware answers.",
    tags: ["Python", "LangChain", "Vector DB"],
  },
  {
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
