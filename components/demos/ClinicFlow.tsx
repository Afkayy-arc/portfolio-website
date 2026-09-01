"use client";

import { useEffect, useRef, useState } from "react";

const NODES = ["WhatsApp intake", "LLM triage", "Calendar slot", "Stripe deposit", "Confirm + reminder"];
const REASONS = ["Cleaning", "Whitening", "Toothache"] as const;
const SLOTS = ["Tue 10:30", "Wed 15:00", "Fri 09:15"] as const;

export default function ClinicFlow() {
  const [reason, setReason] = useState<(typeof REASONS)[number]>("Cleaning");
  const [slot, setSlot] = useState<(typeof SLOTS)[number]>("Tue 10:30");
  const [step, setStep] = useState(-1); // index of the node currently running; NODES.length = done
  const [log, setLog] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const running = step >= 0 && step < NODES.length;
  const urgent = reason === "Toothache";

  const lines = (i: number): string[] => {
    switch (i) {
      case 0:
        return [`← "hi, I need a ${reason.toLowerCase()} appointment" (+92 3•• ••• 4471)`];
      case 1:
        return [`triage: ${reason} → ${urgent ? "urgent, 30 min, dentist required" : "routine, 45 min, hygienist ok"}`];
      case 2:
        return [`gcal: ${slot} free ✓  hold placed (10 min TTL)`];
      case 3:
        return [`stripe: deposit link sent · pi_3Nq…c2L · £20 ${urgent ? "waived (urgent)" : "paid"}`];
      case 4:
        return [`→ "Confirmed: ${reason} ${slot}. Reply R to reschedule."`, `scheduled: TTS call day-before 18:00 · CRM log #4471`];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!running) return;
    timer.current = setTimeout(() => {
      setLog((l) => [...l, ...lines(step)]);
      setStep(step + 1);
    }, 650);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const run = () => {
    setLog([]);
    setStep(0);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-4">
        <fieldset>
          <legend className="mb-2 text-xs text-ink-subtle">Patient asks for</legend>
          <div className="flex flex-wrap gap-1.5">
            {REASONS.map((r) => (
              <button key={r} type="button" onClick={() => setReason(r)} aria-pressed={reason === r} disabled={running} className={`tag h-8 cursor-pointer px-3 font-sans transition-colors ${reason === r ? (r === "Toothache" ? "border-hue-rose bg-hue-rose/10 text-ink" : "border-hue-emerald bg-hue-emerald/10 text-ink") : "hover:border-hairline-strong"}`}>
                {r}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-xs text-ink-subtle">Slot</legend>
          <div className="flex flex-wrap gap-1.5">
            {SLOTS.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)} aria-pressed={slot === s} disabled={running} className={`tag h-8 cursor-pointer px-3 transition-colors ${slot === s ? "border-hue-blue bg-hue-blue/10 text-ink" : "hover:border-hairline-strong"}`}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={run} disabled={running} className="btn-primary w-full justify-center disabled:opacity-50">
          {running ? "Running…" : step === NODES.length ? "Run again" : "Run workflow"}
        </button>
        <p className="text-xs text-ink-tertiary">Each node is an n8n step. Toothache routes as urgent and skips the deposit.</p>
      </div>

      <div className="min-w-0">
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-5 sm:gap-0">
          {NODES.map((n, i) => {
            const state = step > i ? "done" : step === i ? "active" : "idle";
            return (
              <li key={n} className="flex items-center sm:flex-col sm:items-stretch">
                <div
                  className={`flex-1 rounded-md border px-2.5 py-2 text-xs transition-colors ${
                    state === "done"
                      ? "border-hue-emerald/50 bg-hue-emerald/10 text-ink"
                      : state === "active"
                        ? `${urgent ? "border-hue-rose bg-hue-rose/10" : "border-hue-blue bg-hue-blue/10"} text-ink animate-pulse`
                        : "border-hairline bg-surface-1 text-ink-subtle"
                  }`}
                >
                  <span className={`mr-1.5 font-mono text-[10px] ${state === "done" ? "text-hue-emerald" : state === "active" ? (urgent ? "text-hue-rose" : "text-hue-blue") : "text-ink-tertiary"}`}>{state === "done" ? "✓" : i + 1}</span>
                  {n}
                </div>
                {i < NODES.length - 1 && <span aria-hidden className={`hidden h-px w-3 shrink-0 sm:block ${step > i ? "bg-hue-emerald/60" : "bg-hairline"}`} style={{ marginTop: 18 }} />}
              </li>
            );
          })}
        </ol>
        <pre className="mt-4 min-h-[9rem] overflow-auto whitespace-pre-wrap rounded-md border border-hairline bg-surface-1 p-3 font-mono text-[11px] leading-relaxed text-ink-subtle" aria-live="polite">
          {log.length ? log.join("\n") : "Execution log will appear here."}
        </pre>
      </div>
    </div>
  );
}
