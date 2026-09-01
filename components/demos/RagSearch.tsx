"use client";

import { useState } from "react";

const CORPUS = [
  { id: "kb-012", title: "Refunds", text: "Refunds are issued to the original payment method within 5 to 7 working days. Deposits for missed appointments are non-refundable unless cancelled 24 hours ahead." },
  { id: "kb-018", title: "Opening hours", text: "The clinic is open Monday to Saturday, 9am to 7pm. Emergency slots are held every morning between 9 and 10." },
  { id: "kb-031", title: "Parking", text: "Free parking is available behind the building. Street parking on Main Boulevard is limited to two hours." },
  { id: "kb-044", title: "Whitening", text: "Teeth whitening takes about 60 minutes. Results last 12 to 18 months depending on diet and smoking." },
  { id: "kb-052", title: "Insurance", text: "We accept EFU, Jubilee and Adamjee insurance. Bring your card; claims are filed by the front desk on the same day." },
  { id: "kb-067", title: "Children", text: "Children's check-ups are free under age 6 when booked with a parent's appointment." },
  { id: "kb-073", title: "Cancellations", text: "Appointments can be cancelled or moved by replying to the confirmation message. Cancellations inside 24 hours forfeit the deposit." },
  { id: "kb-080", title: "Payments", text: "We take cash, cards, and bank transfer. A deposit is required for whitening and implants." },
];

const SUGGESTED = ["Can I get my deposit back if I cancel?", "Do you take insurance?", "How long does whitening last?", "Where can I park?"];
const STOP = new Set(["the", "a", "an", "is", "are", "do", "does", "can", "i", "my", "you", "if", "to", "of", "for", "and", "it", "how", "where", "we", "get", "take", "long"]);

const tokens = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((t) => t && !STOP.has(t)).map((t) => t.replace(/s$/, ""));

function rank(query: string) {
  const q = tokens(query);
  if (!q.length) return [];
  return CORPUS.map((c) => {
    const bag = tokens(`${c.title} ${c.text}`);
    const hits = q.filter((t) => bag.some((b) => b.startsWith(t) || t.startsWith(b)));
    return { ...c, score: hits.length / q.length, hits };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function RagSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof rank>>([]);
  const [asked, setAsked] = useState("");

  const search = (q: string) => {
    setQuery(q);
    setAsked(q);
    setResults(rank(q));
  };

  const top = results[0];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            search(query);
          }}
          className="flex gap-2"
        >
          <label htmlFor="rag-query" className="sr-only">
            Question
          </label>
          <input id="rag-query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask the clinic knowledge base…" autoComplete="off" className="input h-10 text-sm" />
          <button type="submit" className="btn-primary shrink-0">
            Search
          </button>
        </form>
        <ul className="flex flex-wrap gap-1.5">
          {SUGGESTED.map((s) => (
            <li key={s}>
              <button type="button" onClick={() => search(s)} className="tag h-7 cursor-pointer px-2.5 font-sans transition-colors hover:border-hairline-strong">
                {s}
              </button>
            </li>
          ))}
        </ul>
        <ol className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-ink-tertiary">
          {["embed query", "cosine over 8 chunks", "top-3", "answer"].map((s, i) => (
            <li key={s} className={asked ? "text-ink-subtle" : ""}>
              {i + 1}. {s}
              {i < 3 && <span className="ml-2">→</span>}
            </li>
          ))}
        </ol>
        <p className="text-xs text-ink-tertiary">Retrieval here is keyword overlap standing in for vector similarity; the pipeline shape is the real one.</p>
      </div>

      <div className="space-y-3">
        {asked && !results.length && <p className="text-sm text-ink-subtle">Nothing in the knowledge base matches that. The real system would say so instead of guessing.</p>}
        {results.map((r, i) => (
          <div key={r.id} className={`rounded-md border p-3 ${i === 0 ? "border-hairline-strong bg-surface-2" : "border-hairline bg-surface-1"}`}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-ink-tertiary">
              <span>
                {r.id} · {r.title}
              </span>
              <span className="tabular-nums">{r.score.toFixed(2)}</span>
            </div>
            <div className="mb-2 h-1 overflow-hidden rounded-full bg-hairline">
              <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${r.score * 100}%` }} />
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">{r.text}</p>
          </div>
        ))}
        {top && (
          <div className="rounded-md border border-hairline p-3">
            <p className="mb-1 font-mono text-[11px] text-ink-tertiary">answer · grounded in {top.id}</p>
            <p className="text-sm leading-relaxed">{top.text.split(". ")[0]}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
