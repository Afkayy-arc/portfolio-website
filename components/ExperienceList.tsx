import { experience } from "@/constants/data";
import Reveal from "./Reveal";

export default function ExperienceList() {
  return (
    <ol className="divide-y divide-hairline border-y border-hairline">
      {experience.map((e, i) => (
        <li key={e.company}>
          <Reveal delay={i * 0.04} className="grid gap-4 py-8 md:grid-cols-[200px_1fr] md:gap-10">
            <div className="font-mono text-xs leading-relaxed text-ink-subtle">
              <p className="text-ink-muted">{e.period}</p>
              <p>{e.location}</p>
            </div>
            <div>
              <h3 className="text-[22px] font-medium leading-tight tracking-[-0.4px]">{e.role}</h3>
              <p className="mt-1 text-ink-subtle">{e.company}</p>
              <ul className="mt-4 max-w-[72ch] space-y-2 text-[15px] leading-relaxed text-ink-subtle marker:text-ink-tertiary">
                {e.bullets.map((b) => (
                  <li key={b} className="ml-4 list-disc pl-1">
                    {b}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
