
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  X,
  FileText,
  Download,
  Github,
  Briefcase,
  GraduationCap,
  Zap,
  ShieldCheck,
  Monitor,
  BrainCircuit,
  ExternalLink,
} from 'lucide-react';

import Resume from '../../../components/resume';

const capabilities = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description:
      'Building complete web applications, from responsive interfaces to scalable backend services and database architecture.',
    icon: Code2,
    tags: ['React', 'Next.js', 'FastAPI', 'Spring Boot'],
    color: 'purple',
  },
  {
    number: '02',
    title: 'Business Applications',
    description:
      'Developing practical business systems, including ERP, POS, inventory, accounting, and workflow automation.',
    icon: Workflow,
    tags: ['ERP', 'POS', 'Accounting', 'Automation'],
    color: 'cyan',
  },
  {
    number: '03',
    title: 'Backend Engineering',
    description:
      'Designing APIs, authentication systems, relational databases, and maintainable application architecture.',
    icon: Server,
    tags: ['Python', 'Java', 'PostgreSQL', 'SQLAlchemy'],
    color: 'emerald',
  },
  {
    number: '04',
    title: 'Creative Technology',
    description:
      'Exploring interactive experiences, 3D interfaces, animation, and AI-powered applications.',
    icon: BrainCircuit,
    tags: ['Three.js', 'Framer Motion', 'AI', '3D'],
    color: 'pink',
  },
];

const technologies = [
  {
    category: 'Frontend',
    icon: Monitor,
    items: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    icon: Terminal,
    items: ['Python', 'FastAPI', 'Django', 'Java', 'Spring Boot'],
  },
  {
    category: 'Database',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'SQLAlchemy', 'Pandas'],
  },
  {
    category: 'Tools & Other',
    icon: Cpu,
    items: ['Git', 'Docker', 'REST API', 'Framer Motion', 'Three.js'],
  },
];

const principles = [
  {
    icon: Zap,
    title: 'Problem First',
    text: 'Understand the real problem before choosing a technology.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Engineering',
    text: 'Prioritize maintainability, security, and predictable behavior.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    text: 'Build systems that can evolve as requirements grow.',
  },
];

const journey = [
  {
    year: '2027',
    title: 'Professional Career',
    description:
      'Preparing to graduate from vocational school and pursue professional opportunities in software development and digital business.',
    icon: Briefcase,
  },
  {
    year: 'Present',
    title: 'DX Business Studies',
    description:
      'Studying digital transformation, business processes, software development, and practical technology applications in Japan.',
    icon: GraduationCap,
  },
  {
    year: 'Continuous',
    title: 'Independent Development',
    description:
      'Learning through personal projects, technical experimentation, and building practical software solutions.',
    icon: Code2,
  },
];

const projects = [
  {
    name: 'Korix ERP',
    type: 'Business Management Platform',
    description:
      'An ERP concept focused on accounting, POS, inventory management, and practical business workflows.',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL'],
    icon: Layers,
    status: 'In Development',
  },
  {
    name: 'Document Engine',
    type: 'Document Automation',
    description:
      'A document-generation platform designed around users, roles, reusable templates, and administrative workflows.',
    stack: ['Python', 'FastAPI', 'React'],
    icon: FileText,
    status: 'In Development',
  },
  {
    name: 'Creative World',
    type: 'Interactive Web Experience',
    description:
      'An experimental interface exploring animation, interactive environments, and creative web technologies.',
    stack: ['Next.js', 'Framer Motion', 'Three.js'],
    icon: Globe,
    status: 'Experimental',
  },
];

const colorClasses = {
  purple: 'text-purple-300 bg-purple-400/10 border-purple-400/20',
  cyan: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/20',
  emerald: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
  pink: 'text-pink-300 bg-pink-400/10 border-pink-400/20',
};

