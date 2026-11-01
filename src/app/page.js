
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  Globe2,
  GraduationCap,
  Layers3,
  Menu,
  Monitor,
  Sparkles,
  X,
  Youtube,
  Facebook,
  ExternalLink,
  ChevronRight,
  Terminal,
  Keyboard,
  Languages,
  ShoppingBag,
  Github,
  Lightbulb,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const socialLinks = [
  {
    name: "YouTube",
    handle: "@jptjankar",
    href: "https://www.youtube.com/@jptjankar",
    icon: Youtube,
    color: "hover:text-red-400",
  },
  {
    name: "Facebook",
    handle: "Follow on Facebook",
    href: "https://www.facebook.com/share/1HP7hMUzq2/?mibextid=wwXIfr",
    icon: Facebook,
    color: "hover:text-blue-400",
  },
  {
    name: "TikTok",
    handle: "@dhurba..khadka",
    href: "https://www.tiktok.com/@dhurba..khadka?_t=ZS-8wqOS3DPNrj&_r=1",
    icon: Globe2,
    color: "hover:text-pink-400",
  },
];

const learningCards = [
  {
    number: "01",
    title: "Typing practice",
    description:
      "Build keyboard familiarity, improve accuracy, and practice typing at your own pace.",
    tags: ["Accuracy", "Speed", "Practice"],
    href: "/study",
    icon: Keyboard,
    accent: "blue",
  },
  {
    number: "02",
    title: "Programming",
    description:
      "Explore programming fundamentals, computational thinking, and practical coding exercises.",
    tags: ["Logic", "Code", "Projects"],
    href: "/study",
    icon: Code2,
    accent: "violet",
  },
  {
    number: "03",
    title: "Web development",
    description:
      "Learn web fundamentals through HTML, CSS, page structure, and responsive design.",
    tags: ["HTML", "CSS", "Web"],
    href: "/study",
    icon: Globe2,
    accent: "cyan",
  },
  {
    number: "04",
    title: "Computer hardware",
    description:
      "Understand the components that make computers work and how they fit together.",
    tags: ["CPU", "Memory", "Devices"],
    href: "/study",
    icon: Cpu,
    accent: "emerald",
  },
  {
    number: "05",
    title: "Japanese learning",
    description:
      "Explore Japanese language practice and the available JLPT learning materials.",
    tags: ["Japanese", "JLPT", "Language"],
    href: "/study",
    icon: Languages,
    accent: "rose",
  },
  {
    number: "06",
    title: "Software fundamentals",
    description:
      "Learn about operating systems, applications, development tools, and software concepts.",
    tags: ["Systems", "Apps", "Tools"],
    href: "/study",
    icon: Monitor,
    accent: "amber",
  },
];

