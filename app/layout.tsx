import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { personalInfo } from "@/constants/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const title = `${personalInfo.name} — ${personalInfo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${personalInfo.name}` },
  description: personalInfo.summary,
  keywords: ["full-stack engineer", "next.js", "node.js", "flutter", "n8n", "airflow", "islamabad", personalInfo.name.toLowerCase()],
  authors: [{ name: personalInfo.name }],
  openGraph: { title, description: personalInfo.summary, type: "website", url: siteUrl, siteName: personalInfo.name },
  twitter: { card: "summary_large_image", title, description: personalInfo.summary },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#010102" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: next-themes sets the class on <html> before hydration.
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
