import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Muhammad Abdullah - Full Stack Software Engineer",
  description: "Portfolio of Muhammad Abdullah - Full Stack Software Engineer with 3+ years of experience building scalable web and mobile applications using MERN, Next.js, and Flutter. Expert in backend system design, frontend interactivity, and workflow automation.",
  keywords: ["developer", "full-stack", "react", "next.js", "typescript", "flutter", "mern", "n8n", "automation", "portfolio", "muhammad abdullah"],
  authors: [{ name: "Muhammad Abdullah" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Radial Gradient Background */}
          <div className="fixed inset-0 -z-10 bg-white dark:bg-[#09090b] transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/30 via-white to-white dark:from-indigo-900/20 dark:via-zinc-900/20 dark:to-zinc-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent dark:from-purple-900/10 dark:via-transparent dark:to-transparent"></div>
          </div>

          {/* Main Content */}
          <main className="relative">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
