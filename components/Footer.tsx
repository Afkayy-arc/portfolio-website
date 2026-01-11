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
    <footer className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Contact Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-zinc-100 mb-6"
          >
            Let&apos;s Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            I&apos;m always open to new opportunities and interesting projects. Feel free to reach out!
          </motion.p>

          {/* Email Copy Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <Mail size={20} />
              Send Email
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-8 py-4 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg border border-zinc-700 hover:border-indigo-500/50 transition-all duration-300 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={20} className="text-green-500" />
                  Email Copied!
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Copy Email
                </>
              )}
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 rounded-lg border border-zinc-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 rounded-lg border border-zinc-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-zinc-800/50 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-100 rounded-lg border border-zinc-700 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-sm">
            <p>
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Built with
              <span className="text-indigo-400 font-medium">Next.js</span>
              &
              <span className="text-indigo-400 font-medium">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
