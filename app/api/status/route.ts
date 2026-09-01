import { NextResponse } from "next/server";
import { personalInfo } from "@/constants/data";

// Live facts for the hero status line. Each source is fetched with ISR-style caching so a
// burst of visitors never hits GitHub or Open-Meteo more than once per window.
export const revalidate = 600;

async function lastCommit() {
  const { owner, repo } = personalInfo.github;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-status" },
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  const [c] = await res.json();
  return c ? { date: c.commit.author.date as string, message: (c.commit.message as string).split("\n")[0], repo } : null;
}

async function weather() {
  const { lat, lon } = personalInfo.coords;
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FKarachi`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) return null;
  const j = await res.json();
  const code = j.current?.weather_code as number;
  const sky = code === 0 ? "clear" : code <= 3 ? "partly cloudy" : code <= 48 ? "fog" : code <= 67 ? "rain" : code <= 77 ? "snow" : code <= 82 ? "showers" : "storm";
  return { temp: Math.round(j.current?.temperature_2m), sky };
}

export async function GET() {
  const [commit, wx] = await Promise.allSettled([lastCommit(), weather()]);
  return NextResponse.json(
    {
      commit: commit.status === "fulfilled" ? commit.value : null,
      weather: wx.status === "fulfilled" ? wx.value : null,
    },
    { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" } }
  );
}
