import { projects } from "@/constants/data";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";

export default function ProjectList() {
  return (
    <ol className="divide-y divide-hairline border-y border-hairline">
      {projects.map((p, i) => (
        <li key={p.title}>
          <Reveal delay={Math.min(i, 4) * 0.04} className="grid gap-3 py-7 md:grid-cols-[48px_1fr_auto] md:gap-6">
            <span className="pt-1.5 font-mono text-xs text-ink-tertiary">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-[22px] font-medium leading-tight tracking-[-0.4px]">{p.title}</h3>
                {p.featured && <span className="badge">Featured</span>}
              </div>
              <p className="mt-2.5 max-w-[65ch] leading-relaxed text-ink-subtle">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {(p.liveUrl || p.repoUrl) && (
              <div className="flex gap-4 md:flex-col md:items-end md:gap-2 md:pt-1.5">
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
                    Live <ArrowUpRight />
                  </a>
                )}
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link">
                    Source <ArrowUpRight />
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
