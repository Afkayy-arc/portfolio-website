import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
  children: ReactNode;
}

// 4/8 split: sticky header column on the left, content on the right. Collapses to one column below md.
export default function Section({ id, eyebrow, title, lead, aside, children }: Props) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-hairline py-20 md:py-24">
      <div className="mx-auto grid max-w-site gap-10 px-6 md:grid-cols-12 md:gap-12 lg:px-8">
        <header className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-md mt-3 text-balance">{title}</h2>
            {lead && <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-ink-subtle">{lead}</p>}
            {aside && <div className="mt-6">{aside}</div>}
          </div>
        </header>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}
