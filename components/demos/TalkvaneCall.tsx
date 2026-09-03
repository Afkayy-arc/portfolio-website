"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/constants/data";

type Turn = { who: "ai" | "caller"; text: string; tool?: string; pause?: number };

// Rebuilt from the Talkvane pipeline: Twilio media stream → Deepgram STT → Groq
// LLM with RAG over the tenant's documents → Deepgram TTS, Cal.com as a tool call.
const SCRIPT: Turn[] = [
  { who: "ai", text: "Bright Smile Dental, this is the assistant. How can I help?" },
  { who: "caller", text: "Hi, do you do teeth whitening, and what does it cost?" },
  { who: "ai", text: "We do. In-office whitening is $349 and takes about an hour. Would you like to book one?" },
  { who: "caller", text: "Yes please, sometime next Tuesday morning." },
  { who: "ai", text: "", tool: "rag: services.pdf · cal.com: Tue 09:00–12:00", pause: 900 },
  { who: "ai", text: "I have 10:30 on Tuesday. Shall I book that for you?" },
  { who: "caller", text: "That's perfect." },
  { who: "ai", text: "", tool: "cal.com: booking created · twilio: SMS confirmation", pause: 700 },
];

const STAGES = ["Twilio stream", "Deepgram STT", "Groq + RAG", "Cal.com tool", "Deepgram TTS"];
const BARS = [4, 9, 14, 18, 12, 20, 15, 8, 17, 11, 6, 13, 19, 10, 5];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function TalkvaneCall() {
  const [turns, setTurns] = useState<Array<Turn & { typed: string }>>([]);
  const [status, setStatus] = useState<"Ringing" | "Connected" | "Booked">("Ringing");
  const [speaking, setSpeaking] = useState<"ai" | "caller" | null>(null);
  const [secs, setSecs] = useState(0);
  const thread = useRef<HTMLDivElement>(null);
  const live = projects.find((p) => p.slug === "talkvane")?.liveUrl;

  useEffect(() => {
    // Per-effect flag: Strict Mode mounts twice; a shared ref would let both loops type.
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      while (!cancelled) {
        setTurns([]); setSecs(0); setStatus("Ringing"); setSpeaking(null);
        await wait(1400);
        if (cancelled) return;
        setStatus("Connected");
        timer = setInterval(() => setSecs((s) => s + 1), 1000);
        for (const line of SCRIPT) {
          if (cancelled) return;
          setSpeaking(line.tool ? null : line.who);
          setTurns((t) => [...t, { ...line, typed: line.tool || reduced ? line.text : "" }]);
          if (line.tool) { await wait(line.pause ?? 600); continue; }
          if (!reduced) {
            const chars = [...line.text];
            for (let i = 1; i <= chars.length; i++) {
              if (cancelled) return;
              const typed = chars.slice(0, i).join("");
              setTurns((t) => t.map((x, k) => (k === t.length - 1 ? { ...x, typed } : x)));
              await wait(line.who === "ai" ? 22 : 30);
            }
          } else await wait(900);
          await wait(250);
        }
        clearInterval(timer);
        setSpeaking(null); setStatus("Booked");
        await wait(6000);
      }
    })();
    return () => { cancelled = true; clearInterval(timer); };
  }, []);

  // Fixed-height thread: follow the newest line instead of growing the panel.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const last = turns.length - 1;
  const stage = status === "Ringing" ? 0 : status === "Booked" ? STAGES.length : speaking === "caller" ? 1 : turns[last]?.tool ? 3 : speaking === "ai" ? 4 : 2;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
      <div className="min-w-0 rounded-xl border border-hairline bg-surface-1 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium">Incoming call</p>
            <p className="font-mono text-[11px] text-ink-tertiary">+1 (212) 555-0198 · Bright Smile Dental line</p>
          </div>
          <span className={`tag h-7 px-2.5 font-mono text-[11px] ${status === "Booked" ? "border-hue-emerald bg-hue-emerald/10 text-hue-emerald" : status === "Connected" ? "border-hue-rose bg-hue-rose/10 text-hue-rose" : ""}`}>
            {status}
          </span>
        </div>

        <div aria-hidden className="mt-3 flex h-6 items-center gap-[3px]">
          {BARS.map((h, i) => (
            <i
              key={i}
              className={`block w-[3px] rounded-sm transition-all duration-150 ${speaking === "ai" ? "bg-hue-rose animate-pulse" : speaking === "caller" ? "bg-hue-blue animate-pulse" : "bg-hairline-strong"}`}
              style={{ height: speaking ? h : 3, animationDelay: `${(i % 5) * 90}ms` }}
            />
          ))}
        </div>

        <div ref={thread} className="mt-3 grid h-[220px] content-start gap-2 overflow-y-auto scrollbar-hide" aria-live="polite">
          {turns.map((t, i) => (
            <div key={i} className={`grid max-w-[85%] gap-0.5 ${t.who === "ai" ? "justify-self-end text-right" : ""}`}>
              <span className="text-[10.5px] text-ink-tertiary">{t.who === "ai" ? "Talkvane" : "Caller"}</span>
              {t.tool ? (
                <span className="inline-flex items-center rounded-md border border-dashed border-hairline-strong px-2 py-1 font-mono text-[10.5px] text-ink-subtle">{t.tool}</span>
              ) : (
                <span className={`rounded-xl px-3 py-2 text-left text-[13px] leading-snug ${t.who === "ai" ? "bg-hue-rose/10 text-ink" : "bg-surface-2 text-ink"}`}>
                  {t.typed}
                  {i === last && t.typed !== t.text && <span className="text-hue-rose animate-pulse">▍</span>}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3 text-[11.5px] text-ink-subtle">
          <span style={{ visibility: status === "Booked" ? "visible" : "hidden" }} className="text-hue-emerald">✓ Booked · Tue 10:30 · calendar + SMS</span>
          <span className="font-mono">{String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="space-y-4">
        <ol className="grid gap-1.5">
          {STAGES.map((s, i) => {
            const state = stage > i ? "done" : stage === i ? "active" : "idle";
            return (
              <li key={s} className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${state === "done" ? "border-hue-emerald/50 bg-hue-emerald/10 text-ink" : state === "active" ? "border-hue-rose bg-hue-rose/10 text-ink animate-pulse" : "border-hairline bg-surface-1 text-ink-subtle"}`}>
                <span className={`mr-1.5 font-mono text-[10px] ${state === "done" ? "text-hue-emerald" : state === "active" ? "text-hue-rose" : "text-ink-tertiary"}`}>{state === "done" ? "✓" : i + 1}</span>
                {s}
              </li>
            );
          })}
        </ol>
        <p className="text-xs text-ink-tertiary">Multi-tenant: per-tenant RLS, BYO LLM keys in Vault, Stripe metering, escalation to a human when the caller asks.</p>
        {live && (
          <a href={live} target="_blank" rel="noreferrer" className="btn-secondary w-full justify-center">
            Open the dashboard ↗
          </a>
        )}
      </div>
    </div>
  );
}
