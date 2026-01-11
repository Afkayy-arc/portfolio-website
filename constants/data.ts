import {
  Code2,
  Database,
  Layers,
  Smartphone,
  Globe,
  GitBranch,
  Terminal,
  Palette,
  Cloud,
  Workflow,
  Zap,
  Server,
  type LucideIcon
} from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const personalInfo = {
  name: "Muhammad Abdullah",
  title: "Full Stack Software Engineer",
  tagline: "Building scalable web and mobile applications with modern technologies",
  email: "m.abdullah.work.1385@gmail.com",
  location: "Islamabad, Pakistan",
  phone: "0329-8232629",
  availability: "Available for freelance & full-time opportunities",
  bio: "Full Stack Software Engineer with 3+ years of experience building scalable web and mobile applications using MERN, Next.js, and Flutter. Proven track record of architecting end-to-end solutions with real-time databases (Firestore, MongoDB), optimizing API performance by 45%, and delivering user-centric platforms handling 500+ concurrent users. Expert in backend system design, frontend interactivity, and workflow automation.",
  social: {
    github: "https://github.com/Afkayyy",
    linkedin: "https://linkedin.com/in/afkayyy",
    twitter: "https://twitter.com/afkayyy",
    portfolio: "https://github.com/Afkayyy"
  }
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Tickly - Seatmap & Event Management Platform",
    description: "Built comprehensive event ticketing platform from scratch with interactive drag-and-drop seat designer. Engineered real-time canvas rendering optimized for large venues (1000+ seats), integrated payment gateway, and admin dashboard with analytics. Implemented RESTful API backend handling concurrent bookings with mutex locking, reducing double-booking incidents to zero.",
    tags: ["React", "PHP", "Fabric.js", "MySQL", "Stripe"],
    image: "/images/project-1.jpg",
    liveUrl: "https://tickly-project.devmechanix.com",
    githubUrl: "https://github.com/Afkayyy",
    featured: true
  },
  {
    id: 2,
    title: "Houdini Tickets - Interactive Ticketing Platform",
    description: "Developed real-time seatmap interface with canvas-based interactivity, supporting high concurrency with API caching and CDN optimization. Integrated Stripe payment processing and responsive UI handling 500+ simultaneous users during peak event sales.",
    tags: ["Canvas API", "React", "Caching", "Stripe", "CDN"],
    image: "/images/project-2.jpg",
    liveUrl: "https://houdinitickets.com",
    githubUrl: "https://github.com/Afkayyy",
    featured: true
  },
  {
    id: 3,
    title: "Dental Clinic Automation System",
    description: "Built end-to-end dental appointment automation using n8n workflows, integrating AI chatbot for client interaction, voice recording, and payment processing. Implemented Text-to-Speech (TTS) appointment reminders, CRM business logs, and automated follow-up sequences, reducing no-shows by 40%. Connected Google Calendar, Stripe payments, and WhatsApp notifications in unified workflow handling 200+ monthly appointments.",
    tags: ["n8n", "AI Chatbot", "TTS", "CRM", "Stripe", "WhatsApp"],
    image: "/images/project-3.jpg",
    liveUrl: "https://devmechanix.com",
    githubUrl: "https://github.com/Afkayyy",
    featured: true
  },
  {
    id: 4,
    title: "CRM Business Interaction System",
    description: "Architected automated CRM logging system capturing client interactions across multiple channels (email, chat, phone) using n8n webhooks. Built custom dashboards aggregating interaction data with real-time sync to PostgreSQL database, enabling sales team productivity tracking.",
    tags: ["n8n", "Webhooks", "PostgreSQL", "Dashboard"],
    image: "/images/project-4.jpg",
    liveUrl: "https://github.com/Afkayyy",
    githubUrl: "https://github.com/Afkayyy",
    featured: false
  },
  {
    id: 5,
    title: "MERN Blog App",
    description: "Developed full-featured blogging platform with JWT authentication, role-based access control (admin/user), and rich text editor integration. Implemented Redis caching layer reducing database queries by 60%, responsive UI, and admin analytics dashboard tracking user engagement.",
    tags: ["MongoDB", "Express", "React", "Node.js", "Redis", "JWT"],
    image: "/images/project-5.jpg",
    liveUrl: "https://github.com/Afkayyy",
    githubUrl: "https://github.com/Afkayyy",
    featured: false
  },
  {
    id: 6,
    title: "Purrfect Assistant - AI Pet Health App",
    description: "Built cross-platform mobile app using Flutter with comprehensive Firebase integration (Authentication, Firestore, Cloud Messaging, Storage). Implemented AI breed detection, health tracking system, GPS-based vet locator, and push notification reminders for vaccinations.",
    tags: ["Flutter", "Firebase", "AI", "GPS", "Cloud Messaging"],
    image: "/images/project-6.jpg",
    liveUrl: "https://github.com/Afkayyy",
    githubUrl: "https://github.com/Afkayyy",
    featured: false
  }
];

