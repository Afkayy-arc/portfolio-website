"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "../icons";

const BUSINESS = "Karachi Grill House";

const POOLS = {
  high: {
    open: ["Loved it.", "Really impressed.", "One of the better spots in the area.", "Went in with high hopes and it delivered."],
    detail: ["The seekh kebabs were charred just right and the naan came out hot.", "Service was quick even on a packed Friday night.", "Portions are generous and the raita is made fresh.", "Staff remembered our order from last time, which says a lot."],
    close: ["Already planning the next visit.", "Easy recommend.", "Worth the drive.", "Booking again for the family."],
  },
  mid: {
    open: ["Decent overall.", "Mixed feelings.", "Solid, with a couple of misses."],
    detail: ["Food was good but the wait stretched past 30 minutes.", "The karahi was excellent; the drinks menu is thin.", "Clean, friendly, slightly pricier than nearby options."],
    close: ["Would go back on a quieter night.", "Fix the wait and it's a five.", "Still a fair choice for a group dinner."],
  },
  low: {
    open: ["Not a great visit.", "Expected more.", "Disappointing this time."],
    detail: ["Order arrived cold and had to be sent back.", "Nobody checked on our table for a long stretch.", "The bill had an item we didn't order."],
    close: ["Hoping it was a one-off.", "Might give it another try later.", "Management should look into it."],
  },
};

const pick = <T,>(arr: T[], seed: number) => arr[seed % arr.length];

export default function ReviewFlow() {
  const [rating, setRating] = useState(4.5);
  const [seed, setSeed] = useState(0);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const tier = rating >= 4 ? "high" : rating >= 3 ? "mid" : "low";
  const suggestions = useMemo(() => {
    const p = POOLS[tier];
    return [0, 1, 2].map((i) => `${pick(p.open, seed + i)} ${pick(p.detail, seed + i * 2)} ${pick(p.close, seed + i * 3)}`);
  }, [tier, seed]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked; the textarea is still selectable */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-5">
        <p className="text-sm text-ink-subtle">How was {BUSINESS}?</p>
        <div>
          <div className="flex items-center gap-3">
            <div className="relative text-2xl leading-none tracking-[2px] text-hairline-strong" aria-hidden>
              ★★★★★
              <div className="absolute inset-0 overflow-hidden text-hue-amber" style={{ width: `${(rating / 5) * 100}%` }}>
                ★★★★★
              </div>
            </div>
            <span className="font-mono text-sm tabular-nums">{rating.toFixed(1)}</span>
          </div>
          <label className="mt-3 block">
            <span className="sr-only">Rating</span>
            <input type="range" min={1} max={5} step={0.5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full accent-[rgb(var(--hue-amber))]" />
          </label>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-ink-subtle">Pick a starting point</p>
            <button type="button" onClick={() => setSeed((s) => s + 1)} className="link text-xs">
              Shuffle
            </button>
          </div>
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setDraft(s)}
                  aria-pressed={draft === s}
                  className={`w-full rounded-md border-l-2 border border-hairline px-3 py-2 text-left text-sm leading-relaxed transition-colors ${tier === "high" ? "border-l-hue-emerald" : tier === "mid" ? "border-l-hue-amber" : "border-l-hue-rose"} ${draft === s ? "bg-surface-2 text-ink border-hairline-strong" : "bg-surface-1 text-ink-muted hover:border-hairline-strong"}`}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="review-draft" className="text-xs text-ink-subtle">
          Edit before posting
        </label>
        <textarea id="review-draft" value={draft} onChange={(e) => setDraft(e.target.value)} rows={6} placeholder="Pick a suggestion or write your own…" className="input h-auto flex-1 resize-none py-2.5 text-sm leading-relaxed" />
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={copy} disabled={!draft} className="btn-primary disabled:opacity-50">
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy & open Google"}
          </button>
          <span className="text-xs text-ink-tertiary">In the real product this opens the business&rsquo;s write-review page.</span>
        </div>
      </div>
    </div>
  );
}
