import Rail from "@/components/Rail";
import AskHero from "@/components/AskHero";
import DemoCanvas from "@/components/DemoCanvas";
import ProjectStrips from "@/components/ProjectStrips";
import BioToggle from "@/components/BioToggle";
import ExperienceList from "@/components/ExperienceList";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import Reveal from "@/components/Reveal";
import { experience, personalInfo, projects } from "@/constants/data";

function Head({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="display-md mt-3 text-balance">{title}</h2>
        {lead && <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-ink-subtle">{lead}</p>}
      </div>
      {children}
    </Reveal>
  );
}

export default function Home() {
  const now = experience[0];
  return (
    <>
      <Rail />
      <main id="main" className="pb-14 md:pb-0 md:pl-[60px]">
        <AskHero />

        <section id="demos" className="scroll-mt-6 border-t border-hairline py-20 md:py-24">
          <div className="mx-auto max-w-site px-6 lg:px-8">
            <Head eyebrow="Live demos" title="Try the mechanisms" lead="Rebuilt from scratch with fake data — the client products stay private. Each node runs." />
            <DemoCanvas />
          </div>
        </section>

        <section id="work" className="scroll-mt-6 border-t border-hairline py-20 md:py-24">
          <div className="mx-auto max-w-site px-6 lg:px-8">
            <Head eyebrow="Work" title={`${projects.length} projects`} lead="Hover a strip to open it. Public ones link out; client work stays private." />
            <ProjectStrips />
          </div>
        </section>

        <section id="about" className="scroll-mt-6 border-t border-hairline py-20 md:py-24">
          <div className="mx-auto max-w-site px-6 lg:px-8">
            <Head eyebrow="About" title="Who you’d be working with" />
            <div className="grid gap-10 md:grid-cols-[1fr_360px] md:gap-14">
              <BioToggle />
              <div className="panel h-fit min-w-0 p-5 text-[13px]">
                <dl className="grid min-w-0 grid-cols-[84px_minmax(0,1fr)] gap-x-3 gap-y-2">
                  <dt className="text-ink-tertiary">Now</dt>
                  <dd className="text-ink-muted">
                    {now.role} · {now.company}
                  </dd>
                  <dt className="text-ink-tertiary">Before</dt>
                  <dd className="text-ink-muted">
                    {experience[1].role} · {experience[1].company}
                  </dd>
                  <dt className="text-ink-tertiary">Base</dt>
                  <dd className="text-ink-muted">
                    {personalInfo.location} · {personalInfo.timezone} · remote
                  </dd>
                  <dt className="text-ink-tertiary">Email</dt>
                  <dd>
                    <CopyEmail className="text-[13px]" />
                  </dd>
                </dl>
              </div>
            </div>

            <div className="mt-20">
              <p className="eyebrow mb-6">Experience</p>
              <ExperienceList />
            </div>

            <div id="contact" className="mt-20 scroll-mt-6 grid gap-10 md:grid-cols-[1fr_2fr] md:gap-14">
              <div>
                <p className="eyebrow">Contact</p>
                <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-[-0.6px]">Have a project in mind?</h3>
                <p className="mt-3 max-w-[40ch] text-ink-subtle">{personalInfo.availability}. Send a brief and I’ll come back with questions and a rough scope.</p>
                <div className="mt-5">
                  <CopyEmail />
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
