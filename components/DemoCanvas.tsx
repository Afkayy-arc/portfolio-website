"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { demos, personalInfo } from "@/constants/data";
import { on } from "@/lib/bus";
import { hueBgSoft, hueBorder, hueStroke, hueText } from "@/lib/hue";
import type { Hue } from "@/constants/data";
import { demoComponents } from "./demos";
import LiveDemos from "./LiveDemos";

const W = 212;
type Rect = { x: number; y: number; w: number; h: number };
type NodeDef = { id: string; x: number; y: number; icon: string; title: string; body: string; kind: "trigger" | "demo" | "out"; hue?: Hue };

const nodes: NodeDef[] = [
  { id: "trigger", kind: "trigger", x: 40, y: 236, icon: "⚡", hue: "emerald", title: "Visitor lands", body: `${personalInfo.location.split(",")[0]} · ${personalInfo.timezone}` },
  ...demos.map((d, i) => ({ id: d.id, kind: "demo" as const, x: 360, y: 20 + i * 104, icon: ["▦", "◇", "★", "◎", "⇶"][i], title: d.title, body: d.blurb, hue: d.hue })),
  { id: "run", kind: "out", x: 680, y: 150, icon: "▶", hue: "violet", title: "Run inline", body: "Selected demo mounts below the canvas." },
  { id: "contact", kind: "out", x: 680, y: 380, icon: "✉", hue: "rose", title: "Contact", body: personalInfo.email },
];

const wire = (a: Rect, b: Rect) => {
  const x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = b.x, y2 = b.y + b.h / 2;
  const c = (x2 - x1) / 2;
  return `M${x1} ${y1} C ${x1 + c} ${y1}, ${x2 - c} ${y2}, ${x2} ${y2}`;
};

