"use client"

import Image from "next/image"
import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

type Skill = {
  name: string
  category: string
  status: string
  description: string
  code: string
  tone: "cyan" | "red" | "blue"
}

const skills: Skill[] = [
  {
    name: "Selenium",
    category: "Test Automation",
    status: "Hands-on practice",
    description:
      "Practiced browser automation with WebDriver: locating elements, handling waits, reading text, and testing login success or failure with assertions.",
    code: "QA / 01",
    tone: "cyan",
  },
  {
    name: "C",
    category: "Programming Language",
    status: "Academic foundation",
    description:
      "A programming foundation I am building through coursework and problem-solving practice.",
    code: "LANG / 02",
    tone: "blue",
  },
  {
    name: "HTML",
    category: "Web Structure",
    status: "Practiced",
    description:
      "Worked with page structure, forms, IDs, classes, attributes, and nested elements while inspecting and testing web pages.",
    code: "WEB / 03",
    tone: "cyan",
  },
  {
    name: "Python",
    category: "Programming Language",
    status: "Learning",
    description:
      "A language I want to keep developing for general programming and scripting tasks.",
    code: "LANG / 04",
    tone: "blue",
  },
  {
    name: "Java",
    category: "Object-Oriented Programming",
    status: "Currently learning",
    description:
      "Learning object-oriented concepts, including classes, objects, constructors, references, and ArrayList.",
    code: "OOP / 05",
    tone: "red",
  },
  {
    name: "MySQL",
    category: "Database",
    status: "Academic foundation",
    description:
      "Database technology included in my technical skill set, with room to keep strengthening query-writing and database design.",
    code: "DATA / 06",
    tone: "blue",
  },
  {
    name: "JavaScript",
    category: "Programming Language",
    status: "Fundamentals practiced",
    description:
      "Practiced variables, functions, return values, conditions, arrays, objects, loops, callbacks, map, filter, and find.",
    code: "LANG / 07",
    tone: "cyan",
  },
  {
    name: "TypeScript",
    category: "Typed JavaScript",
    status: "Applied in practice",
    description:
      "Used with Node.js and Selenium WebDriver, including async/await, try/finally, element selection, waits, and assertions.",
    code: "LANG / 08",
    tone: "red",
  },
]

const toneClasses = {
  cyan: {
    tag: "border-cyan-200/50 text-cyan-100",
    glow: "group-hover:border-cyan-200/80",
    stripe: "bg-cyan-200",
  },
  red: {
    tag: "border-rose-300/50 text-rose-100",
    glow: "group-hover:border-rose-300/90",
    stripe: "bg-[#ff304f]",
  },
  blue: {
    tag: "border-sky-200/50 text-sky-100",
    glow: "group-hover:border-sky-200/80",
    stripe: "bg-sky-300",
  },
}

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#032b68] text-white">
      {/* Ocean background — matches the main Hero theme */}
      <div className="fixed inset-0 -z-0 overflow-hidden">
        <Image
          src="/laut_gerak.gif"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-[80%_center]"
        />
        <div className="absolute inset-0 bg-[#005acb]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#031c50]/70 via-[#064da8]/45 to-[#01183f]/95" />
        <div className="absolute -left-24 top-[22%] h-72 w-72 rounded-full border border-cyan-100/10" />
        <div className="absolute -left-12 top-[25%] h-56 w-56 rounded-full border border-cyan-100/10" />
        <div className="absolute -right-28 bottom-[-7rem] h-[28rem] w-[28rem] rounded-full border border-cyan-100/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 py-6 sm:px-8 lg:px-14 lg:py-9">
        {/* Top navigation */}
        <header className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
          <Link
            href="/"
            onMouseEnter={() => playP3RHover()}
            onClick={() => playP3RSelect()}
            className="group inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 transition hover:text-white sm:text-xs"
          >
            <span className="grid h-9 w-9 place-items-center border border-white/40 text-lg transition group-hover:border-[#ff304f] group-hover:bg-[#ff304f]/20">
              ←
            </span>
            Back to main menu
          </Link>

          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
            <span>Ocean archive</span>
            <span className="text-white/30">/</span>
            <span>08 records</span>
          </div>
        </header>

        {/* Page title */}
        <section className="relative py-8 sm:py-10 lg:py-12">
          <div className="absolute right-0 top-8 hidden text-right font-mono text-[9px] uppercase leading-6 tracking-[0.2em] text-white/45 md:block">
            PERSONA FILE // 02
            <br />
            SKILL DATABASE
            <br />
            ACCESS GRANTED
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-100/80 sm:text-xs">
            <span className="text-[#ff536a]">02</span>
            <span className="h-px w-10 bg-white/40" />
            <span>Character development</span>
          </div>

          <h1 className={`${bebas.className} mt-3 text-[clamp(4.5rem,11vw,9rem)] uppercase leading-[0.8] tracking-[-0.035em] text-white [text-shadow:0_5px_24px_rgba(0,0,0,0.25)]`}>
            My <span className="text-cyan-200">Skills</span>
          </h1>

          <div className="mt-5 flex max-w-2xl items-start gap-3">
            <span className="mt-1 h-10 w-1 shrink-0 bg-[#ff304f]" />
            <p className="max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              A record of the tools and languages I have practiced, studied, and am still developing. One step at a time — always learning, always leveling up.
            </p>
          </div>
        </section>

        {/* Skills grid */}
        <section aria-label="Skills list" className="grid flex-1 grid-cols-1 gap-3 pb-8 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => {
            const tone = toneClasses[skill.tone]
            return (
              <article
                key={skill.name}
                onMouseEnter={() => playP3RHover()}
                className={`group relative flex min-h-[205px] flex-col overflow-hidden border border-white/25 bg-[#041d4c]/55 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[#06265d]/80 ${tone.glow}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-100/[0.07] via-transparent to-transparent opacity-60" />
                <div className={`absolute bottom-0 left-0 top-0 w-[3px] ${tone.stripe} opacity-60 transition group-hover:opacity-100`} />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                    {skill.code}
                  </span>
                  <span className="font-mono text-[10px] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-4">
                  <h2 className={`${bebas.className} text-4xl uppercase leading-none tracking-wide text-white transition group-hover:text-cyan-100`}>
                    {skill.name}
                  </h2>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-white/55">
                    {skill.category}
                  </p>
                </div>

                <p className="relative mt-4 flex-1 text-xs leading-5 text-white/75 sm:text-[13px]">
                  {skill.description}
                </p>

                <div className="relative mt-4 border-t border-white/15 pt-3">
                  <span className={`inline-flex border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${tone.tag}`}>
                    {skill.status}
                  </span>
                </div>
              </article>
            )
          })}
        </section>

        {/* Footer HUD */}
        <footer className="flex flex-col gap-3 border-t border-white/20 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>Skills archive // Oliver Martinez</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-[#ff304f]" />
            Progress is a journey, not a competition
          </span>
        </footer>
      </div>
    </main>
  )
}
