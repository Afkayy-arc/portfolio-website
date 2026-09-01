"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = ["extract", "validate", "transform", "reclassify", "load"] as const;
const RULES: [RegExp, string][] = [
  [/uber|careem/i, "Transport"],
  [/netflix|spotify/i, "Subscriptions"],
  [/pso|shell|total/i, "Fuel"],
  [/daraz|amazon/i, "Shopping"],
  [/k-electric|sngpl/i, "Utilities"],
];
const MERCHANTS = ["UBER *TRIP", "NETFLIX.COM", "PSO STATION 41", "DARAZ PK", "K-ELECTRIC", "CAREEM RIDE", "SPOTIFY AB", "SHELL F-7", "AMAZON MKTP", "SNGPL BILL"];

type Txn = { id: number; merchant: string; amount: number; raw: string; category?: string; stage: number; failed?: boolean; retried?: boolean };

const classify = (m: string) => RULES.find(([re]) => re.test(m))?.[1] ?? "Uncategorised";

export default function EtlPipeline() {
  const [running, setRunning] = useState(false);
  const [txns, setTxns] = useState<Txn[]>([]);
  const [stats, setStats] = useState({ loaded: 0, reclassified: 0, retried: 0, quarantined: 0 });
  const next = useRef(1000);

  useEffect(() => {
    if (!running) return;
    const tick = setInterval(() => {
      setTxns((list) => {
        const out: Txn[] = [];
        for (const t of list) {
          if (t.stage === 1 && t.amount < 0 && !t.retried) {
            // validation failure → retry once
            setStats((s) => ({ ...s, retried: s.retried + 1 }));
            out.push({ ...t, amount: Math.abs(t.amount), retried: true });
            continue;
          }
          if (t.stage === 3) {
            const category = classify(t.merchant);
            if (category !== t.raw) setStats((s) => ({ ...s, reclassified: s.reclassified + 1 }));
            out.push({ ...t, category, stage: 4 });
            continue;
          }
          if (t.stage === 4) {
            setStats((s) => ({ ...s, loaded: s.loaded + 1 }));
            continue; // written to Postgres; leaves the board
          }
          out.push({ ...t, stage: t.stage + 1 });
        }
        if (out.length < 10) {
          const merchant = MERCHANTS[next.current % MERCHANTS.length];
          const amount = (next.current % 7 === 0 ? -1 : 1) * (240 + ((next.current * 37) % 4800));
          out.push({ id: next.current++, merchant, amount, raw: next.current % 3 === 0 ? classify(merchant) : "Other", stage: 0 });
        }
        return out;
      });
    }, 550);
    return () => clearInterval(tick);
  }, [running]);

  const reset = () => {
    setRunning(false);
    setTxns([]);
    setStats({ loaded: 0, reclassified: 0, retried: 0, quarantined: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => setRunning((r) => !r)} className="btn-primary">
          {running ? "Pause" : txns.length ? "Resume" : "Start DAG"}
        </button>
        <button type="button" onClick={reset} className="btn-secondary">
          Reset
        </button>
        <dl className="ml-auto flex gap-4 font-mono text-[11px] text-ink-subtle">
          {Object.entries(stats).map(([k, v]) => (
            <div key={k} className="flex gap-1.5">
              <dt>{k}</dt>
              <dd className="tabular-nums text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-5 gap-2 overflow-x-auto">
        {STAGES.map((s, i) => {
          const here = txns.filter((t) => t.stage === i);
          return (
            <div key={s} className="min-w-[7.5rem] rounded-md border border-hairline bg-surface-1 p-2">
              <p className="mb-2 flex items-center justify-between font-mono text-[11px] text-ink-tertiary">
                {s}
                {here.length > 0 && <span className="size-1.5 rounded-full bg-primary" />}
              </p>
              <ul className="min-h-[6rem] space-y-1.5">
                {here.slice(-3).map((t) => (
                  <li key={t.id} className={`rounded-[4px] border px-1.5 py-1 font-mono text-[10px] leading-tight ${t.retried && i === 1 ? "border-hairline-strong text-ink" : "border-hairline text-ink-subtle"}`}>
                    <div className="truncate">{t.merchant}</div>
                    <div className="flex justify-between tabular-nums">
                      <span>{t.amount < 0 ? "−" : ""}Rs {Math.abs(t.amount)}</span>
                      <span className="text-ink-tertiary">{i >= 4 ? t.category : t.raw}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <details className="text-xs text-ink-subtle">
        <summary className="cursor-pointer select-none hover:text-ink">Reclassification rules</summary>
        <ul className="mt-2 grid gap-1 font-mono text-[11px] sm:grid-cols-2">
          {RULES.map(([re, cat]) => (
            <li key={cat}>
              <span className="text-ink-tertiary">{re.source}</span> → {cat}
            </li>
          ))}
        </ul>
      </details>
      <p className="text-xs text-ink-tertiary">Negative amounts fail validation and retry once. Rows marked &ldquo;Other&rdquo; get reclassified by merchant rule before the load step.</p>
    </div>
  );
}