export default function DemoCanvas() {
  const [view, setView] = useState<"canvas" | "list">("canvas");
  const [selected, setSelected] = useState(demos[0].id);
  const [rects, setRects] = useState<Record<string, Rect>>({});
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const layer = useRef<HTMLDivElement>(null);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useLayoutEffect(() => {
    const measure = () => {
      const base = layer.current?.getBoundingClientRect();
      if (!base) return;
      const next: Record<string, Rect> = {};
      for (const [id, el] of Object.entries(refs.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        next[id] = { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
      }
      setRects(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [view]);

  useEffect(
    () =>
      on<string>("open-demo", (id) => {
        if (demos.some((d) => d.id === id)) setSelected(id);
      }),
    []
  );

  const Demo = demoComponents[selected];
  const demo = demos.find((d) => d.id === selected)!;
  const selHue = demo.hue;

  const onDown = (e: React.PointerEvent) => {
    // Nodes and buttons handle their own clicks; pointer capture would otherwise steal them.
    if ((e.target as HTMLElement).closest("[data-node], button")) return;
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const clamp = (v: number) => Math.max(-360, Math.min(360, v));
    setPan({ x: clamp(drag.current.px + e.clientX - drag.current.x), y: clamp(drag.current.py + e.clientY - drag.current.y) });
  };
  const onUp = () => (drag.current = null);

  const r = (id: string) => rects[id];

  return (
    <div>
      {/* Below lg the canvas has no room; the tabbed carousel is the fallback and the only view. */}
      <div className="lg:hidden">
        <LiveDemos />
      </div>

      <div className="hidden lg:block">
        <div className="mb-4 flex justify-end">
          <div role="tablist" aria-label="Demo view" className="inline-flex rounded-[var(--radius-btn)] border border-hairline bg-surface-1 p-0.5">
            {(["canvas", "list"] as const).map((v) => (
              <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)} className={`rounded-[var(--radius-btn)] px-3.5 py-1.5 text-[13px] capitalize transition-colors ${view === v ? "bg-surface-2 text-ink" : "text-ink-subtle hover:text-ink"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {view === "list" ? (
          <LiveDemos />
        ) : (
          <>
            <div
              className="dotgrid relative h-[560px] cursor-grab select-none overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[var(--panel-shadow)] active:cursor-grabbing"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <div ref={layer} className="absolute inset-0 transition-transform duration-75 ease-out" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
                <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                  <g fill="none" strokeWidth={1.5}>
                    {r("trigger") && demos.map((d) => r(d.id) && <path key={`t-${d.id}`} d={wire(r("trigger"), r(d.id))} className={d.id === selected ? `${hueStroke[d.hue]} opacity-70` : "stroke-hairline-strong"} />)}
                    {r("run") && demos.map((d) => r(d.id) && <path key={`r-${d.id}`} d={wire(r(d.id), r("run"))} className={d.id === selected ? `${hueStroke[d.hue]} [stroke-width:2]` : "stroke-hairline"} />)}
                    {r("run") && r("contact") && <path d={wire(r("run"), r("contact"))} className="stroke-hairline" />}
                  </g>
                </svg>

                {nodes.map((n) => {
                  const isDemo = n.kind === "demo";
                  const active = isDemo && n.id === selected;
                  const Tag = isDemo ? "button" : "div";
                  return (
                    <Tag
                      key={n.id}
                      data-node
                      ref={(el: HTMLElement | null) => {
                        refs.current[n.id] = el;
                      }}
                      type={isDemo ? "button" : undefined}
                      onClick={isDemo ? () => setSelected(n.id) : undefined}
                      aria-pressed={isDemo ? active : undefined}
                      style={{ left: n.x, top: n.y, width: W }}
                      className={`absolute text-left rounded-xl border bg-surface-1 text-xs shadow-[var(--panel-shadow)] transition-colors ${
                        n.kind === "trigger" ? "rounded-r-[36px]" : ""
                      } ${active ? hueBorder[selHue] : "border-hairline"} ${isDemo ? "cursor-pointer hover:border-hairline-strong" : ""}`}
                    >
                      <header className={`flex items-center gap-2 px-3 py-2.5 text-[13px] font-medium ${n.kind === "trigger" ? "" : "border-b border-hairline"}`}>
                        <span aria-hidden className={`grid size-[22px] shrink-0 place-items-center rounded-md border border-transparent text-[10px] ${n.hue ? `${hueBgSoft[n.hue]} ${hueText[n.hue]}` : "bg-surface-2 text-ink-subtle"}`}>
                          {n.icon}
                        </span>
                        {n.title}
                      </header>
                      <div className="px-3 pb-2.5 pt-2 leading-snug text-ink-subtle">
                        <p className={isDemo ? "line-clamp-2" : ""}>
                          {n.kind === "trigger" ? (
                            <>
                              {n.body} · <span className="text-success">● available</span>
                            </>
                          ) : (
                            n.body
                          )}
                        </p>
                      </div>
                      {n.kind !== "out" && <span aria-hidden className={`absolute -right-[5px] top-1/2 size-[9px] -translate-y-1/2 rounded-full border-2 bg-canvas ${active ? hueBorder[selHue] : "border-hairline-strong"}`} />}
                      {n.kind !== "trigger" && <span aria-hidden className={`absolute -left-[5px] top-1/2 size-[9px] -translate-y-1/2 rounded-full border-2 bg-canvas ${active ? hueBorder[selHue] : "border-hairline-strong"}`} />}
                    </Tag>
                  );
                })}
              </div>

              <div className="absolute left-4 top-4 flex gap-1.5">
                <button type="button" onClick={() => setPan({ x: 0, y: 0 })} className="btn-secondary h-8 px-3 text-xs">
                  Fit
                </button>
              </div>
              <p className="pointer-events-none absolute bottom-3.5 left-1/2 -translate-x-1/2 rounded-full border border-hairline bg-surface-1 px-2.5 py-1 text-[11.5px] text-ink-subtle">
                Drag to pan · click a node to run it · <span className="font-mono">`</span> opens the terminal
              </p>
            </div>

            <div className="panel mt-4 p-5 md:p-6">
              <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="flex items-center gap-2.5 text-[22px] font-medium leading-tight tracking-[-0.4px]"><span aria-hidden className={`size-2.5 rounded-[3px] ${hueBgSoft[selHue].replace("/10", "")}`} />{demo.title}</h3>
                <p className="font-mono text-[11px] text-ink-tertiary">rebuilt from · {demo.from}</p>
                <p className="w-full text-sm text-ink-subtle">{demo.blurb}</p>
                <div className="flex gap-1.5">
                  {demo.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </header>
              <Demo key={selected} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