function SectionHeading({ eyebrow, title, highlight, description }) {
  return (
    <div className="max-w-2xl mb-12">
      <p className="text-xs tracking-[0.35em] uppercase text-purple-400 font-bold mb-4">
        {eyebrow}
      </p>

      <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
        {title}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          {highlight}
        </span>
      </h2>

      {description && (
        <p className="mt-5 text-gray-400 leading-7">
          {description}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080910] text-white selection:bg-purple-500/30">

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[500px] h-[500px] rounded-full bg-purple-700/15 blur-[140px]" />
        <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[30%] w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">

        {/* HERO */}
        <section className="min-h-[65vh] flex flex-col justify-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/20 bg-purple-400/5 px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs tracking-widest text-purple-200">
                DEVELOPER PORTFOLIO / ABOUT
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05]">
              Building
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                Digital
              </span>
              <br />
              Experiences.
            </h1>

            <p className="max-w-2xl mt-8 text-gray-400 text-base sm:text-xl leading-relaxed">
              I am a software development enthusiast focused on full-stack
              applications, business systems, backend engineering, and
              creative digital experiences.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setResumeOpen(true)}
                className="flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold shadow-lg shadow-purple-900/30"
              >
                <FileText size={18} />
                View Resume
                <ArrowUpRight size={17} />
              </motion.button>

              <a
                href="#projects"
                className="flex items-center gap-3 px-7 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                Explore Projects
                <ArrowDown size={17} />
              </a>
            </div>
          </motion.div>

          {/* Decorative terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-xl rounded-2xl border border-white/10 bg-[#10121c]/80 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-gray-500 font-mono">
                developer.profile
              </span>
            </div>

            <div className="p-5 font-mono text-xs sm:text-sm space-y-3">
              <p className="text-purple-400">$ whoami</p>
              <p className="text-gray-300">Software Developer / DX Student</p>

              <p className="text-purple-400">$ focus --areas</p>
              <p className="text-cyan-300">
                Full-Stack · Backend · ERP · Creative Tech
              </p>

              <p className="text-purple-400">$ status</p>
              <p className="text-green-400">
                Learning, building, and seeking opportunities...
              </p>
            </div>
          </motion.div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="py-24 scroll-mt-10">
          <SectionHeading
            eyebrow="01 / Capabilities"
            title="What I"
            highlight="Build."
            description="My primary areas of technical interest and development."
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {capabilities.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.035] p-7 hover:bg-white/[0.06] hover:border-purple-400/30 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorClasses[item.color]}`}>
                      <Icon size={22} />
                    </div>

                    <span className="font-mono text-xs text-gray-600">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-7 mt-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 scroll-mt-10">
          <SectionHeading
            eyebrow="02 / Selected Work"
            title="Things I"
            highlight="Create."
            description="A selection of development projects and experiments. Project status is shown explicitly rather than implying production deployment."
          />

          <div className="space-y-4">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isExpanded = expandedProject === index;

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedProject(isExpanded ? null : index)
                    }
                    aria-expanded={isExpanded}
                    className="w-full text-left p-6 sm:p-8 flex items-center gap-5 hover:bg-white/[0.04] transition"
                  >
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-300 shrink-0">
                      <Icon size={25} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-purple-300 mb-1">
                        {project.type}
                      </p>
                      <h3 className="text-lg sm:text-2xl font-bold">
                        {project.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2">
                        {project.status}
                      </p>
                    </div>

                    <ArrowUpRight
                      className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-45' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-7 border-t border-white/10 pt-5">
                          <p className="text-sm text-gray-400 leading-7">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {project.stack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-lg px-3 py-2 bg-purple-500/10 text-purple-200 text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section id="technology" className="py-24">
          <SectionHeading
            eyebrow="03 / Technology"
            title="My Technical"
            highlight="Toolkit."
            description="Technologies I have studied, used, or explored through development projects. This is not a claim of equal proficiency in every tool."
          />

          <div className="grid sm:grid-cols-2 gap-5">
            {technologies.map((group, index) => {
              const Icon = group.icon;

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="text-purple-400" size={22} />
                    <h3 className="font-bold text-lg">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-2 rounded-lg text-xs text-gray-300 bg-[#151725] border border-white/5 hover:border-purple-400/30 transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-24">
          <SectionHeading
            eyebrow="04 / Philosophy"
            title="How I"
            highlight="Think."
            description="Good software is not just about writing code. It is about solving problems with clear engineering decisions."
          />

          <div className="grid md:grid-cols-3 gap-5">
            {principles.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="p-7 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent"
                >
                  <Icon size={28} className="text-cyan-300 mb-6" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-7 mt-3">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="py-24">
          <SectionHeading
            eyebrow="05 / Journey"
            title="My Learning"
            highlight="Path."
            description="An overview of my education and ongoing development journey."
          />

          <div className="relative ml-3 sm:ml-5 border-l border-purple-400/30 space-y-10">
            {journey.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 sm:pl-12"
                >
                  <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#111321] border border-purple-400/50 flex items-center justify-center">
                    <Icon size={14} className="text-purple-300" />
                  </div>

                  <span className="text-xs font-mono text-purple-400">
                    {item.year}
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-7 mt-3 max-w-2xl">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section className="py-16">
          <div className="relative overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-900/30 via-[#171529] to-cyan-900/20 p-8 sm:p-14 text-center">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative">
              <Sparkles className="mx-auto text-purple-300 mb-6" size={35} />

              <h2 className="text-3xl sm:text-5xl font-black">
                Let's Build Something
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mt-2">
                  Meaningful.
                </span>
              </h2>

              <p className="max-w-xl mx-auto mt-6 text-gray-400 leading-7">
                Interested in software development, business technology,
                and opportunities to solve real-world problems through code.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-9">
                <button
                  onClick={() => setResumeOpen(true)}
                  className="px-7 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-semibold flex items-center gap-2"
                >
                  <FileText size={18} />
                  View Resume
                </button>

                <a
                  href="https://github.com/bikrams-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition flex items-center gap-2"
                >
                  <Github size={18} />
                  GitHub
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8 pb-4 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Developer Portfolio</p>
          <p>Designed & developed with Next.js and Framer Motion.</p>
        </footer>
      </div>

      {/* RESUME MODAL */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-3 sm:p-8 flex items-center justify-center"
            onClick={() => setResumeOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#11131c] border border-white/10 shadow-2xl"
            >
              <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-[#11131c]/95 backdrop-blur border-b border-white/10">
                <div>
                  <h3 className="font-bold">Resume / CV</h3>
                  <p className="text-xs text-gray-500">
                    Professional profile
                  </p>
                </div>

                <button
                  onClick={() => setResumeOpen(false)}
                  aria-label="Close resume"
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4 sm:p-8">
                <Resume />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
