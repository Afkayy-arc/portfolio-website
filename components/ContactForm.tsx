"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

type Status = { kind: "idle" } | { kind: "sent" } | { kind: "error"; message: string };

const fields: { name: keyof ContactFormData; label: string; type?: string; placeholder: string }[] = [
  { name: "name", label: "Name", placeholder: "Ayesha Rahman" },
  { name: "email", label: "Email", type: "email", placeholder: "ayesha@studio.co" },
  { name: "subject", label: "Subject", placeholder: "Seat-map ticketing for a 1,200-seat venue" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) {
        const message =
          res.status === 429
            ? `Too many messages from this address. Try again in ${Math.ceil(body.retryAfter / 60)} minutes.`
            : body.error || "The message could not be sent.";
        setStatus({ kind: "error", message });
        return;
      }
      setStatus({ kind: "sent" });
      reset();
    } catch {
      setStatus({ kind: "error", message: "Connection failed. Try again, or email directly." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={`grid gap-2 ${f.name === "subject" ? "sm:col-span-2" : ""}`}>
          <label htmlFor={f.name} className="text-sm font-medium text-ink-muted">
            {f.label}
          </label>
          <input
            {...register(f.name)}
            id={f.name}
            type={f.type ?? "text"}
            placeholder={f.placeholder}
            autoComplete={f.name === "email" ? "email" : f.name === "name" ? "name" : "off"}
            spellCheck={f.name === "email" ? false : undefined}
            aria-invalid={errors[f.name] ? true : undefined}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className="input"
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} className="text-sm text-ink-subtle">
              {errors[f.name]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="grid gap-2 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-ink-muted">
          Message
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={6}
          placeholder="What are you building, and when does it need to ship?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="input h-auto resize-y py-2.5 leading-relaxed"
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-ink-subtle">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-ink-subtle">
          {status.kind === "sent" && (
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-success" />
              Sent. I reply within a working day.
            </span>
          )}
          {status.kind === "error" && status.message}
        </p>
      </div>
    </form>
  );
}
