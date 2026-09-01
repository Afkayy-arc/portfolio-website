"use client";

import { useEffect, useState } from "react";
import { navLinks, personalInfo } from "@/constants/data";
import ThemeToggle from "./ThemeToggle";
import { Close, Menu } from "./icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Track which section is in view so the current nav item reads as current.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm transition-colors hover:text-ink ${active === href ? "text-ink" : "text-ink-subtle"}`;

  return (
    <nav className="sticky top-0 z-40 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-site items-center justify-between px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-medium text-ink">
          <span aria-hidden className="size-2.5 rounded-[3px] bg-primary" />
          {personalInfo.name}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={linkClass(l.href)} aria-current={active === l.href ? "location" : undefined}>
              {l.name}
            </a>
          ))}
          <ThemeToggle className="ml-3" />
          <a href={`mailto:${personalInfo.email}`} className="btn-secondary ml-2 h-9">
            Email
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="-mr-2 flex size-10 items-center justify-center rounded-md text-ink-muted hover:text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <Close width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-canvas px-6 py-3 md:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 text-base text-ink-muted hover:text-ink">
              {l.name}
            </a>
          ))}
          <a href={`mailto:${personalInfo.email}`} className="btn-secondary mt-2 w-full justify-center">
            Email
          </a>
        </div>
      )}
    </nav>
  );
}
