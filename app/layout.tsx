import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muhammad Abdullah - Full Stack Software Engineer",
  description: "Portfolio of Muhammad Abdullah - Full Stack Software Engineer with 3+ years of experience building scalable web and mobile applications using MERN, Next.js, and Flutter. Expert in backend system design, frontend interactivity, and workflow automation.",
  keywords: ["developer", "full-stack", "react", "next.js", "typescript", "flutter", "mern", "n8n", "automation", "portfolio", "muhammad abdullah"],
  authors: [{ name: "Muhammad Abdullah" }],
  openGraph: {
    title: "Muhammad Abdullah - Full Stack Software Engineer",
    description: "Portfolio showcasing scalable web and mobile applications with expertise in MERN, Next.js, Flutter, and workflow automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {/* Radial Gradient Background */}
        <div className="fixed inset-0 -z-10 bg-[#09090b]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-900/20 to-zinc-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        </div>

        {/* Main Content */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
