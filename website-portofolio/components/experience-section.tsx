"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const WAVE_BACK =
  "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 C1350,100 1550,20 1800,60 C2050,100 2250,20 2400,60 L2400,0 L0,0 Z";
const WAVE_FRONT =
  "M0,50 C200,10 400,90 600,50 C800,10 1000,90 1200,50 C1400,10 1600,90 1800,50 C2000,10 2200,90 2400,50 L2400,0 L0,0 Z";

type Experience = {
  title: string;
  organization: string;
  period: string;
  category: string;
  description: string;
  code: string;
  tone: "cyan" | "red" | "blue";
  image: string;
  link?: string;
};

const experiences: Experience[] = [
  {
    title: "Electus - AI Powered-ATS",
    organization: "Academic Project / Front-End Developer",
    period: "FLUTTER",
    category: "PROJECT",
    description:
      "Worked on the front end of an AI-powered Applicant Tracking System using Flutter, building the interface used to manage and review applicants.",
    code: "EXP / 01",
    tone: "cyan",
    image: "/electus.png",
    link: "https://github.com/OlanIsm/Electus-PROJECT",
  },
  {
    title: "Nerdius - RPG Quiz Game",
    organization: "Personal Project",
    period: "ON PROGRESS",
    category: "PROJECT",
    description:
      "An RPG-style quiz game where answering questions drives the gameplay. Currently still in development.",
    code: "EXP / 02",
    tone: "red",
    image: "/nerdius.jpeg",
    link: "https://github.com/OlanIsm/Nerdius",
  },
  {
    title: "V - Phone",
    organization: "Project",
    period: "COMING SOON",
    category: "PROJECT",
    description:
      "Details and repository link for this project will be available soon.",
    code: "EXP / 03",
    tone: "blue",
    image: "/vphone.png",
  },
  {
    title: "Genshin Import - Marketplace Genshin",
    organization: "Academic Project / Quality Assurance",
    period: "QA",
    category: "QA",
    description:
      "Checked whether the code matched the assignment requirements, cleaned up incorrect code, and fixed bugs as part of quality assurance.",
    code: "EXP / 04",
    tone: "cyan",
    image: "/genshin.jpeg",
    link: "https://github.com/olivermrtzz-hash/Genshin-Import",
  },
  {
    title: "Customer Service - Laundry",
    organization: "Laundry Service",
    period: "7 YEARS",
    category: "WORK EXPERIENCE",
    description:
      "7 years of experience receiving and handling customer orders, dealing with customers directly every day.",
    code: "EXP / 05",
    tone: "red",
    image: "/laundry.png",
  },
  {
    title:
      "The Effect of the Number of Hierarchical Elements in an LMS Interface in Task Completion Time and User Cognitive Load",
    organization: "Research Methodology",
    period: "A/B TESTING",
    category: "RESEARCH",
    description:
      "Built an LMS and ran an A/B test on two UI variants, using SUS and NASA-TLX to measure usability and cognitive load, plus a timer to record each subject's task completion time.",
    code: "EXP / 06",
    tone: "blue",
    image: "/rm.png",
    link: "https://docs.google.com/document/d/1pTSe92D4kLMHsbKOmHNz-xAHdV1i4IVVQH_EsrShKe4/edit?usp=sharing",
  },
  {
    title: "Public Speaking",
    organization: "Teach For Indonesia / SMA Budhi Dharma",
    period: "SPEAKER",
    category: "ACTIVITIES",
    description:
      "Gave a session with Teach For Indonesia at SMA Budhi Dharma about public speaking and effective ways to learn.",
    code: "EXP / 07",
    tone: "cyan",
    image: "/budhi.jpeg",
  },
];

const toneClasses = {
  cyan: {
    stripe: "bg-cyan-300",
    tag: "border-cyan-200/40 text-cyan-100",
    text: "text-cyan-200",
    corner: "border-cyan-300",
    gradient: "from-cyan-300/20",
    titleHover: "hover:text-cyan-200",
    activeBorder: "border-cyan-300",
    activeShadow: "shadow-[0_0_45px_rgba(103,232,249,0.35)]",
  },
  red: {
    stripe: "bg-[#ff304f]",
    tag: "border-[#ff304f]/50 text-[#ff8a9b]",
    text: "text-[#ff8a9b]",
    corner: "border-[#ff304f]",
    gradient: "from-[#ff304f]/20",
    titleHover: "hover:text-[#ff8a9b]",
    activeBorder: "border-[#ff304f]",
    activeShadow: "shadow-[0_0_45px_rgba(255,48,79,0.35)]",
  },
  blue: {
    stripe: "bg-blue-400",
    tag: "border-blue-300/40 text-blue-200",
    text: "text-blue-200",
    corner: "border-blue-400",
    gradient: "from-blue-400/20",
    titleHover: "hover:text-blue-200",
    activeBorder: "border-blue-400",
    activeShadow: "shadow-[0_0_45px_rgba(96,165,250,0.35)]",
  },
};

