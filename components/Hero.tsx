import { personalInfo, metrics } from "@/constants/data";
import Reveal from "./Reveal";
import { Download } from "./icons";

const facts: [string, string][] = [
  ["Role", personalInfo.title],
  ["Now", "Twodotzero · Barcelona (remote)"],
  ["Base", `${personalInfo.location} · ${personalInfo.timezone}`],
  ["Stack", "Next.js · Node · Flutter · n8n · Airflow"],
  ["Email", personalInfo.email],
];

export default function Hero() {
  return (
    <div id="top" className="mx-auto max-w-site px-6 pb-16 pt-20 md:pb-20 md:pt-28 lg:px-8">
      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="badge">
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            {personalInfo.availability}
          </p>
          <h1 className="display-lg mt-6 max-w-[16ch] text-balance">
            {personalInfo.name} builds ticketing platforms, workflow automations, and the APIs underneath them.
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-subtle">
            Three years across MERN, Next.js, Flutter and n8n. Currently at Twodotzero in Barcelona, remote from Islamabad;
            previously AI engineering at DevMechanix.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
            <a href={personalInfo.cvPath} download="Muhammad_Abdullah_CV.pdf" className="btn-secondary">
              <Download />
              Download CV
            </a>
          </div>
        </Reveal>

        {/* Linear-style issue card standing in for a product screenshot */}
        <Reveal delay={0.1} className="md:col-span-5">
          <div className="panel p-5 font-mono text-[13px] leading-relaxed">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <span className="text-ink-tertiary">MA-2026</span>
              <span className="badge">
                <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                In progress
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-[72px_1fr] gap-y-2.5">
              {facts.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-ink-tertiary">{k}</dt>
                  <dd className="break-words text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-16 md:mt-24">
        <ul className="grid grid-cols-2 divide-hairline border-t border-hairline md:grid-cols-4 md:divide-x">
          {metrics.map((m) => (
            <li key={m.label} className="py-6 pr-6 md:px-6 md:first:pl-0">
              <p className="text-2xl font-semibold tabular-nums tracking-tight">{m.value}</p>
              <p className="mt-1 text-sm text-ink-subtle">{m.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