const projects = [
  {
    name: "Korix ERP",
    category: "BUSINESS SOFTWARE",
    description:
      "An evolving business management platform focused on accounting, point of sale, and inventory workflows.",
    stack: ["Next.js", "FastAPI", "SQLAlchemy"],
    icon: Layers3,
    color: "from-blue-500/20 to-cyan-500/5",
    status: "In development",
  },
  {
    name: "Document Engine",
    category: "DOCUMENT AUTOMATION",
    description:
      "A document-generation project designed around structured data, user roles, and reusable workflows.",
    stack: ["Python", "FastAPI", "React"],
    icon: Terminal,
    color: "from-violet-500/20 to-fuchsia-500/5",
    status: "In development",
  },
  {
    name: "Study Hub",
    category: "LEARNING PLATFORM",
    description:
      "A learning workspace bringing technology subjects, programming practice, typing, and Japanese learning together.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    icon: GraduationCap,
    color: "from-emerald-500/20 to-teal-500/5",
    status: "Evolving",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function PrimaryLink({ href, children, external = false }) {
  const className =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300";

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#070b14] text-white">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-blue-600/[0.10] blur-[150px]" />
        <div className="absolute right-[-180px] top-[35%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.07] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

     

      {/* Hero */}
      <section id="home" className="relative scroll-mt-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 lg:px-10 lg:pb-28 lg:pt-28">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 text-xs text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              A personal space for technology and learning
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.1] tracking-[-0.045em] sm:text-6xl lg:text-[68px] xl:text-[78px]">
              Turn curiosity into
              <span className="mt-1 block bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 bg-clip-text pb-2 text-transparent">
                real capability.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
              Welcome to Bikram&apos;s Universe — a growing collection of
              learning resources, software projects, and technology
              experiments built around curiosity and practical skills.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryLink href="/study">
                <BookOpen size={17} />
                Start learning
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </PrimaryLink>

              <Link
                href="/product"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <ShoppingBag size={17} />
                Explore the shop
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-blue-400" />
                Practical learning
              </span>
              <span className="flex items-center gap-2">
                <Code2 size={15} className="text-violet-400" />
                Software projects
              </span>
              <span className="flex items-center gap-2">
                <Lightbulb size={15} className="text-amber-400" />
                Continuous exploration
              </span>
            </div>
          </div>

          {/* Visual code workspace */}
          <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-blue-500/[0.12] to-violet-500/[0.10] blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0b1220]/95 shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-xs text-slate-500">
                    learning-workspace.jsx
                  </span>
                </div>
                <Terminal size={16} className="text-slate-500" />
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                    <Code2 size={23} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Learn by doing
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Explore. Practice. Improve.
                    </p>
                  </div>
                </div>

                <div className="mt-7 space-y-3 font-mono text-xs leading-6 sm:text-sm">
                  <p className="text-slate-600">
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-blue-300">journey</span> = {"{"}
                  </p>
                  <p className="pl-5 text-slate-300">
                    curiosity: <span className="text-emerald-300">true</span>,
                  </p>
                  <p className="pl-5 text-slate-300">
                    learning: <span className="text-amber-300">&quot;continuous&quot;</span>,
                  </p>
                  <p className="pl-5 text-slate-300">
                    building: <span className="text-amber-300">&quot;practical&quot;</span>,
                  </p>
                  <p className="pl-5 text-slate-300">
                    improvement: <span className="text-emerald-300">ongoing</span>,
                  </p>
                  <p className="text-slate-600">{"}"}</p>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: Keyboard, label: "Typing", color: "text-blue-300" },
                    { icon: Code2, label: "Coding", color: "text-violet-300" },
                    { icon: Languages, label: "Languages", color: "text-emerald-300" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2 py-4"
                      >
                        <Icon size={21} className={item.color} />
                        <span className="text-[10px] text-slate-400 sm:text-xs">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.02] px-5 py-3">
                <span className="text-[10px] text-slate-500">
                  Personal learning & development
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-300">
                  <Zap size={12} />
                  Keep building
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-white/10 bg-[#111a2b] px-4 py-3 shadow-xl sm:flex lg:-left-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                <GraduationCap size={19} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Study Hub</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Learn at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning */}
      <section
        id="learning"
        className="relative scroll-mt-24 border-t border-white/[0.06] bg-white/[0.012] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Study Hub"
              title="Knowledge you can put to work."
              description="Explore practical learning modules for computer skills, programming, web development, and language study."
            />

            <Link
              href="/study"
              className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-blue-300 transition hover:text-blue-200 md:self-auto"
            >
              Explore all learning modules
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {learningCards.map((item) => {
              const Icon = item.icon;
              const accentClasses = {
                blue: "bg-blue-500/10 text-blue-300 border-blue-400/15",
                violet: "bg-violet-500/10 text-violet-300 border-violet-400/15",
                cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-400/15",
                emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-400/15",
                rose: "bg-rose-500/10 text-rose-300 border-rose-400/15",
                amber: "bg-amber-500/10 text-amber-300 border-amber-400/15",
              };

              return (
                <Link
                  href={item.href}
                  key={item.number}
                  className="group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1220] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#101a2d] sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accentClasses[item.accent]}`}
                    >
                      <Icon size={23} />
                    </div>
                    <span className="font-mono text-xs text-slate-600">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="text-xs font-medium text-slate-400 transition group-hover:text-blue-300">
                      Explore subject
                    </span>
                    <ArrowUpRight
                      size={17}
                      className="text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-300"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <SectionHeading
            eyebrow="Selected projects"
            title="Ideas turned into software."
            description="A look at software and learning projects being developed and refined through practical experimentation."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.name}
                  className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b111e] transition duration-300 hover:border-white/[0.16]"
                >
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${project.color}`}
                  >
                    <div className="absolute inset-0 opacity-30">
                      <div
                        className="h-full w-full"
                        style={{
                          backgroundImage:
                            "radial-gradient(rgba(148,163,184,.5) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                    </div>

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-[#0b1220]/80 shadow-2xl transition duration-300 group-hover:scale-105">
                      <Icon size={36} className="text-slate-200" />
                    </div>

                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-slate-300">
                      PROJECT 0{index + 1}
                    </span>

                    <span className="absolute bottom-4 right-4 rounded-full border border-amber-300/15 bg-amber-400/10 px-2.5 py-1 text-[10px] text-amber-200">
                      {project.status}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-blue-300">
                      {project.category}
                    </p>

                    <h3 className="mt-3 text-xl font-bold text-white">
                      {project.name}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-slate-400"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-slate-200">
                <Github size={22} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Explore the code
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Visit the GitHub profile to explore available repositories.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/bikrams-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 sm:mt-0"
            >
              View GitHub <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 border-y border-white/[0.06] bg-white/[0.015] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              eyebrow="About this space"
              title="Built around curiosity."
              description="Bikram's Universe brings learning resources, software development, and personal technology interests into one evolving online space."
            />

            <div className="mt-7">
              <PrimaryLink href="/study">
                Discover the learning hub <ArrowRight size={16} />
              </PrimaryLink>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                title: "Learn continuously",
                description:
                  "Explore subjects step by step and strengthen understanding through practice.",
              },
              {
                icon: Code2,
                title: "Build practical software",
                description:
                  "Develop applications and experiment with tools, frameworks, and workflows.",
              },
              {
                icon: Lightbulb,
                title: "Explore new ideas",
                description:
                  "Use curiosity to investigate technical concepts and possible solutions.",
              },
              {
                icon: Layers3,
                title: "Connect knowledge",
                description:
                  "Bring programming, business processes, and learning tools together.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0b111e] p-5 sm:p-6"
                >
                  <Icon size={22} className="text-blue-300" />
                  <h3 className="mt-5 text-sm font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section
        id="connect"
        className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
      >
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#142344] via-[#101a30] to-[#111323] p-7 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-500/[0.12] blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-violet-500/[0.10] blur-[100px]" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Stay connected</SectionLabel>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Follow the journey.
                <span className="mt-1 block text-blue-300">
                  See what comes next.
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Explore social channels for content, updates, and
                ongoing interests in technology and learning.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name}`}
                    title={social.handle}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:-translate-y-1 hover:bg-white/[0.08] ${social.color}`}
                  >
                    <Icon size={21} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.08] bg-[#060910]">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="#home" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  Bikram&apos;s Universe
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Learn · Build · Explore
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-500" aria-label="Footer navigation">
              <Link href="/study" className="transition hover:text-white">
                Study Hub
              </Link>
              <Link href="/product" className="transition hover:text-white">
                Shop
              </Link>
              <a href="#projects" className="transition hover:text-white">
                Projects
              </a>
              <a href="#connect" className="transition hover:text-white">
                Social links
              </a>
            </nav>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Bikram Khadka. All rights reserved.
            </p>
            <p>Built with curiosity and a commitment to learning.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
