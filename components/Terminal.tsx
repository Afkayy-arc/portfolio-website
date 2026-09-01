"use client";

import { useEffect, useRef, useState } from "react";
import { demos, experience, personalInfo, projects, stack } from "@/constants/data";
import { emit, on, scrollToId } from "@/lib/bus";
import { Close } from "./icons";

type Line = { kind: "cmd" | "out" | "err"; text: string };

const pad = (s: string, n: number) => s.padEnd(n).slice(0, n);
const HELP = `commands
  help                 this list
  whoami               who you're talking to
  projects [--featured] list work · open <slug> to jump to it
  demo <id>            run a demo: ${demos.map((d) => d.id).join(" · ")}
  stack                tools by layer
  experience           roles, newest first
  contact              email and links
  cv                   download the CV
  ask <question>       ask the assistant
  theme                toggle light/dark
  clear                clear the screen
  exit                 close the terminal`;

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: `${personalInfo.name} — type help to start.` }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => on("toggle-terminal", () => setOpen((o) => !o)), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName) && e.target !== inputRef.current;
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [lines]);

  const print = (text: string, kind: Line["kind"] = "out") => setLines((l) => [...l, { kind, text }]);

  const run = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines((l) => [...l, { kind: "cmd", text: cmd }]);
    setInput("");
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");
    switch (name) {
      case "help":
        return print(HELP);
      case "whoami":
        return print(`${personalInfo.name} · ${personalInfo.title}\n${personalInfo.location} · ${personalInfo.timezone} · ${personalInfo.availability.toLowerCase()}`);
      case "projects": {
        const list = rest.includes("--featured") ? projects.filter((p) => p.featured) : projects;
        return print(list.map((p, i) => `  ${String(i + 1).padStart(2, "0")}  ${pad(p.slug, 12)} ${pad(p.title, 34)} ${p.liveUrl ? "live" : p.repoUrl ? "source" : "client · private"}`).join("\n") + "\n\nopen <slug> to jump to one");
      }
      case "open": {
        const p = projects.find((x) => x.slug === arg);
        if (!p) return print(`no project "${arg}". try: ${projects.map((x) => x.slug).join(", ")}`, "err");
        emit("open-project", p.slug);
        scrollToId("work");
        return print(`opened ${p.title}${p.liveUrl ? ` · ${p.liveUrl}` : ""}`);
      }
      case "demo": {
        const d = demos.find((x) => x.id === arg);
        if (!d) return print(`no demo "${arg}". try: ${demos.map((x) => x.id).join(", ")}`, "err");
        emit("open-demo", d.id);
        scrollToId("demos");
        return print(`running ${d.title} — ${d.blurb}`);
      }
      case "stack":
        return print(stack.map((s) => `  ${pad(s.group, 16)} ${s.items.join(" · ")}`).join("\n"));
      case "experience":
        return print(experience.map((e) => `  ${pad(e.period, 22)} ${e.role} · ${e.company} (${e.location})`).join("\n"));
      case "contact":
        return print(`  email     ${personalInfo.email}\n  github    ${personalInfo.social.github}\n  linkedin  ${personalInfo.social.linkedin}\n  upwork    ${personalInfo.social.upwork}`);
      case "cv":
        window.open(personalInfo.cvPath, "_blank", "noopener");
        return print(`opening ${personalInfo.cvPath}`);
      case "theme":
        document.documentElement.classList.toggle("dark");
        return print("theme toggled for this visit (the rail button persists it)");
      case "clear":
        return setLines([]);
      case "exit":
        return setOpen(false);
      case "ask": {
        if (!arg) return print("usage: ask <question>", "err");
        setBusy(true);
        try {
          const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: arg }] }) });
          const text = res.ok ? (await res.text()).replace(/\n?\s*\[\[cards:[^\]]*\]\]\s*$/i, "").replace(/\*\*/g, "") : `error ${res.status}`;
          print(text.trim());
        } catch {
          print("connection failed", "err");
        } finally {
          setBusy(false);
        }
        return;
      }
      default:
        return print(`command not found: ${name}. type help.`, "err");
    }
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-label="Terminal" className="fixed inset-x-0 bottom-14 z-30 flex h-[280px] flex-col border-t border-hairline bg-surface-1 md:bottom-0 md:left-[60px]">
      <div className="flex items-center gap-3 border-b border-hairline px-3.5 py-2 text-xs text-ink-subtle">
        <b className="font-medium text-ink">terminal</b>
        <span className="font-mono">guest@abdullah</span>
        <span className="text-ink-tertiary">
          type <span className="font-mono">help</span> · Esc closes
        </span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close terminal" className="ml-auto text-ink-subtle hover:text-ink">
          <Close />
        </button>
      </div>
      <div ref={scroller} className="flex-1 overflow-auto px-4 py-3 font-mono text-[12.5px] leading-[1.6] text-ink-muted" onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <pre key={i} className={`m-0 whitespace-pre-wrap ${l.kind === "cmd" ? "text-ink" : l.kind === "err" ? "text-ink-subtle" : ""}`}>
            {l.kind === "cmd" ? (
              <>
                <span className="text-success">guest@abdullah</span>:<span className="text-accent">~</span>$ {l.text}
              </>
            ) : (
              l.text
            )}
          </pre>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
          className="flex gap-1"
        >
          <span>
            <span className="text-success">guest@abdullah</span>:<span className="text-accent">~</span>$
          </span>
          <label htmlFor="term-input" className="sr-only">
            Command
          </label>
          <input ref={inputRef} id="term-input" value={input} onChange={(e) => setInput(e.target.value)} disabled={busy} autoComplete="off" spellCheck={false} className="min-w-0 flex-1 bg-transparent text-ink outline-none" />
        </form>
      </div>
    </div>
  );
}
