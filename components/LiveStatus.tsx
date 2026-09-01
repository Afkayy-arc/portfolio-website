"use client";

import { useEffect, useState } from "react";
import { experience, personalInfo } from "@/constants/data";

type Status = { commit: { date: string; message: string; repo: string } | null; weather: { temp: number; sky: string } | null };

const ago = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
};

export function useLocalClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Karachi" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// One mono line of facts that are actually live. Anything that fails to load is omitted, never faked.
export default function LiveStatus() {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : null))
      .then(setS)
      .catch(() => setS(null));
  }, []);

  const now = experience[0];
  const items: [string, string][] = [["now", `${now.company.split(" ")[0]} · ${now.role}`]];
  if (s?.commit) items.push(["last commit", `${ago(s.commit.date)} · ${s.commit.repo}`]);
  if (s?.weather) items.push(["weather", `${s.weather.temp}°C, ${s.weather.sky}`]);
  items.push(["status", personalInfo.availability.toLowerCase()]);

  return (
    <dl className="flex flex-wrap justify-center gap-x-5 gap-y-1 font-mono text-xs text-ink-tertiary">
      {items.map(([k, v]) => (
        <div key={k} className="flex gap-1.5">
          <dt>{k}</dt>
          <dd className="text-ink-subtle">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
