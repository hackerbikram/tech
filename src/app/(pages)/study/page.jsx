
'use client'

import React, { useMemo, useState, useEffect } from 'react'
import {
  Menu,
  X,
  Search,
  BookOpen,
  Code2,
  Keyboard,
  Cpu,
  Monitor,
  Languages,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  GraduationCap,
  LayoutDashboard,
  Clock3,
  Layers3,
  Sparkles,
  Globe,
  Laptop,
  BookMarked,
  Command,
  ArrowUpRight,
  Play,
  SearchX,
  PanelLeftClose,
  PanelLeftOpen,
  Target,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react'

import TypingPractice from '@/components/typo'
import HtmlCssPractice from '@/components/htmlcss'
import ProgrammingPractice from '@/components/programing'
import HardwareLearningLab from '@/components/hardwarestudy.jsx'
import JapaneseLearning from '@/components/jlpt.jsx'

// --------------------------------------------------
// COURSE CONFIGURATION
// --------------------------------------------------

const courseGroups = [
  {
    id: 'technologies',
    name: 'Technologies',
    description: 'Develop practical computer and software skills.',
    icon: Laptop,
    courses: [
      {
        id: 'hardware',
        name: 'Hardware',
        description: 'Understand computer components, architecture, and devices.',
        longDescription:
          'Explore how computers work internally. Learn about processors, memory, storage, motherboards, peripherals, and the components that make a computer function.',
        icon: Cpu,
        level: 'Beginner',
        duration: 'Self-paced',
        tags: ['Computer', 'Components', 'Hardware'],
        objectives: [
          'Understand the main internal computer components.',
          'Learn the purpose of CPU, RAM, storage, and motherboard.',
          'Identify common input and output devices.',
          'Understand how computer components work together.',
        ],
        component: HardwareLearningLab,
        available: true,
      },
      {
        id: 'software',
        name: 'Software',
        description: 'Learn operating systems, applications, and development tools.',
        longDescription:
          'Understand the different types of software, how operating systems work, and how applications and development tools fit into the software ecosystem.',
        icon: Monitor,
        level: 'Beginner',
        duration: 'Self-paced',
        tags: ['Operating Systems', 'Applications', 'Tools'],
        objectives: [
          'Understand system software and application software.',
          'Explore operating systems and utilities.',
          'Understand IDEs, compilers, and interpreters.',
          'Identify different categories of software.',
        ],
        component: SoftwareCourse,
        available: true,
      },
      {
        id: 'web-development',
        name: 'Web Development',
        description: 'Practice building websites using HTML and CSS.',
        longDescription:
          'Learn the fundamentals of website development, including document structure, semantic HTML, CSS styling, responsive layouts, and practical exercises.',
        icon: Globe,
        level: 'Beginner',
        duration: 'Self-paced',
        tags: ['HTML', 'CSS', 'Responsive Design'],
        objectives: [
          'Build structured web pages using HTML.',
          'Style web pages using CSS.',
          'Understand layouts, spacing, and responsive design.',
          'Practice creating real website interfaces.',
        ],
        component: HtmlCssPractice,
        available: true,
      },
      {
        id: 'programming',
        name: 'Programming',
        description: 'Develop logical thinking and programming fundamentals.',
        longDescription:
          'Start learning programming concepts through practical exercises. Develop your understanding of variables, conditions, loops, functions, and problem-solving.',
        icon: Code2,
        level: 'Beginner',
        duration: 'Self-paced',
        tags: ['Logic', 'Coding', 'Problem Solving'],
        objectives: [
          'Understand programming fundamentals.',
          'Learn variables, conditions, and loops.',
          'Understand functions and reusable code.',
          'Develop logical problem-solving skills.',
        ],
        component: ProgrammingPractice,
        available: true,
      },
      {
        id: 'typing',
        name: 'Typing Practice',
        description: 'Improve keyboard accuracy, speed, and typing technique.',
        longDescription:
          'Practice touch typing, keyboard familiarity, typing accuracy, and speed through interactive exercises. Focus on consistent technique rather than speed alone.',
        icon: Keyboard,
        level: 'Beginner',
        duration: 'Practice anytime',
        tags: ['Typing', 'Accuracy', 'Keyboard'],
        objectives: [
          'Learn correct finger placement.',
          'Improve typing accuracy.',
          'Practice without looking at the keyboard.',
          'Build consistent typing speed.',
        ],
        component: TypingPractice,
        available: true,
      },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    description: 'Improve communication and language skills.',
    icon: Languages,
    courses: [
      {
        id: 'japanese',
        name: 'Japanese',
        description: 'Study Japanese vocabulary, grammar, and JLPT preparation.',
        longDescription:
          'Develop Japanese language skills through structured learning and practice. Use the available Japanese learning module to study and reinforce your knowledge.',
        icon: Languages,
        level: 'Multi-level',
        duration: 'Self-paced',
        tags: ['Japanese', 'JLPT', 'Vocabulary'],
        objectives: [
          'Practice Japanese vocabulary.',
          'Improve grammar understanding.',
          'Strengthen reading comprehension.',
          'Prepare for Japanese language examinations.',
        ],
        component: JapaneseLearning,
        available: true,
      },
      {
        id: 'english',
        name: 'English',
        description: 'English vocabulary, grammar, reading, and communication.',
        icon: Globe,
        level: 'Coming soon',
        duration: 'Not available',
        tags: ['Grammar', 'Vocabulary', 'Speaking'],
        objectives: [],
        available: false,
      },
      {
        id: 'nepali',
        name: 'Nepali',
        description: 'Nepali language learning and writing practice.',
        icon: BookOpen,
        level: 'Coming soon',
        duration: 'Not available',
        tags: ['Reading', 'Writing', 'Language'],
        objectives: [],
        available: false,
      },
    ],
  },
]

// --------------------------------------------------
// SMALL UTILITIES
// --------------------------------------------------

function SoftwareCourse() {
  const softwareTypes = [
    {
      title: 'System Software',
      description:
        'Software that manages computer hardware and provides a platform for applications.',
      examples: ['Operating systems', 'Device drivers', 'System utilities'],
      icon: Cpu,
    },
    {
      title: 'Application Software',
      description:
        'Programs designed to help users perform specific tasks.',
      examples: ['Web browsers', 'Office applications', 'Media editors'],
      icon: Monitor,
    },
    {
      title: 'Development Software',
      description:
        'Tools used to create, test, debug, and maintain software applications.',
      examples: ['Code editors', 'Compilers', 'IDEs', 'Debuggers'],
      icon: Code2,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
          <BookOpen size={16} />
          SOFTWARE FUNDAMENTALS
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Understanding Computer Software
        </h2>

        <p className="text-slate-400 mt-3 leading-7 max-w-3xl">
          Computer software is a collection of programs and instructions
          that tell a computer what to do. Software works with hardware
          to perform useful tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {softwareTypes.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-blue-400/40 hover:bg-white/[0.05] transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                <Icon size={22} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-sm leading-6 text-slate-400 mt-2">
                {item.description}
              </p>

              <div className="mt-5 space-y-2">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  Examples
                </p>

                {item.examples.map((example) => (
                  <div
                    key={example}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {example}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-5">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-blue-400" size={21} />
          <h3 className="font-semibold text-white">Remember</h3>
        </div>

        <p className="text-sm text-slate-400 leading-7 mt-3">
          Hardware refers to the physical components of a computer.
          Software refers to the instructions and programs that run
          on those components. Both are necessary for a functioning
          computer system.
        </p>
      </div>
    </div>
  )
}

function CourseCard({ course, onClick }) {
  const Icon = course.icon

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!course.available}
      className={`group text-left rounded-2xl border p-5 transition-all duration-300 ${
        course.available
          ? 'border-white/10 bg-white/[0.035] hover:border-blue-400/40 hover:bg-blue-500/[0.05] hover:-translate-y-1'
          : 'border-white/5 bg-white/[0.015] opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Icon size={23} />
        </div>

        <span
          className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 ${
            course.available
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-slate-700/50 text-slate-400'
          }`}
        >
          {course.available ? 'Available' : 'Coming soon'}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mt-5">
        {course.name}
      </h3>

      <p className="text-sm text-slate-400 leading-6 mt-2 min-h-[48px]">
        {course.description}
      </p>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
        <span className="text-xs text-slate-500">
          {course.level}
        </span>

        <span className="text-sm text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
          {course.available ? 'Start learning' : 'Unavailable'}
          {course.available && <ArrowUpRight size={15} />}
        </span>
      </div>
    </button>
  )
}

// --------------------------------------------------
// MAIN PAGE
// --------------------------------------------------

export default function StudyPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeGroup, setActiveGroup] = useState('technologies')
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [search, setSearch] = useState('')

  const allCourses = useMemo(
    () => courseGroups.flatMap((group) =>
      group.courses.map((course) => ({
        ...course,
        groupName: group.name,
        groupId: group.id,
      }))
    ),
    []
  )

  const currentCourse = allCourses.find(
    (course) => course.id === selectedCourse
  )

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return allCourses

    return allCourses.filter((course) =>
      [
        course.name,
        course.description,
        course.groupName,
        ...course.tags,
      ].some((value) => value.toLowerCase().includes(term))
    )
  }, [allCourses, search])

  const availableCount = allCourses.filter(
    (course) => course.available
  ).length

  const openCourse = (course) => {
    if (!course.available) return

    setSelectedCourse(course.id)
    setActiveGroup(course.groupId)
    setMenuOpen(false)
    setSearch('')
  }

  const goHome = () => {
    setSelectedCourse(null)
    setMenuOpen(false)
    setSearch('')
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#080d18] text-white selection:bg-blue-500/30">
      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 left-1/3 w-[600px] h-[600px] bg-blue-600/[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-indigo-600/[0.05] blur-[140px] rounded-full" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 h-[68px] border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl">
        <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-300"
            >
              <Menu size={21} />
            </button>

            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-3 text-left min-w-0"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap size={23} />
              </div>

              <div className="min-w-0">
                <h1 className="font-bold text-[17px] tracking-tight">
                  Study<span className="text-blue-400">Hub</span>
                </h1>
                <p className="text-[10px] text-slate-500 tracking-[0.16em] uppercase">
                  Learning workspace
                </p>
              </div>
            </button>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedCourse(null)
              }}
              placeholder="Search courses, topics..."
              className="w-full h-10 rounded-xl bg-white/[0.045] border border-white/[0.08] pl-11 pr-4 text-sm outline-none focus:border-blue-500/50 focus:bg-white/[0.07] placeholder:text-slate-600 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400">Learning mode</span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-sm font-bold">
              S
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-68px)]">
        {/* MOBILE BACKDROP */}
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation backdrop"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[68px] z-40 bg-black/65 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed lg:sticky top-[68px] left-0 z-50 lg:z-20
            h-[calc(100dvh-68px)] lg:h-[calc(100vh-68px)]
            w-[290px] shrink-0
            bg-[#0c1423] lg:bg-[#0a1120]
            border-r border-white/[0.07]
            flex flex-col
            transition-all duration-300
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            ${sidebarCollapsed ? 'lg:w-[82px]' : 'lg:w-[270px]'}
          `}
        >
          {/* SIDEBAR HEADER */}
          <div className="p-5 flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.17em] uppercase text-slate-500">
                  Workspace
                </p>
                <p className="text-sm font-semibold mt-1 text-slate-200">
                  My Learning
                </p>
              </div>
            )}

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label="Toggle sidebar width"
                className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/10"
              >
                {sidebarCollapsed
                  ? <PanelLeftOpen size={17} />
                  : <PanelLeftClose size={17} />}
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* DASHBOARD BUTTON */}
          <div className="px-3">
            <button
              type="button"
              onClick={goHome}
              title="Dashboard"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${
                !selectedCourse
                  ? 'bg-blue-500/15 text-blue-300 border border-blue-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <LayoutDashboard size={19} />
              {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
            </button>
          </div>

          {/* NAVIGATION */}
          <div className="flex-1 overflow-y-auto px-3 py-7 space-y-7">
            {courseGroups.map((group) => {
              const GroupIcon = group.icon
              const expanded = activeGroup === group.id

              return (
                <div key={group.id}>
                  <button
                    type="button"
                    title={group.name}
                    onClick={() => setActiveGroup(expanded ? '' : group.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
                      expanded ? 'text-slate-200' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <GroupIcon size={17} />
                      {!sidebarCollapsed && group.name}
                    </span>

                    {!sidebarCollapsed && (
                      expanded
                        ? <ChevronDown size={15} />
                        : <ChevronRight size={15} />
                    )}
                  </button>

                  {expanded && !sidebarCollapsed && (
                    <div className="mt-2 ml-3 pl-3 border-l border-white/10 space-y-1">
                      {group.courses.map((course) => {
                        const Icon = course.icon
                        const active = selectedCourse === course.id

                        return (
                          <button
                            key={course.id}
                            type="button"
                            disabled={!course.available}
                            onClick={() => openCourse(course)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                              active
                                ? 'bg-blue-500/15 text-blue-300'
                                : course.available
                                  ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                                  : 'text-slate-600 cursor-not-allowed'
                            }`}
                          >
                            <Icon size={16} className="shrink-0" />

                            <span className="flex-1 truncate">
                              {course.name}
                            </span>

                            {!course.available && (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                            )}

                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* SIDEBAR FOOTER */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-white/[0.07]">
              <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-400/10 p-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <Sparkles size={16} />
                  <span className="text-xs font-semibold">Keep learning</span>
                </div>

                <p className="text-xs text-slate-400 leading-5 mt-2">
                  Consistent practice is the foundation of improvement.
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* MAIN WORKSPACE */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <div className="max-w-[1500px] mx-auto">

            {/* SEARCH ON MOBILE */}
            <div className="md:hidden relative mb-7">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setSelectedCourse(null)
                }}
                placeholder="Search courses..."
                className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 pl-11 pr-4 text-sm outline-none focus:border-blue-500/50"
              />
            </div>

            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-7">
              <button
                type="button"
                onClick={goHome}
                className="hover:text-white transition-colors"
              >
                Study Hub
              </button>

              <ChevronRight size={13} />

              <span className={currentCourse ? '' : 'text-blue-400'}>
                {currentCourse ? currentCourse.groupName : 'Dashboard'}
              </span>

              {currentCourse && (
                <>
                  <ChevronRight size={13} />
                  <span className="text-blue-400 truncate">
                    {currentCourse.name}
                  </span>
                </>
              )}
            </div>

            {/* COURSE WORKSPACE */}
            {currentCourse ? (
              <CourseWorkspace
                course={currentCourse}
                onBack={goHome}
              />
            ) : search.trim() ? (
              <div className="space-y-7">
                <div>
                  <p className="text-xs text-blue-400 uppercase tracking-[0.15em] font-semibold">
                    Search results
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    Find your next lesson
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    {filteredCourses.length} result(s) found for "{search}"
                  </p>
                </div>

                {filteredCourses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        onClick={() => openCourse(course)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center text-center">
                    <SearchX size={42} className="text-slate-600" />
                    <h3 className="font-semibold mt-4">No courses found</h3>
                    <p className="text-sm text-slate-500 mt-2">
                      Try searching with another keyword.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      className="mt-5 text-sm text-blue-400 hover:text-blue-300"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Dashboard
                allCourses={allCourses}
                availableCount={availableCount}
                onOpenCourse={openCourse}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// --------------------------------------------------
// DASHBOARD
// --------------------------------------------------

function Dashboard({ allCourses, availableCount, onOpenCourse }) {
  const technologies = courseGroups.find(
    (group) => group.id === 'technologies'
  )

  const languages = courseGroups.find(
    (group) => group.id === 'languages'
  )

  return (
    <div className="space-y-10">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-400/15 bg-gradient-to-br from-[#14264b] via-[#111d37] to-[#101827] p-6 sm:p-9 lg:p-11">
        <div className="absolute -right-16 -top-24 w-80 h-80 rounded-full border border-blue-300/[0.08]" />
        <div className="absolute -right-4 -top-12 w-60 h-60 rounded-full border border-blue-300/[0.08]" />

        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 text-xs text-blue-200">
            <Sparkles size={14} />
            Your personal learning space
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mt-6">
            Learn something.
            <br />
            <span className="text-blue-300">Build something.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300/80 leading-7 mt-5 max-w-xl">
            Explore technology, practice programming, improve your
            typing skills, and develop language knowledge through
            interactive learning modules.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-7">
            <button
              type="button"
              onClick={() => onOpenCourse(allCourses.find(
                (course) => course.id === 'typing'
              ))}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-5 py-3 text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
            >
              <Play size={16} fill="currentColor" />
              Start typing practice
            </button>

            <span className="text-xs text-slate-400 flex items-center gap-2">
              <BookOpen size={15} />
              Explore available courses
            </span>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-14 bottom-10 w-40 h-40 rounded-[32px] border border-blue-300/15 bg-blue-300/[0.04] rotate-12 items-center justify-center">
          <GraduationCap
            size={76}
            className="text-blue-200/60 -rotate-12"
          />
        </div>
      </section>

      {/* OVERVIEW STATS */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={BookOpen}
          label="Total courses"
          value={allCourses.length}
          description="Available in Study Hub"
        />

        <StatCard
          icon={ShieldCheck}
          label="Available courses"
          value={availableCount}
          description="Ready to explore"
        />

        <StatCard
          icon={Layers3}
          label="Categories"
          value={courseGroups.length}
          description="Learning areas"
        />

        <StatCard
          icon={Clock3}
          label="Learning pace"
          value="Flexible"
          description="Study at your own pace"
        />
      </section>

      {/* COURSE SECTIONS */}
      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-blue-400 font-semibold">
              Explore
            </p>
            <h2 className="text-2xl font-bold mt-2">
              Learning categories
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Choose a subject and start learning.
            </p>
          </div>
        </div>

        <CourseGroup
          group={technologies}
          onOpenCourse={onOpenCourse}
        />

        <CourseGroup
          group={languages}
          onOpenCourse={onOpenCourse}
        />
      </section>

      {/* LEARNING TIPS */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Target size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-white">Effective learning</h3>
            <p className="text-xs text-slate-500 mt-1">
              A practical approach to studying
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-7">
          {[
            {
              title: 'Practice consistently',
              text: 'Short, regular learning sessions can help you retain information.',
            },
            {
              title: 'Build practical projects',
              text: 'Apply what you learn through exercises and real-world tasks.',
            },
            {
              title: 'Review your mistakes',
              text: 'Understand errors and correct them instead of simply repeating exercises.',
            },
          ].map((item, index) => (
            <div key={item.title} className="flex gap-3">
              <span className="text-sm font-bold text-blue-400">
                0{index + 1}
              </span>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">
                  {item.title}
                </h4>
                <p className="text-xs leading-6 text-slate-500 mt-2">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// --------------------------------------------------
// COURSE GROUP
// --------------------------------------------------

function CourseGroup({ group, onOpenCourse }) {
  const Icon = group.icon

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Icon size={20} />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{group.name}</h3>
          <p className="text-xs text-slate-500 mt-1">
            {group.description}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {group.courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={() => onOpenCourse({
              ...course,
              groupId: group.id,
              groupName: group.name,
            })}
          />
        ))}
      </div>
    </div>
  )
}

// --------------------------------------------------
// STAT CARD
// --------------------------------------------------

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">{label}</span>

        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Icon size={17} />
        </div>
      </div>

      <p className="text-2xl sm:text-3xl font-bold mt-3 text-white">
        {value}
      </p>

      <p className="text-[11px] text-slate-500 mt-1">
        {description}
      </p>
    </div>
  )
}

// --------------------------------------------------
// COURSE WORKSPACE
// --------------------------------------------------

function CourseWorkspace({ course, onBack }) {
  const Icon = course.icon
  const LearningComponent = course.component

  return (
    <div className="space-y-7">

      {/* COURSE HEADER */}
      <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111d35] to-[#101827] p-5 sm:p-7">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Back to dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-300 border border-blue-400/15 flex items-center justify-center shrink-0">
            <Icon size={27} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-300 bg-blue-400/10 px-2.5 py-1 rounded-full">
                {course.groupName}
              </span>

              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                Available
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {course.name}
            </h2>

            <p className="text-sm text-slate-400 leading-7 mt-3 max-w-3xl">
              {course.longDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING OBJECTIVES */}
      {course.objectives?.length > 0 && (
        <section className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-5">
            <Target size={19} className="text-blue-400" />
            <h3 className="font-semibold text-white">
              Learning objectives
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {course.objectives.map((objective, index) => (
              <div
                key={objective}
                className="flex items-start gap-3 text-sm text-slate-400 leading-6"
              >
                <span className="w-6 h-6 shrink-0 rounded-lg bg-blue-500/10 text-blue-300 flex items-center justify-center text-[11px] font-semibold">
                  {index + 1}
                </span>

                {objective}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACTUAL LEARNING MODULE */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-[10px] text-blue-400 font-bold tracking-[0.15em] uppercase">
              Learning environment
            </p>

            <h3 className="text-xl font-bold mt-1">
              Start practicing
            </h3>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <Sparkles size={15} className="text-blue-400" />
            Interactive module
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1524] p-4 sm:p-6 lg:p-8 min-w-0 overflow-hidden">
          {LearningComponent ? (
            <LearningComponent />
          ) : (
            <div className="text-slate-400 text-sm">
              This learning module is not available.
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
        <span className="text-xs text-slate-500">
          Study Hub · {course.name}
        </span>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300"
        >
          Browse other courses
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  )
}
