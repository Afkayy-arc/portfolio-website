"use client";

import { useEffect, useRef, useState } from "react";
import { demos } from "@/constants/data";
import { on } from "@/lib/bus";
import { demoComponents } from "./demos";
import { hueBg } from "@/lib/hue";

export default function LiveDemos() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const settling = useRef<ReturnType<typeof setTimeout>>(undefined);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(demos.length - 1, i));
    setActive(idx);
    // Ignore scroll-sync until this programmatic scroll settles, so the tab doesn't flicker mid-flight.
    clearTimeout(settling.current);
    settling.current = setTimeout(() => (settling.current = undefined), 1000);
    // Scroll only the track — scrollIntoView would also nudge the window horizontally.
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  // Cards in the hero and the terminal can open a specific demo.
  useEffect(() => on<string>("open-demo", (id) => { const i = demos.findIndex((d) => d.id === id); if (i >= 0) go(i); }), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the tab in sync when the user swipes the track.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      if (settling.current) return;
      setActive(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 border-b border-hairline">
        <div role="tablist" aria-label="Demos" className="-mb-px flex overflow-x-auto scrollbar-hide" onKeyDown={(e) => (e.key === "ArrowRight" ? go(active + 1) : e.key === "ArrowLeft" ? go(active - 1) : null)}>
          {demos.map((d, i) => (
            <button
              key={d.id}
              role="tab"
              id={`tab-${d.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${d.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => go(i)}
              className={`flex shrink-0 items-center gap-2 border-b px-3 py-3 text-sm transition-colors ${active === i ? "border-ink text-ink" : "border-transparent text-ink-subtle hover:text-ink"}`}
            >
              <span aria-hidden className={`size-1.5 rounded-sm ${hueBg[d.hue]} ${active === i ? "" : "opacity-50"}`} />
              {d.title}
            </button>
          ))}
        </div>
        <div className="mb-2 hidden shrink-0 gap-1 sm:flex">
          <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous demo" className="btn-secondary size-9 justify-center px-0 disabled:opacity-40">
            ←
          </button>
          <button type="button" onClick={() => go(active + 1)} disabled={active === demos.length - 1} aria-label="Next demo" className="btn-secondary size-9 justify-center px-0 disabled:opacity-40">
            →
          </button>
        </div>
      </div>

      {/* relative: makes the track the containing block, so sr-only (absolute) labels inside slides stay clipped instead of widening the page */}
      <div ref={track} className="relative mt-6 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide">
        {demos.map(({ id, title, from, blurb }, i) => {
          const Demo = demoComponents[id];
          return (
          <section key={id} id={`panel-${id}`} role="tabpanel" aria-labelledby={`tab-${id}`} inert={active !== i} className="w-full shrink-0 snap-start">
            <div className="panel p-5 md:p-6">
              <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[22px] font-medium leading-tight tracking-[-0.4px]">{title}</h3>
                <p className="font-mono text-[11px] text-ink-tertiary">rebuilt from · {from}</p>
                <p className="w-full text-sm text-ink-subtle">{blurb}</p>
              </header>
              <Demo />
            </div>
          </section>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-ink-tertiary sm:hidden">Swipe for more</p>
    </div>
  );
}
