"use client";

import { useState } from "react";
import { personalInfo } from "@/constants/data";
import { Check, Copy, GitHub, LinkedIn, Mail, Upwork } from "./icons";

// "Start a project": pick a few chips, add a line, and watch the brief assemble as a ticket.
// Sends through the same /api/contact endpoint as a classic form would.

const TYPES = [
  { label: "Ticketing / booking", hue: "blue" },
  { label: "Workflow automation (n8n)", hue: "emerald" },
  { label: "Mobile app", hue: "violet" },
  { label: "Data pipeline / AI", hue: "cyan" },
  { label: "Web app / API", hue: "amber" },
  { label: "Something else", hue: "rose" },
];
const TIMELINES = ["This month", "Next quarter", "Just exploring"];
const BUDGETS = ["Under $1k", "$1–5k", "$5–15k", "$15k+", "Not sure yet"];

type State = "idle" | "sending" | "sent" | "error";

export default function ProjectBrief() {
  const [type, setType] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const ref = `MA-${new Date().getFullYear()}-${String(Math.abs((name + email).split("").reduce((a, c) => a + c.charCodeAt(0), 7)) % 900 + 100)}`;
  const subject = `Brief: ${type ?? "project"}${timeline ? ` · ${timeline.toLowerCase()}` : ""}${budget ? ` · ${budget}` : ""}`;
  const message = [
    `Project type: ${type ?? "—"}`,
    `Timeline: ${timeline ?? "—"}`,
    `Budget: ${budget ?? "—"}`,
    "",
    notes.trim() || "(no notes)",
  ].join("\n");
  const ready = !!type && name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email);

  const send = async () => {
    if (!ready || state === "sending") return;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), subject, message }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 429 ? "Too many briefs from this address — email works too." : body.error || "Couldn’t send.");
      setState("sent");
    } catch (e) {
      setState("error");
      setError(e instanceof Error ? e.message : "Couldn’t send.");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${personalInfo.email}\nSubject: ${subject}\n\n${message}\n\n— ${name || "(your name)"} · ${email || "(your email)"}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  const chip = (on: boolean, hue?: string) =>
    `rounded-xl border px-3.5 py-2 text-sm transition-colors ${on ? `text-ink ${hue ? `border-hue-${hue} bg-hue-${hue}/10` : "border-ink bg-surface-2"}` : "border-hairline bg-canvas text-ink-muted hover:border-hairline-strong hover:text-ink"}`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
      <div className="space-y-8">
        <fieldset>
          <legend className="mb-3 text-sm text-ink-subtle">
            <span className="font-mono text-xs text-ink-tertiary">01</span> What are we building?
          </legend>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button key={t.label} type="button" aria-pressed={type === t.label} onClick={() => setType(t.label)} className={chip(type === t.label, t.hue)}>
                {t.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm text-ink-subtle">
            <span className="font-mono text-xs text-ink-tertiary">02</span> When does it need to exist?
          </legend>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((t) => (
              <button key={t} type="button" aria-pressed={timeline === t} onClick={() => setTimeline(t)} className={chip(timeline === t)}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-sm text-ink-subtle">
            <span className="font-mono text-xs text-ink-tertiary">03</span> Rough budget
          </legend>
          <div className="flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button key={b} type="button" aria-pressed={budget === b} onClick={() => setBudget(b)} className={chip(budget === b)}>
                {b}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm text-ink-subtle">
            <span className="font-mono text-xs text-ink-tertiary">04</span> Who should I reply to?
          </legend>
          <div className="grid gap-2">
            <label htmlFor="brief-name" className="text-sm font-medium text-ink-muted">
              Name
            </label>
            <input id="brief-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ayesha Rahman" className="input" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="brief-email" className="text-sm font-medium text-ink-muted">
              Email
            </label>
            <input id="brief-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" spellCheck={false} placeholder="ayesha@studio.co" className="input" />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="brief-notes" className="text-sm font-medium text-ink-muted">
              Anything else <span className="font-normal text-ink-tertiary">— optional</span>
            </label>
            <textarea id="brief-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={2000} placeholder="Links, constraints, what exists already…" className="input h-auto resize-y py-2.5 leading-relaxed" />
          </div>
        </fieldset>
      </div>

      {/* The brief, assembling live */}
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3 font-mono text-[11px] text-ink-tertiary">
            <span>{ref}</span>
            <span className="badge">
              <span aria-hidden className={`size-1.5 rounded-full ${state === "sent" ? "bg-hue-emerald" : "bg-hue-amber"}`} />
              {state === "sent" ? "Sent" : "Draft"}
            </span>
          </div>
          <div className="p-5">
            <h3 className="text-[18px] font-medium leading-tight tracking-[-0.3px]">{type ? `${type} brief` : "Your brief"}</h3>
            <dl className="mt-4 grid grid-cols-[84px_1fr] gap-x-3 gap-y-2 text-[13px]">
              <dt className="text-ink-tertiary">Type</dt>
              <dd className={type ? "text-ink" : "text-ink-tertiary"}>{type ?? "pick one above"}</dd>
              <dt className="text-ink-tertiary">Timeline</dt>
              <dd className={timeline ? "text-ink" : "text-ink-tertiary"}>{timeline ?? "—"}</dd>
              <dt className="text-ink-tertiary">Budget</dt>
              <dd className={budget ? "text-ink" : "text-ink-tertiary"}>{budget ?? "—"}</dd>
              <dt className="text-ink-tertiary">From</dt>
              <dd className={name ? "text-ink" : "text-ink-tertiary"}>
                {name || "—"}
                {email && <span className="block font-mono text-xs text-ink-subtle">{email}</span>}
              </dd>
              {notes.trim() && (
                <>
                  <dt className="text-ink-tertiary">Notes</dt>
                  <dd className="whitespace-pre-wrap text-ink-muted">{notes.trim()}</dd>
                </>
              )}
            </dl>

            {state === "sent" ? (
              <p className="mt-5 flex items-center gap-2 text-sm text-hue-emerald">
                <Check /> Sent. I reply within a working day.
              </p>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button type="button" onClick={send} disabled={!ready || state === "sending"} className="btn-primary disabled:opacity-50">
                  {state === "sending" ? "Sending…" : "Send brief"}
                </button>
                <button type="button" onClick={copy} className="btn-secondary" aria-label="Copy brief as an email">
                  {copied ? <Check /> : <Copy />}
                  {copied ? "Copied" : "Copy as email"}
                </button>
              </div>
            )}
            {!ready && state !== "sent" && <p className="mt-3 text-xs text-ink-tertiary">Pick a project type and add your name and email to send.</p>}
            {error && <p className="mt-3 text-xs text-hue-rose">{error}</p>}
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {[
            { label: "Email", sub: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: Mail, hue: "rose" },
            { label: "LinkedIn", sub: "afkayyy", href: personalInfo.social.linkedin, Icon: LinkedIn, hue: "blue" },
            { label: "Upwork", sub: "Hire directly", href: personalInfo.social.upwork, Icon: Upwork, hue: "emerald" },
            { label: "GitHub", sub: "Afkayy-arc", href: personalInfo.social.github, Icon: GitHub, hue: "violet" },
          ].map(({ label, sub, href, Icon, hue }) => (
            <li key={label}>
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-1 px-3 py-2.5 transition-colors hover:border-hairline-strong">
                <span className={`grid size-7 shrink-0 place-items-center rounded-md bg-hue-${hue}/10 text-hue-${hue}`}>
                  <Icon width={14} height={14} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium">{label}</span>
                  <span className="block truncate text-xs text-ink-subtle">{sub}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
