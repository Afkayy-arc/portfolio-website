"use client";

import { useState } from "react";
import { personalInfo } from "@/constants/data";
import { Check, Copy } from "./icons";

export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={`link font-mono font-normal ${className}`} aria-live="polite">
      {personalInfo.email}
      {copied ? <Check className="text-success" /> : <Copy />}
      <span className="sr-only">{copied ? "Copied" : "Copy email address"}</span>
    </button>
  );
}
