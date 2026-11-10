"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, TouchEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bebas_Neue } from "next/font/google"
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

const AUTOPLAY_MS = 5000

const WAVE_BACK =
  "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 C1350,100 1550,20 1800,60 C2050,100 2250,20 2400,60 L2400,0 L0,0 Z"
const WAVE_FRONT =
  "M0,50 C200,10 400,90 600,50 C800,10 1000,90 1200,50 C1400,10 1600,90 1800,50 C2000,10 2200,90 2400,50 L2400,0 L0,0 Z"

type Skill = {
  name: string
  category: string
  status: string
  description: string
  code: string
  logo: string
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
    logo: "/logos/selenium.png",
    tone: "cyan",
  },
  {
    name: "C",
    category: "Programming Language",
    status: "Academic foundation",
    description:
      "A programming foundation I am building through coursework and problem-solving practice.",
    code: "LANG / 02",
    logo: "/logos/c.png",
    tone: "blue",
  },
  {
    name: "HTML",
    category: "Web Structure",
    status: "Practiced",
    description:
      "Worked with page structure, forms, IDs, classes, attributes, and nested elements while inspecting and testing web pages.",
    code: "WEB / 03",
    logo: "/logos/html.jpg",
    tone: "cyan",
  },
  {
    name: "Python",
    category: "Programming Language",
    status: "Learning",
    description:
      "A language I want to keep developing for general programming and scripting tasks.",
    code: "LANG / 04",
    logo: "/logos/python.png",
    tone: "blue",
  },
  {
    name: "Java",
    category: "Object-Oriented Programming",
    status: "Currently learning",
    description:
      "Learning object-oriented concepts, including classes, objects, constructors, references, and ArrayList.",
    code: "OOP / 05",
    logo: "/logos/java.jpg",
    tone: "red",
  },
  {
    name: "MySQL",
    category: "Database",
    status: "Academic foundation",
    description:
      "Database technology included in my technical skill set, with room to keep strengthening query-writing and database design.",
    code: "DATA / 06",
    logo: "/logos/mysql.png",
    tone: "blue",
  },
  {
    name: "JavaScript",
    category: "Programming Language",
    status: "Fundamentals practiced",
    description:
      "Practiced variables, functions, return values, conditions, arrays, objects, loops, callbacks, map, filter, and find.",
    code: "LANG / 07",
    logo: "/logos/javascript.png",
    tone: "cyan",
  },
  {
    name: "TypeScript",
    category: "Typed JavaScript",
    status: "Applied in practice",
    description:
      "Used with Node.js and Selenium WebDriver, including async/await, try/finally, element selection, waits, and assertions.",
    code: "LANG / 08",
    logo: "/logos/typescript.png",
    tone: "red",
  },
]

const toneClasses = {
  cyan: {
    tag: "border-cyan-200/50 text-cyan-100",
    stripe: "bg-cyan-200",
    glow: "shadow-[0_0_14px_rgba(103,232,249,0.7)]",
  },
  red: {
    tag: "border-rose-300/50 text-rose-100",
    stripe: "bg-[#ff304f]",
    glow: "shadow-[0_0_14px_rgba(255,48,79,0.7)]",
  },
  blue: {
    tag: "border-sky-200/50 text-sky-100",
    stripe: "bg-sky-300",
    glow: "shadow-[0_0_14px_rgba(125,211,252,0.7)]",
  },
}

const delay = (ms: number): CSSProperties =>
  ({ "--d": `${ms}ms` }) as CSSProperties

function LogoImage({ skill }: { skill: Skill }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={skill.logo}
      alt={`${skill.name} logo`}
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
      className="absolute inset-0 h-full w-full rounded-[22%] object-contain p-2 sm:p-3"
    />
  )
}

