"use client";

import { useEffect, useRef, useState } from "react";
import { personalInfo } from "@/constants/data";
import { Close } from "./icons";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What has he built with n8n?",
  "Is he available for freelance work?",
  "How does the seat-map locking work?",
  "What's his mobile experience?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text: string) => {
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
        body: JSON.stringify({ messages: history.slice(-12) }),
      });
      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({}));
        throw new Error(res.status === 429 ? "Message limit reached for now. Email works too." : body.error || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        // Gemini emits light markdown; render it as plain text with real bullets.
        setMessages([...history, { role: "assistant", content: acc.replace(/\*\*/g, "").replace(/^\s*[*-]\s+/gm, "• ") }]);
      }
      if (!acc) throw new Error("No reply received. Try again.");
    } catch (e) {
      setMessages(history);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        className="btn-primary fixed bottom-5 right-5 z-40 h-11 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.35)]"
      >
        <span aria-hidden className="size-1.5 rounded-full bg-white/80" />
        {open ? "Close chat" : "Ask about my work"}
      </button>

      {open && (
        <div
          id="chat-panel"
          role="dialog"
          aria-label={`Ask about ${personalInfo.name}`}
          className="panel fixed bottom-20 right-5 z-40 flex h-[min(560px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden"
        >
          <header className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div>
              <p className="text-sm font-medium">Ask about {personalInfo.name.split(" ")[0]}</p>
              <p className="text-xs text-ink-subtle">Answers only from what&rsquo;s on this page.</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="-mr-1 flex size-8 items-center justify-center rounded-md text-ink-subtle hover:text-ink">
              <Close />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-ink-subtle">Try one of these, or type your own.</p>
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="block w-full rounded-md border border-hairline bg-surface-1 px-3 py-2 text-left text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 leading-relaxed ${m.role === "user" ? "bg-primary text-white" : "bg-surface-2 text-ink"}`}>
                  {m.content || <span className="text-ink-subtle">Thinking…</span>}
                </p>
              </div>
            ))}
            {error && <p className="text-xs text-ink-subtle">{error}</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-hairline p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Your question
            </label>
            <input
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              autoComplete="off"
              placeholder="Ask about his projects, stack, availability…"
              className="input h-10 text-sm"
            />
            <button type="submit" disabled={busy || !input.trim()} className="btn-primary shrink-0 disabled:opacity-50">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
