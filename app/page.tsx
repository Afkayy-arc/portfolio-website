import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectList from "@/components/ProjectList";
import TechStack from "@/components/TechStack";
import ExperienceList from "@/components/ExperienceList";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import Footer from "@/components/Footer";
import { personalInfo, projects } from "@/constants/data";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />

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
    </>
  );
}
