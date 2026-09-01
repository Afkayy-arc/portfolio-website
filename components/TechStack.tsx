import { stack } from "@/constants/data";
import Reveal from "./Reveal";

export default function TechStack() {
  return (
    <dl className="divide-y divide-hairline border-y border-hairline">
      {stack.map((s, i) => (
        <Reveal key={s.group} delay={i * 0.04} className="grid grid-cols-[112px_1fr] gap-4 py-5 md:grid-cols-[160px_1fr]">
          <dt className="pt-0.5 text-sm text-ink-subtle">{s.group}</dt>
          <dd className="flex flex-wrap gap-1.5">
            {s.items.map((item) => (
              <span key={item} className="tag">
                {item}
              </span>
            ))}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
