"use client";

import { useEffect, useRef, useState } from "react";
import { demos, personalInfo, projects } from "@/constants/data";
import { emit, on, scrollToId } from "@/lib/bus";
import LiveStatus, { useLocalClock } from "./LiveStatus";
import TechStack from "./TechStack";
import { Download } from "./icons";

type Msg = { role: "user" | "assistant"; content: string; cards?: string[] };

const CARD_RE = /\n?\s*\[\[cards:\s*([^\]]*)\]\]\s*$/i;

// Strip the trailing card tag (also mid-stream, where it may be half-arrived).
const visible = (t: string) => t.replace(CARD_RE, "").replace(/\n?\s*\[\[c[^\]]*$/i, "").replace(/\*\*/g, "").replace(/^\s*[*-]\s+/gm, "• ").trim();

const parseCards = (t: string, question: string): string[] => {
  const m = t.match(CARD_RE);
  if (m) return m[1].split(",").map((s) => s.trim()).filter(Boolean).slice(0, 3);
  // Fallback: keyword match against what the visitor asked.
  const q = `${question} ${t}`.toLowerCase();
  const hits: string[] = [];
  for (const d of demos) if (d.title.toLowerCase().split(" ").some((w) => w.length > 3 && q.includes(w))) hits.push(`demo:${d.id}`);
  for (const p of projects) if (q.includes(p.title.toLowerCase().split(" ")[0])) hits.push(`project:${p.slug}`);
  if (/(contact|email|reach out|get in touch)/.test(q)) hits.push("contact");
  if (/\b(cv|resume)\b/.test(q)) hits.push("cv");
  if (/(stack|tools|technolog|framework|languages)/.test(q)) hits.push("stack");
  if (/(availab|freelance|full-time|hire|open to work)/.test(q)) hits.push("availability");
  return [...new Set(hits)].slice(0, 3);
};

function Card({ id }: { id: string }) {
  const base = "flex flex-col gap-0.5 rounded-lg border border-hairline bg-canvas px-3 py-2.5 text-left text-[13px] transition-colors hover:border-hairline-strong";
  if (id.startsWith("demo:")) {
    const d = demos.find((x) => x.id === id.slice(5));
    if (!d) return null;
    return (
      <button type="button" onClick={() => { emit("open-demo", d.id); scrollToId("demos"); }} className={base}>
        <b className="font-medium">▶ {d.title}</b>
        <span className="text-ink-subtle">Live demo · {d.blurb}</span>
      </button>
    );
  }
  if (id.startsWith("project:")) {
    const p = projects.find((x) => x.slug === id.slice(8));
    if (!p) return null;
    return (
      <button type="button" onClick={() => { emit("open-project", p.slug); scrollToId("work"); }} className={base}>
        <b className="font-medium">{p.title}</b>
        <span className="text-ink-subtle">{p.tags.slice(0, 3).join(" · ")}</span>
      </button>
    );
  }
  if (id === "cv")
    return (
      <a href={personalInfo.cvPath} download="Muhammad_Abdullah_CV.pdf" className={base}>
        <b className="font-medium">Download CV</b>
        <span className="text-ink-subtle">PDF · 90 KB</span>
      </a>
    );
  if (id === "contact")
    return (
      <button type="button" onClick={() => scrollToId("contact")} className={base}>
        <b className="font-medium">Get in touch</b>
        <span className="text-ink-subtle">{personalInfo.email}</span>
      </button>
    );
  // "stack" is rendered full-width by the caller (see wide cards below); nothing to do here.
  if (id === "stack") return null;
  if (id === "availability")
    return (
      <div className={base}>
        <b className="font-medium">Availability</b>
        <span className="text-ink-subtle">{personalInfo.availability}</span>
      </div>
    );
  return null;
}

// Chips either ask the assistant, jump to a section, or answer locally (no API call, never rate-limited).
const chips: { label: string; ask?: string; go?: string; local?: Msg }[] = [
  { label: "Projects", ask: "What has he shipped, and which are featured?" },
  { label: "Live demos", go: "demos" },
  { label: "Stack", local: { role: "assistant", content: "Front to back, grouped by where each tool sits in the system. Comfortable owning any layer end to end.", cards: ["stack"] } },
  { label: "Availability", ask: "Is he available for freelance or full-time work?" },
  { label: "Contact", go: "contact" },
];

export default function AskHero() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const time = useLocalClock();

  useEffect(() => on("focus-ask", () => inputRef.current?.focus()), []);

  const ask = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    setError("");
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-12).map(({ role, content }) => ({ role, content })) }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(res.status === 429 ? body.error || "Message limit reached for now — email works too." : body.error || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let raw = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        raw += dec.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: visible(raw) }]);
      }
      if (!raw.trim()) throw new Error("No reply received. Try again.");
      setMessages([...history, { role: "assistant", content: visible(raw), cards: parseCards(raw, content) }]);
    } catch (e) {
      setMessages(history);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-20 text-center">
      <div aria-hidden className="pointer-events-none absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[min(22vw,300px)] font-semibold leading-none tracking-[-0.05em] text-[color:var(--watermark)]">
        {personalInfo.name.split(" ").at(-1)}
      </div>

      <span className="badge h-7 gap-2 pl-1 pr-3 text-[12.5px]">
        <span aria-hidden className="grid size-5 place-items-center rounded-full bg-ink text-[10px] text-canvas">◐</span>
        Located in {personalInfo.location.split(",")[0]} · {personalInfo.timezone}
        {time && <span className="tabular-nums">· {time}</span>}
      </span>

      <div aria-hidden className="mt-7 grid size-14 place-items-center rounded-2xl bg-primary text-lg font-semibold tracking-tight text-white shadow-[var(--panel-shadow)]">
        MA
      </div>
      <p className="mt-4 text-[15px] text-ink-subtle">Hey, I&rsquo;m {personalInfo.name.split(" ")[0]}</p>
      <h1 className="mt-1.5 text-[40px] font-semibold leading-[1.02] tracking-[-1.6px] md:text-[64px] md:tracking-[-2.4px]">Full-stack &amp; automation engineer</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="mt-7 flex w-full max-w-[720px] items-center gap-2 rounded-full border border-hairline bg-surface-1 p-2 pl-5 shadow-[var(--panel-shadow)] transition-colors focus-within:border-hairline-strong"
      >
        <label htmlFor="ask" className="sr-only">
          Ask about my work
        </label>
        <input
          ref={inputRef}
          id="ask"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          autoComplete="off"
          placeholder="Ask about my work — e.g. “how does the seat-map locking work?”"
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-tertiary"
        />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Ask" className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-40">
          →
        </button>
      </form>

      <div className="mt-3.5 flex flex-wrap justify-center gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            className="chip"
            onClick={() => {
              if (c.go) return scrollToId(c.go);
              if (c.local) return setMessages((m) => [...m, { role: "user", content: c.label }, c.local!]);
              ask(c.ask!);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {messages.length > 0 && (
        <div className="mt-5 w-full max-w-[720px] space-y-3 text-left" aria-live="polite">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <p key={i} className="ml-auto w-fit max-w-[85%] rounded-2xl bg-primary px-3.5 py-2 text-sm text-white">
                {m.content}
              </p>
            ) : (
              <div key={i} className="panel p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-muted">{m.content || <span className="text-ink-subtle">Thinking…</span>}</p>
                {m.cards?.includes("stack") && (
                  <div className="mt-4">
                    <TechStack />
                  </div>
                )}
                {m.cards && m.cards.some((c) => c !== "stack") && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {m.cards
                      .filter((c) => c !== "stack")
                      .map((id) => (
                        <Card key={id} id={id} />
                      ))}
                  </div>
                )}
              </div>
            )
          )}
          {error && <p className="text-xs text-ink-subtle">{error}</p>}
        </div>
      )}

      <div className="mt-10">
        <LiveStatus />
      </div>
      <a href={personalInfo.cvPath} download="Muhammad_Abdullah_CV.pdf" className="link mt-4 text-xs">
        <Download width={14} height={14} /> Download CV
      </a>
    </section>
  );
}
