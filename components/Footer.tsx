"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Check, Copy } from "lucide-react";
import { personalInfo } from "@/constants/data";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Social & Email */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800/50 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300 flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check size={18} className="text-green-600 dark:text-green-500" />
                Email Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                {personalInfo.email}
              </>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 mb-8"></div>

        {/* Bottom Section - Copyright & Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-zinc-600 dark:text-zinc-500">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-500">
            Built with
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Next.js</span>
            &
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
