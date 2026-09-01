import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectList from "@/components/ProjectList";
import TechStack from "@/components/TechStack";
import ExperienceList from "@/components/ExperienceList";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import Footer from "@/components/Footer";
import LiveDemos from "@/components/LiveDemos";
import ChatWidget from "@/components/ChatWidget";
import Reveal from "@/components/Reveal";
import { personalInfo, projects } from "@/constants/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />

        <section id="demos" className="scroll-mt-14 border-t border-hairline py-20 md:py-24">
          <div className="mx-auto max-w-site px-6 lg:px-8">
            <Reveal className="mb-10 md:flex md:items-end md:justify-between md:gap-12">
              <div>
                <p className="eyebrow">Interactive demos</p>
                <h2 className="display-md mt-3 text-balance">Try the mechanisms</h2>
              </div>
              <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-subtle md:mt-0">
                Client products stay private, so these are rebuilt from scratch with fake data. The logic — locking, orchestration, retrieval, retries — is the real shape.
              </p>
            </Reveal>
            <LiveDemos />
          </div>
        </section>

        <Section
          id="projects"
          eyebrow={`${projects.length} projects`}
          title="Work that shipped"
          lead="Ticketing, automation, data pipelines and one mobile app. Links open where the work is public."
        >
          <ProjectList />
        </Section>

        <Section
          id="stack"
          eyebrow="Stack"
          title="Tools I reach for"
          lead="Grouped by where they sit in the system. Comfortable owning any layer end to end."
        >
          <TechStack />
        </Section>

        <Section
          id="experience"
          eyebrow="Experience"
          title="Where I’ve worked"
          lead="Two engineering roles and two internships, all remote or hybrid, across Spain and Pakistan."
        >
          <ExperienceList />
        </Section>

        <Section
          id="contact"
          eyebrow="Contact"
          title="Have a project in mind?"
          lead={`${personalInfo.availability}. Send a brief and I’ll come back with questions and a rough scope.`}
          aside={<CopyEmail />}
        >
          <ContactForm />
        </Section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
