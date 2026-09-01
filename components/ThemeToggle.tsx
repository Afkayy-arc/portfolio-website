"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Follows the system by default; this button overrides it. Renders a fixed-size placeholder
// until mounted so server and client markup match.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";
  const label = mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Toggle theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`flex size-9 items-center justify-center rounded-[var(--radius-btn)] border border-hairline bg-surface-1 text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth={1.75}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