export default function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [hoverSide, setHoverSide] = useState<"prev" | "next" | null>(null)
  const touchStartX = useRef<number | null>(null)

  const skill = skills[activeSkill]
  const tone = toneClasses[skill.tone]
  const progress = ((activeSkill + 1) / skills.length) * 100

  const prevIndex = (activeSkill - 1 + skills.length) % skills.length
  const nextIndex = (activeSkill + 1) % skills.length
  const prevPreview = skills[prevIndex]
  const nextPreview = skills[nextIndex]

  const prevSkill = () => {
    setDirection("prev")
    setActiveSkill((current) => (current - 1 + skills.length) % skills.length)
  }

  const nextSkill = () => {
    setDirection("next")
    setActiveSkill((current) => (current + 1) % skills.length)
  }

  const goToSkill = (index: number) => {
    if (index === activeSkill) return

    setDirection(index > activeSkill ? "next" : "prev")
    setActiveSkill(index)
  }

  // Autoplay: timer restarts whenever the active skill changes.
  useEffect(() => {
    const id = setTimeout(() => {
      setDirection("next")
      setActiveSkill((current) => (current + 1) % skills.length)
    }, AUTOPLAY_MS)

    return () => clearTimeout(id)
  }, [activeSkill])

  // Keyboard navigation.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        playP3RSelect()
        prevSkill()
      } else if (e.key === "ArrowRight") {
        playP3RSelect()
        nextSkill()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Swipe handlers for mobile.
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return

    const diff = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null

    if (Math.abs(diff) < 50) return

    playP3RSelect()

    if (diff < 0) nextSkill()
    else prevSkill()
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#032b68] text-white">
      <style>{`
        @keyframes slideInNext {
          from { opacity: 0; transform: translateX(60px); filter: blur(6px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes slideInPrev {
          from { opacity: 0; transform: translateX(-60px); filter: blur(6px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes logoPop {
          from { opacity: 0; transform: scale(0.85) rotate(-3deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes textRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes waveShift {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .slide-in-next { animation: slideInNext 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .slide-in-prev { animation: slideInPrev 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .logo-pop { animation: logoPop 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .text-rise {
          animation: textRise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--d, 0ms);
        }
        .wave-front { animation: waveShift 18s linear infinite; }
        .wave-back { animation: waveShift 28s linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .slide-in-next, .slide-in-prev, .logo-pop, .text-rise,
          .wave-front, .wave-back {
            animation: none;
          }
        }
      `}</style>

      {/* Ocean background */}
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

      {/* Wave divider (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 overflow-hidden sm:h-28">
        <svg
          aria-hidden="true"
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="wave-back absolute left-0 top-0 h-full w-[200%] opacity-40"
        >
          <path d={WAVE_BACK} fill="#06265d" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="wave-front absolute left-0 top-0 h-[80%] w-[200%] opacity-80"
        >
          <path d={WAVE_FRONT} fill="#030816" />
        </svg>
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
            Back
          </Link>

          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
            <span>Ocean archive</span>
            <span className="text-white/30">/</span>
            <span>02 Pages</span>
          </div>
        </header>

        {/* Main panel */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative mt-6 flex flex-1 flex-col overflow-hidden border border-white/25 bg-slate-800/20 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:mt-8"
        >
          {/* Page title */}
          <section className="relative px-6 py-8 text-center sm:px-10 sm:py-10 md:px-14 lg:py-12">
            <div className="flex items-center justify-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-100/80 sm:text-xs">
              <span className="text-[#ff536a]">02</span>
              <span className="h-px w-10 bg-white/40" />
              <span>Character development</span>
            </div>

            <h1 className={`${bebas.className} mt-3 text-[clamp(4.5rem,11vw,9rem)] uppercase leading-[0.8] tracking-[-0.035em] text-white [text-shadow:0_5px_24px_rgba(0,0,0,0.25)] [-webkit-text-stroke:0.1px_white]`}>
              My <span className="text-cyan-200">Skills</span>
            </h1>

            <div className="mx-auto mt-5 flex max-w-2xl items-start justify-center gap-3">
              <span className="mt-1 h-10 w-1 shrink-0 bg-[#ff304f]" />
              <p className={`${bebas.className} max-w-xl text-center text-lg leading-relaxed tracking-wide text-white/90 sm:text-xl`}>
                The skills that I've been learning in the past few years.
                Still improving my skills, studying, and continuing to
                develop. One step at a time.
              </p>
            </div>
          </section>

          {/* Skills Carousel */}
          <section
            aria-label="Skills carousel"
            className="flex flex-1 items-center justify-center border-t border-white/15 px-6 py-8 sm:px-10 md:px-14"
          >
            <div
              key={skill.name}
              className={`grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 ${direction === "next" ? "slide-in-next" : "slide-in-prev"
                }`}
            >
              {/* Left: skill details */}
              <div className="order-2 md:order-1">
                <div className="text-rise flex items-center gap-3" style={delay(100)}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {skill.code}
                  </span>
                  <span className={`border px-3 py-1 font-mono text-[9px] uppercase tracking-widest ${tone.tag}`}>
                    {skill.status}
                  </span>
                </div>

                <p
                  className={`${bebas.className} text-rise mt-6 text-lg uppercase tracking-[0.2em] text-cyan-200/90`}
                  style={delay(180)}
                >
                  {skill.category}
                </p>

                <h2
                  className={`${bebas.className} text-rise mt-1 text-[clamp(3.5rem,9vw,6.5rem)] uppercase leading-[0.9] tracking-wide text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]`}
                  style={delay(250)}
                >
                  {skill.name}
                </h2>

                <p
                  className="text-rise mt-6 max-w-md text-sm leading-7 text-white/90 sm:text-base"
                  style={delay(340)}
                >
                  {skill.description}
                </p>
              </div>

              {/* Right: rounded logos without boxes */}
              <div className="order-1 flex flex-col items-center md:order-2">
                <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
                  {/* Previous logo */}
                  <button
                    type="button"
                    aria-label={`Show ${prevPreview.name}`}
                    onMouseEnter={() => {
                      playP3RHover()
                      setHoverSide("prev")
                    }}
                    onMouseLeave={() => setHoverSide(null)}
                    onClick={() => {
                      playP3RSelect()
                      prevSkill()
                    }}
                    className={`relative grid aspect-square w-14 shrink-0 place-items-center transition-all duration-300 sm:w-20 md:w-24 ${hoverSide === "prev"
                      ? "scale-100 opacity-90"
                      : "scale-90 opacity-35"
                      }`}
                  >
                    <LogoImage skill={prevPreview} />
                  </button>

                  {/* Current logo */}
                  <div className="logo-pop relative grid aspect-square w-32 shrink-0 place-items-center sm:w-44 md:w-52">
                    <LogoImage skill={skill} />
                  </div>

                  {/* Next logo */}
                  <button
                    type="button"
                    aria-label={`Show ${nextPreview.name}`}
                    onMouseEnter={() => {
                      playP3RHover()
                      setHoverSide("next")
                    }}
                    onMouseLeave={() => setHoverSide(null)}
                    onClick={() => {
                      playP3RSelect()
                      nextSkill()
                    }}
                    className={`relative grid aspect-square w-14 shrink-0 place-items-center transition-all duration-300 sm:w-20 md:w-24 ${hoverSide === "next"
                      ? "scale-100 opacity-90"
                      : "scale-90 opacity-35"
                      }`}
                  >
                    <LogoImage skill={nextPreview} />
                  </button>
                </div>

                {/* Navigation arrows */}
                <div className="mt-5 flex w-full max-w-[320px] items-center justify-between">
                  <button
                    type="button"
                    aria-label="Previous skill"
                    onMouseEnter={() => {
                      playP3RHover()
                      setHoverSide("prev")
                    }}
                    onMouseLeave={() => setHoverSide(null)}
                    onClick={() => {
                      playP3RSelect()
                      prevSkill()
                    }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-[#041d4c]/60 text-2xl text-white transition hover:-translate-x-0.5 hover:border-cyan-200 hover:bg-cyan-200/10 hover:text-cyan-100 active:scale-95"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    aria-label="Next skill"
                    onMouseEnter={() => {
                      playP3RHover()
                      setHoverSide("next")
                    }}
                    onMouseLeave={() => setHoverSide(null)}
                    onClick={() => {
                      playP3RSelect()
                      nextSkill()
                    }}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-[#041d4c]/60 text-2xl text-white transition hover:translate-x-0.5 hover:border-cyan-200 hover:bg-cyan-200/10 hover:text-cyan-100 active:scale-95"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Progress bar */}
          <div className="px-6 pb-5 pt-2 sm:px-10 md:px-14">
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
              <span>Skill Database</span>
              <span>
                {String(activeSkill + 1).padStart(2, "0")} /{" "}
                {String(skills.length).padStart(2, "0")}
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={skills.length}
              aria-valuenow={activeSkill + 1}
              className="relative h-1.5 w-full bg-white/20"
            >
              <div
                className={`absolute inset-y-0 left-0 transition-[width,background-color] duration-500 ease-out ${tone.stripe} ${tone.glow}`}
                style={{ width: `${progress}%` }}
              />

              <div className="absolute -inset-y-2 inset-x-0 flex">
                {skills.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    title={item.name}
                    aria-label={`Show ${item.name}`}
                    aria-current={activeSkill === index ? "true" : undefined}
                    onMouseEnter={() => playP3RHover()}
                    onClick={() => {
                      playP3RSelect()
                      goToSkill(index)
                    }}
                    className="h-full flex-1"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          ← → or swipe
        </p>

        {/* Inspirational quote */}
        <footer className="relative mt-8 border-t border-white/20 px-4 py-10 text-center sm:py-14">
          <div className="mx-auto mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-cyan-300/60" />
            <span className="h-2 w-2 rotate-45 border border-cyan-200 bg-cyan-300/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200">
              Confucius
            </span>
            <span className="h-2 w-2 rotate-45 border border-cyan-200 bg-cyan-300/30" />
            <span className="h-px w-10 bg-cyan-300/60" />
          </div>

          <blockquote className={`${bebas.className} mx-auto max-w-3xl text-3xl uppercase leading-tight tracking-wide text-white [text-shadow:0_0_20px_rgba(103,232,249,0.25)] sm:text-4xl lg:text-5xl`}>
            "It does not matter how slowly you go
            <span className="text-cyan-200"> as long as you do not stop.</span>"
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-cyan-200/50" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <span className="h-1 w-1 rounded-full bg-cyan-200/50" />
          </div>
        </footer>
      </div>
    </main>
  )
}