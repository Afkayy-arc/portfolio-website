"use client";

import { useEffect, useState } from "react";
import { personalInfo } from "@/constants/data";
import { emit, scrollToId } from "@/lib/bus";
import ThemeToggle from "./ThemeToggle";

const items = [
  { id: "top", label: "Ask", d: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-3.5-3.5" },
  { id: "demos", label: "Demos", d: "M3 5h6v5H3zM15 5h6v5h-6zM9 14h6v5H9zM9 7.5h6M6 10v2a2 2 0 0 0 2 2h1M18 10v2a2 2 0 0 1-2 2h-1" },
  { id: "work", label: "Work", d: "M4 4h3v16H4zM10.5 4h3v16h-3zM17 4h3v16h-3z" },
  { id: "about", label: "About", d: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21c0-4 4-6 8-6s8 2 8 6" },
];

const Icon = ({ d }: { d: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export default function Rail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const btn = (isActive: boolean) =>
    `group relative flex size-10 items-center justify-center rounded-[10px] border transition-colors ${
      isActive ? "border-accent/40 bg-accent/10 text-accent" : "border-transparent text-ink-subtle hover:border-hairline hover:bg-surface-1 hover:text-ink"
    }`;

  const tip = (label: string) => (
    <span className="pointer-events-none absolute left-[52px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md border border-hairline bg-surface-2 px-2 py-0.5 text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 md:block">
      {label}
    </span>
  );

  return (
    <nav
      aria-label="Site"
      className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-hairline bg-canvas/90 backdrop-blur-md md:inset-y-0 md:left-0 md:right-auto md:h-auto md:w-[60px] md:flex-col md:justify-start md:gap-1.5 md:border-r md:border-t-0 md:py-4"
    >
      <a href="#top" aria-label={personalInfo.name} className="hidden md:mb-3 md:block">
        <span className="block size-3.5 rounded-[4px] bg-primary" />
      </a>
      {items.map((i) => (
        <button
          key={i.id}
          type="button"
          onClick={() => {
            scrollToId(i.id);
            if (i.id === "top") emit("focus-ask");
          }}
          aria-label={i.label}
          aria-current={active === i.id ? "location" : undefined}
          className={btn(active === i.id)}
        >
          <Icon d={i.d} />
          {tip(i.label)}
        </button>
      ))}
      <button type="button" onClick={() => emit("toggle-terminal")} aria-label="Terminal" className={btn(false)}>
        <Icon d="m5 7 5 5-5 5M12 17h7" />
        {tip("Terminal · press `")}
      </button>
      <div className="hidden md:block md:flex-1" />
      <ThemeToggle className="border-transparent bg-transparent" />
      <span className="hidden md:my-2 md:block md:size-2 md:rounded-full md:bg-hue-emerald md:shadow-[0_0_0_3px_rgb(var(--hue-emerald)/0.2)]" title={personalInfo.availability} />
    </nav>
  );
}