export const skills: Skill[] = [
  { name: "React & Next.js", icon: Code2, category: "Frontend" },
  { name: "Flutter & React Native", icon: Smartphone, category: "Mobile" },
  { name: "Node.js & Express", icon: Layers, category: "Backend" },
  { name: "TypeScript & JavaScript", icon: Terminal, category: "Language" },
  { name: "MongoDB & PostgreSQL", icon: Database, category: "Database" },
  { name: "Firebase & Firestore", icon: Cloud, category: "Database" },
  { name: "REST & GraphQL APIs", icon: Globe, category: "API" },
  { name: "n8n Automation", icon: Workflow, category: "Automation" },
  { name: "Apache Airflow", icon: Zap, category: "Automation" },
  { name: "Docker & Linux", icon: Server, category: "DevOps" },
  { name: "AWS & CI/CD", icon: Cloud, category: "DevOps" },
  { name: "Git & GitHub", icon: GitBranch, category: "Tools" },
];

export const experience: Experience[] = [
  {
    id: 1,
    title: "Software Developer (Remote)",
    company: "Twodotzero Innovation Agency - Barcelona, Spain",
    period: "Nov 2025 - Present",
    description: [
      "Architected end-to-end backend admin systems and data interaction layers using Firestore DB, enabling real-time scalability for SME client platforms",
      "Built comprehensive event ticketing platforms with real-time seat management for 1000+ seats",
      "Implemented RESTful API backend with mutex locking for concurrent bookings, reducing double-booking incidents to zero",
      "Developed responsive admin dashboards with analytics and payment gateway integration"
    ],
    technologies: ["Firestore", "React", "PHP", "Fabric.js", "MySQL", "REST APIs"]
  },
  {
    id: 2,
    title: "AI Engineer",
    company: "DevMechanix - Islamabad, Pakistan",
    period: "Feb 2025 - Oct 2025",
    description: [
      "Automated marketing and support workflows using n8n integration, reducing manual operations by 35%",
      "Built RAG-based semantic search systems for enhanced client interaction",
      "Developed end-to-end dental clinic automation with AI chatbot, TTS reminders, and CRM integration, reducing no-shows by 40%",
      "Architected automated CRM logging system capturing client interactions across multiple channels using n8n webhooks"
    ],
    technologies: ["n8n", "AI", "Webhooks", "PostgreSQL", "CRM", "TTS"]
  },
  {
    id: 3,
    title: "Full Stack Engineer Intern",
    company: "IT Solera Pvt Ltd - Remote",
    period: "Jul 2023 - Sep 2023",
    description: [
      "Deployed ML-powered video platform with MERN stack backend integration",
      "Cut API latency by 45% through optimized GPU utilization",
      "Developed real-time features with WebSocket integration",
      "Implemented responsive UI with React and Redux state management"
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "ML", "WebSocket"]
  },
  {
    id: 4,
    title: "Backend Database Developer Intern",
    company: "ROBX.AI - Remote",
    period: "Apr 2022 - Sep 2022",
    description: [
      "Optimized SQL queries and REST APIs for analytics platform",
      "Achieved 35% faster data access for 500+ active users",
      "Built efficient database schemas and indexing strategies",
      "Implemented API endpoints with proper error handling and validation"
    ],
    technologies: ["SQL", "REST APIs", "Database Optimization", "Node.js"]
  }
];

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" }
];
