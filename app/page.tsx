import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ProjectCard from "@/components/ProjectCard";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { projects, experience } from "@/constants/data";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Stats />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Featured Projects
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
            A collection of my recent work showcasing various technologies and problem-solving approaches.
          </p>
        </div>

        {/* Featured Projects - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>

        {/* Other Projects */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            More Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + projects.filter((p) => p.featured).length}
                />
              ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Tech Stack
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>
        <TechStack />
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Experience
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
            My professional journey and contributions to various organizations.
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="group relative bg-white dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300"
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg">
                    {exp.company}
                  </p>
                </div>
                <span className="text-zinc-500 dark:text-zinc-500 font-medium mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-zinc-700 dark:text-zinc-300 flex items-start">
                    <span className="text-indigo-500 mr-2 mt-1.5">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            What People Say
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl">
            Feedback from clients and colleagues I&apos;ve worked with.
          </p>
        </div>
        <Testimonials />
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
            Get In Touch
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s work together to bring your ideas to life.
          </p>
        </div>
        <ContactForm />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
