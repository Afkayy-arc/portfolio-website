"use client";

import { useEffect, useState } from "react";
import { projects } from "@/constants/data";
import { on } from "@/lib/bus";
import ProjectList from "./ProjectList";
import { ArrowUpRight } from "./icons";

// Film-strip gallery: hover/focus widens a strip to reveal the project. Below md the list rows take over.
export default function ProjectStrips() {
  const [active, setActive] = useState(projects[0].slug);
  useEffect(() => on<string>("open-project", (slug) => projects.some((p) => p.slug === slug) && setActive(slug)), []);

  return (
    <>
      <div className="md:hidden">
        <ProjectList />
      </div>
      <div className="hidden h-[420px] gap-2.5 md:flex" role="list">
        {projects.map((p, i) => {
          const open = p.slug === active;
          return (
            <div
              key={p.slug}
              role="listitem"
              onMouseEnter={() => setActive(p.slug)}
              onFocus={() => setActive(p.slug)}
              className={`dotgrid relative min-w-0 overflow-hidden rounded-lg border bg-gradient-to-b from-surface-2 to-surface-1 transition-[flex] duration-300 ${open ? "flex-[4.5] border-hairline-strong" : "flex-1 border-hairline"}`}
            >
              <span className="absolute left-3 top-2.5 font-mono text-[11px] text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
              {p.featured && !open && <span aria-hidden className="absolute right-3 top-3 size-1.5 rounded-full bg-accent" />}

              {open ? (
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-medium tracking-[-0.3px]">{p.title}</h3>
                    {p.featured && <span className="badge">Featured</span>}
                  </div>
                  <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-subtle">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                    <span className="mx-1 hidden h-4 w-px bg-hairline sm:block" />
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
                        Live <ArrowUpRight />
                      </a>
                    ) : (
                      <span className="text-xs text-ink-tertiary">client project · private</span>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link">
                        Source <ArrowUpRight />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(p.slug)}
                  className="absolute inset-0 flex items-end justify-center pb-4 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-xs text-ink-subtle transition-colors hover:text-ink"
                  aria-label={`Open ${p.title}`}
                >
                  {p.title}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
