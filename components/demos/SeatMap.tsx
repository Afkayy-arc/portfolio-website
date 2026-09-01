"use client";

import { useState } from "react";

type Status = "free" | "selected" | "held" | "sold";
const ROWS = ["A", "B", "C", "D", "E", "F"];
const COLS = 12;
const PRICE = 45;
const SOLD_AT_START = new Set(["A3", "A4", "B7", "C1", "C2", "D9", "E5", "E6", "F11"]);

const seatClass: Record<Status, string> = {
  free: "bg-surface-2 border-hairline hover:border-hairline-strong",
  selected: "bg-primary border-primary text-white",
  held: "bg-surface-4 border-hairline-strong text-ink-subtle animate-pulse",
  sold: "bg-surface-1 border-hairline text-ink-tertiary cursor-not-allowed",
};

const initial = () =>
  Object.fromEntries(ROWS.flatMap((r) => Array.from({ length: COLS }, (_, c) => [`${r}${c + 1}`, SOLD_AT_START.has(`${r}${c + 1}`) ? "sold" : "free"]))) as Record<string, Status>;

export default function SeatMap() {
  const [seats, setSeats] = useState<Record<string, Status>>(initial);
  const [log, setLog] = useState<string[]>(["Venue loaded: 72 seats, 9 already sold."]);
  const [booking, setBooking] = useState(false);

  const selected = Object.keys(seats).filter((id) => seats[id] === "selected");
  const say = (line: string) => setLog((l) => [...l.slice(-7), line]);

  const toggle = (id: string) => {
    if (booking || seats[id] === "sold" || seats[id] === "held") return;
    setSeats((s) => ({ ...s, [id]: s[id] === "selected" ? "free" : "selected" }));
  };

  const book = () => {
    if (!selected.length) return;
    setBooking(true);
    const ids = [...selected];
    setSeats((s) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, ids.includes(k) ? "held" : v])));
    say(`buyer#1  LOCK ${ids.join(" ")}  (mutex acquired)`);
    setTimeout(() => {
      const contested = ids[0];
      const free = Object.keys(seats).find((k) => seats[k] === "free" && !ids.includes(k)) ?? "B8";
      say(`buyer#2  LOCK ${contested} ${free}  → ${contested} REJECTED: held by buyer#1`);
      say(`buyer#2  LOCK ${free}  ok`);
      setSeats((s) => ({ ...s, [free]: "held" }));
      setTimeout(() => {
        setSeats((s) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, v === "held" ? "sold" : v])));
        say(`COMMIT  buyer#1 ${ids.length} seat${ids.length > 1 ? "s" : ""} · buyer#2 1 seat · double-bookings: 0`);
        setBooking(false);
      }, 1200);
    }, 700);
  };

  const reset = () => {
    setSeats(initial());
    setLog(["Venue reset."]);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="mb-3 rounded-sm border border-hairline bg-surface-1 py-1 text-center font-mono text-[11px] text-ink-tertiary">STAGE</div>
        <div className="overflow-x-auto">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: `1.25rem repeat(${COLS}, minmax(1.5rem, 1fr))` }} role="group" aria-label="Seat map">
            {ROWS.map((r) => (
              <div key={r} className="contents">
                <span className="self-center font-mono text-[11px] text-ink-tertiary">{r}</span>
                {Array.from({ length: COLS }, (_, c) => {
                  const id = `${r}${c + 1}`;
                  const st = seats[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      onPointerEnter={(e) => e.buttons === 1 && st === "free" && toggle(id)}
                      disabled={st === "sold" || st === "held"}
                      aria-label={`Seat ${id}, ${st}`}
                      aria-pressed={st === "selected"}
                      className={`aspect-square rounded-[4px] border font-mono text-[10px] transition-colors ${seatClass[st]}`}
                    >
                      {c + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-subtle">
          {(["free", "selected", "held", "sold"] as Status[]).map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className={`inline-block size-3 rounded-[3px] border ${seatClass[s].split(" ").slice(0, 2).join(" ")}`} />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-subtle">{selected.length} selected</span>
          <span className="font-mono tabular-nums">${(selected.length * PRICE).toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={book} disabled={!selected.length || booking} className="btn-primary flex-1 justify-center disabled:opacity-50">
            {booking ? "Booking…" : "Book seats"}
          </button>
          <button type="button" onClick={reset} className="btn-secondary">
            Reset
          </button>
        </div>
        <pre className="min-h-[9rem] flex-1 overflow-auto rounded-md border border-hairline bg-surface-1 p-3 font-mono text-[11px] leading-relaxed text-ink-subtle" aria-live="polite">
          {log.join("\n")}
        </pre>
        <p className="text-xs text-ink-tertiary">Click or drag across seats, then book. A second buyer races you for the same seat and loses.</p>
      </div>
    </div>
  );
}