const total = experiences.length;

export default function ExperiencePage() {
  const [active, setActive] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);
  const lockRef = useRef(false);
  const touchRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      const next = Math.min(Math.max(active + dir, 0), total - 1);
      if (next === active) return;
      lockRef.current = true;
      setActive(next);
      playP3RHover();
      window.setTimeout(() => {
        lockRef.current = false;
      }, 650);
    },
    [active]
  );

  const jumpTo = (index: number) => {
    if (index === active) return;
    setActive(index);
    playP3RSelect();
  };

  // Mouse wheel
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 8) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = experiences[active];
  const currentTone = toneClasses[current.tone];
  const longTitle = current.title.length > 60;

  return (
    <main
      ref={mainRef}
      onTouchStart={(e) => {
        touchRef.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        if (touchRef.current === null) return;
        const diff = touchRef.current - e.changedTouches[0].clientY;
        if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
        touchRef.current = null;
      }}
      className="relative h-screen overflow-hidden bg-[#030816] text-[#e0f2fe] selection:bg-[#00e5ff] selection:text-[#030816]"
    >
      {/* Custom Animations */}
      <style>{`
        @keyframes expFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expFadeLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expInfoIn {
          from { opacity: 0; transform: translateX(70px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes expShimmer {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes expBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        @keyframes expNudge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes expWipeA {
          0% { transform: translateX(0); }
          100% { transform: translateX(105%); }
        }
        @keyframes expWipeB {
          0% { transform: translateX(0); }
          100% { transform: translateX(105%); }
        }
        @keyframes expWave {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .exp-fade-up { opacity: 0; animation: expFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .exp-fade-left { opacity: 0; animation: expFadeLeft 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .exp-info-in { opacity: 0; animation: expInfoIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .exp-shimmer { animation: expShimmer 2.8s linear infinite; }
        .exp-blink { animation: expBlink 1.4s ease-in-out infinite; }
        .exp-nudge { animation: expNudge 1.4s ease-in-out infinite; }
        .exp-wipe-a { animation: expWipeA 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.1s forwards; }
        .exp-wipe-b { animation: expWipeB 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.28s forwards; }
        .exp-wave-front { animation: expWave 18s linear infinite; }
        .exp-wave-back { animation: expWave 28s linear infinite reverse; }
        .exp-no-scrollbar { scrollbar-width: none; }
        .exp-no-scrollbar::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .exp-fade-up, .exp-fade-left, .exp-info-in { animation: none; opacity: 1; }
          .exp-shimmer, .exp-blink, .exp-nudge { animation: none; }
          .exp-wave-front, .exp-wave-back { animation: none; }
          .exp-wipe-a, .exp-wipe-b { display: none; }
        }
      `}</style>

      {/* Page Transition Wipe */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        <div className="exp-wipe-a absolute inset-0 bg-cyan-300" />
        <div className="exp-wipe-b absolute inset-0 bg-[#ff304f]" />
        <div
          className="exp-wipe-b absolute inset-0 bg-[#030816]"
          style={{ animationDelay: "0.42s" }}
        />
      </div>

      {/* Ocean Background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-[80%_center] bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/laut_gerak.gif')" }}
      />

      {/* Dark Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#030816]/60 via-[#030816]/80 to-[#030816]/95" />

      {/* Radial Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,229,255,0.12),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(255,48,79,0.10),transparent_50%)]" />

      {/* Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.07] [background-image:repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_4px)]" />

      {/* Vignette */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Wave divider (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 overflow-hidden sm:h-28">
        <svg
          aria-hidden="true"
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="exp-wave-back absolute left-0 top-0 h-full w-[200%] opacity-40"
        >
          <path d={WAVE_BACK} fill="#06265d" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 2400 120"
          preserveAspectRatio="none"
          className="exp-wave-front absolute left-0 top-0 h-[80%] w-[200%] opacity-80"
        >
          <path d={WAVE_FRONT} fill="#030816" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1600px] flex-col px-5 py-6 sm:px-8 lg:px-12">
        {/* Top Navigation */}
        <header
          style={{ animationDelay: "0.7s" }}
          className="exp-fade-left flex shrink-0 items-center justify-between border-b border-white/20 pb-4"
        >
          <Link
            href="/"
            onMouseEnter={() => playP3RHover()}
            onClick={() => playP3RSelect()}
            className={`${bebas.className} group flex items-center gap-3 text-xl tracking-wider text-white transition hover:text-cyan-200`}
          >
            <span className="h-3 w-3 rotate-45 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)] transition group-hover:bg-[#ff304f] group-hover:shadow-[0_0_12px_rgba(255,48,79,0.9)]" />
            OLIVER MARTINEZ
          </Link>

          <Link
            href="/"
            onMouseEnter={() => playP3RHover()}
            onClick={() => playP3RSelect()}
            className="group relative overflow-hidden border border-white/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/75 transition hover:border-cyan-200 hover:text-[#030816]"
          >
            <span className="absolute inset-0 -translate-x-full bg-cyan-200 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative">← Main Menu</span>
          </Link>
        </header>

        {/* Showcase */}
        <section
          aria-label="Experience showcase"
          className="flex min-h-0 flex-1 flex-col lg:flex-row"
        >
          {/* LEFT: Heading + Active Info */}
          <div className="relative flex min-h-0 flex-col justify-between py-4 lg:w-[42%] lg:py-8 lg:pr-10">
            <div className="min-h-0">
              {/* Heading */}
              <div
                style={{ animationDelay: "0.8s" }}
                className="exp-fade-left mb-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200/70"
              >
              </div>

              <h1
                style={{ animationDelay: "0.9s" }}
                className={`exp-fade-up relative ${bebas.className} text-[clamp(2.5rem,5.5vw,5rem)] uppercase leading-[0.85] tracking-[-0.025em] text-white [text-shadow:0_5px_24px_rgba(0,0,0,0.4)] [-webkit-text-stroke:1px_black]`}
              >
                My{" "}
                <span className="relative inline-block text-cyan-200 [text-shadow:0_0_30px_rgba(103,232,249,0.45)]">
                  Experience
                  <span className="absolute -bottom-1 left-0 h-[5px] w-full -skew-x-12 bg-[#ff304f]/90" />
                </span>
              </h1>

              {/* Active Info (re-animates every time active changes) */}
              <div
                key={active}
                className="exp-no-scrollbar relative mt-5 max-h-[38vh] overflow-y-auto lg:mt-8 lg:max-h-[46vh]"
              >
                <div
                  className={`${bebas.className} pointer-events-none absolute -left-2 -top-8 select-none text-[8rem] leading-none text-white/[0.05]`}
                >
                  {String(active + 1).padStart(2, "0")}
                </div>

                <div
                  style={{ animationDelay: "0s" }}
                  className="exp-info-in relative flex items-center gap-3"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                    {current.code}
                  </span>
                  <span
                    className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${currentTone.tag}`}
                  >
                    {current.category}
                  </span>
                </div>

                <div
                  style={{ animationDelay: "0.08s" }}
                  className="exp-info-in relative mt-3"
                >
                  {current.link ? (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playP3RHover()}
                      onClick={() => playP3RSelect()}
                      className={`group/title inline-flex items-start gap-2 text-white transition-all duration-300 hover:translate-x-1 ${currentTone.titleHover}`}
                    >
                      <h2
                        className={`${bebas.className} ${longTitle
                          ? "text-2xl sm:text-3xl"
                          : "text-3xl sm:text-4xl xl:text-5xl"
                          } uppercase leading-[1.02] tracking-wide bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] group-hover/title:bg-[length:100%_2px]`}
                      >
                        {current.title}
                      </h2>
                      <span
                        className={`${bebas.className} mt-1 -translate-x-2 translate-y-1 text-2xl opacity-0 transition-all duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:opacity-100 ${currentTone.text}`}
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <h2
                      className={`${bebas.className} ${longTitle
                        ? "text-2xl sm:text-3xl"
                        : "text-3xl sm:text-4xl xl:text-5xl"
                        } uppercase leading-[1.02] tracking-wide text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]`}
                    >
                      {current.title}
                    </h2>
                  )}
                </div>

                <p
                  style={{ animationDelay: "0.16s" }}
                  className="exp-info-in relative mt-2 font-mono text-[10px] uppercase tracking-wider text-white/60"
                >
                  {current.organization}
                </p>

                <div
                  style={{ animationDelay: "0.22s" }}
                  className="exp-info-in relative mt-4 flex items-start gap-3"
                >
                  <span
                    className={`mt-1 h-10 w-1 shrink-0 ${currentTone.stripe} shadow-[0_0_12px_currentColor]`}
                  />
                  <p className="max-w-md text-sm leading-6 text-white/80">
                    {current.description}
                  </p>
                </div>

                <div
                  style={{ animationDelay: "0.3s" }}
                  className="exp-info-in relative mt-4 flex items-center gap-4 border-t border-white/15 pt-3"
                >
                  <span
                    className={`${bebas.className} text-xl tracking-wider text-white/85`}
                  >
                    {current.period}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${currentTone.text} ${current.link ? "" : "opacity-60"
                      }`}
                  >
                    {current.link ? "▶ Hover title to open" : "— No link yet"}
                  </span>
                </div>
              </div>
            </div>

            {/* Index List */}
            <div
              style={{ animationDelay: "1.2s" }}
              className="exp-fade-up mt-4 hidden shrink-0 items-center gap-3 lg:flex"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                {experiences.map((exp, i) => (
                  <button
                    key={exp.code}
                    type="button"
                    aria-label={`Go to ${exp.title}`}
                    onMouseEnter={() => playP3RHover()}
                    onClick={() => jumpTo(i)}
                    className={`h-[3px] transition-all duration-500 ${i === active
                      ? `w-12 ${toneClasses[exp.tone].stripe}`
                      : "w-6 bg-white/25 hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: 3D Card Stack */}
          <div
            className="relative min-h-0 flex-1"
            style={{ perspective: "1800px", perspectiveOrigin: "30% 50%" }}
          >
            {experiences.map((experience, index) => {
              const tone = toneClasses[experience.tone];
              const offset = index - active;
              const isActive = offset === 0;
              const passed = offset < 0;
              const hidden = offset > 5;

              const transform = passed
                ? "translate3d(-190%, -50%, 0) rotateY(-12deg) scale(0.9)"
                : `translate3d(${offset * 30}%, ${-50 - offset * 7}%, ${-offset * 110
                }px) rotateY(-12deg) scale(${1 - offset * 0.05})`;

              const opacity = passed || hidden ? 0 : 1 - offset * 0.14;

              return (
                <button
                  key={experience.code}
                  type="button"
                  aria-label={`Show ${experience.title}`}
                  onClick={() => jumpTo(index)}
                  onMouseEnter={() => {
                    if (!passed && !isActive) playP3RHover();
                  }}
                  style={{
                    transform,
                    opacity,
                    zIndex: passed ? 0 : 50 - offset,
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                    pointerEvents: passed || hidden ? "none" : "auto",
                  }}
                  className={`absolute left-[6%] top-1/2 aspect-[3/4] h-[40vh] overflow-hidden border bg-[#041d4c]/70 text-left transition-[transform,opacity,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:left-[4%] lg:h-[66vh] ${isActive
                    ? `${tone.activeBorder} ${tone.activeShadow}`
                    : "border-white/20 hover:border-white/50"
                    }`}
                >
                  {/* Image */}
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    className={`object-cover transition duration-700 ${isActive
                      ? "scale-100 brightness-100 grayscale-0"
                      : "scale-105 brightness-50 grayscale-[40%]"
                      }`}
                  />

                  {/* Tone gradient */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone.gradient} via-transparent to-[#030816]/80`}
                  />

                  {/* Number */}
                  <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Top stripe */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[3px] ${tone.stripe} transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    {isActive && (
                      <div className="exp-shimmer absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                    )}
                  </div>

                  {/* Corner bracket */}
                  <span
                    className={`pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 ${tone.corner} transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                      }`}
                  />

                  {/* Period badge */}
                  <span
                    className={`absolute bottom-3 left-3 border bg-[#030816]/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm ${tone.tag}`}
                  >
                    {experience.period}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px w-full shrink-0 bg-white/20" />
      </div>
    </main>
  );
}