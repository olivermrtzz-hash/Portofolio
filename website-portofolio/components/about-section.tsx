"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bebas_Neue } from "next/font/google";
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const bb = bebas.className;

/* ---------- DATA (edit di sini) ---------- */
const profile = {
  firstName: "OLIVER",
  lastName: "MARTINEZ",
  role: "Mahasiswa Sem 5",
  university: "Bina Nusantara University",
  location: "Jakarta, Indonesia",
  focus: "Mobile & Web Development",
  image: "/mukagwe.jpeg",
  descriptions: [
    "Aku adalah mahasiswa semester 5 yang suka bikin aplikasi, mulai dari mobile, frontend, backend. Aku senang belajar hal baru dan ngerjain proyek bareng teman. Selain ngoding, aku juga punya pengalaman di riset, QA, public speaking, dan customer service. Harapan ku untuk bisa bekerja bersama perusahaan demi mendapat pengalaman baru",
  ],
};

const skills = ["Flutter", "NestJS", "Node.js", "Express", "MySQL", "QA Testing", "UX Research", "Public Speaking"];

const stats = [
  { label: "Projects", value: 4, suffix: "" },
  { label: "Years in Service", value: 7, suffix: "+" },
  { label: "Research", value: 1, suffix: "" },
  { label: "Semester", value: 5, suffix: "" },
];

const infoRows = [
  ["Status", profile.role],
  ["University", profile.university],
  ["Location", profile.location],
  ["Focus", profile.focus],
];

/* [left %, ukuran, durasi, delay] */
const bubbles = [
  [6, 10, 14, 0], [14, 18, 18, 3], [27, 8, 12, 6], [38, 14, 16, 1], [52, 22, 20, 8],
  [63, 9, 13, 4], [74, 16, 17, 2], [86, 11, 15, 7], [94, 20, 19, 5],
];

/* Hujan: posisi, delay, kecepatan, panjang (deterministik) */
const rain = Array.from({ length: 70 }, (_, i) => ({
  l: (i * 37) % 100,
  d: ((i * 13) % 20) / 10,
  t: 0.6 + ((i * 7) % 5) / 10,
  h: 40 + ((i * 11) % 50),
}));

const ripples = [12, 28, 45, 60, 77, 90];

const W_TOP1 = "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 C1350,100 1550,20 1800,60 C2050,100 2250,20 2400,60 L2400,0 L0,0 Z";
const W_TOP2 = "M0,50 C200,10 400,90 600,50 C800,10 1000,90 1200,50 C1400,10 1600,90 1800,50 C2000,10 2200,90 2400,50 L2400,0 L0,0 Z";
const W_RAIN = "M0,25 C150,45 350,5 600,25 C850,45 1050,5 1200,25 C1350,45 1550,5 1800,25 C2050,45 2250,5 2400,25 L2400,50 L0,50 Z";

/* ---------- HELPERS ---------- */
const v = (s: Record<string, string | number>) => s as CSSProperties;
const rv = (d: number, o: Record<string, string | number> = {}) => v({ "--d": `${d}s`, ...o });

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return val;
}

function Wave({ d, h, fill, className }: { d: string; h: number; fill: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox={`0 0 2400 ${h}`} preserveAspectRatio="none" className={className}>
      <path d={d} fill={fill} />
    </svg>
  );
}

function StatItem({ label, value, suffix, start, delay }: (typeof stats)[number] & { start: boolean; delay: number }) {
  const count = useCountUp(value, start);

  return (
    <div
      style={rv(delay)}
      className="ab-r group relative border border-white/15 bg-[#041d4c]/40 px-4 py-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60 hover:bg-[#06265d]/60"
    >
      <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-cyan-300 transition-transform duration-500 group-hover:scale-y-100" />
      <div className={`${bb} text-4xl leading-none text-white`}>
        {count}
        <span className="text-cyan-200">{suffix}</span>
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">{label}</div>
    </div>
  );
}

/* ---------- MAIN ---------- */
export default function AboutSection() {
  const { ref, inView } = useInView<HTMLElement>();
  const tilt = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [pour, setPour] = useState(true);

  // Loading hujan: 3s sampai penuh, 3.8s overlay dilepas
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      setPour(false);
      return;
    }
    const a = window.setTimeout(() => setReady(true), 3000);
    const b = window.setTimeout(() => setPour(false), 3800);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  const show = inView && ready;
  const pct = useCountUp(100, pour, 2600);

  const tiltTo = (x: number, y: number) => {
    if (tilt.current) tilt.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };

  return (
    <section
      ref={ref}
      id="about"
      className={`ab-sec relative min-h-screen overflow-hidden bg-[#030816] text-[#e0f2fe] selection:bg-[#00e5ff] selection:text-[#030816] ${show ? "ab-in" : ""}`}
    >
      <style>{`
        @keyframes abWave { to { transform: translateX(-50%); } }
        @keyframes abRise {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.7; }
          50% { transform: translate(14px, -55vh); }
          100% { transform: translate(-10px, -120vh); opacity: 0; }
        }
        @keyframes abRipple {
          0% { transform: scale(0.85); opacity: 0.55; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes abFloat { 50% { transform: translateY(-8px); } }
        @keyframes abCaustic {
          0%, 100% { transform: none; opacity: 0.5; }
          50% { transform: translate(40px, 20px) scale(1.15); opacity: 0.8; }
        }
        @keyframes abBlink { 50% { opacity: 0.25; } }

        /* Reveal serbaguna (atur lewat --x --y --sx --sy --b --d) */
        @keyframes abIn {
          from {
            opacity: 0;
            filter: blur(var(--b, 10px));
            transform: translate(var(--x, 0), var(--y, 40px)) scale(var(--sx, 1), var(--sy, 1));
          }
        }
        @keyframes abClip { from { clip-path: inset(0 100% 0 0); } }

        /* Loading hujan */
        @keyframes abRain { to { transform: translateY(130vh); } }
        @keyframes abFill { from { transform: translateY(calc(100% + 40px)); } }
        @keyframes abRip {
          from { transform: translateX(-50%) scale(0.2); opacity: 0.9; }
          to { transform: translateX(-50%) scale(1); opacity: 0; }
        }
        @keyframes abOut { to { opacity: 0; visibility: hidden; } }

        .ab-r { opacity: 0; }
        .ab-in .ab-r {
          opacity: 1;
          animation: abIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) backwards;
        }
        .ab-photo { clip-path: inset(0 100% 0 0); }
        .ab-in .ab-photo {
          clip-path: inset(-60px);
          animation: abClip 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.2s backwards;
        }

        .ab-pour { animation: abOut 0.8s ease-in 2.9s forwards; }
        .ab-fill { animation: abFill 2.4s cubic-bezier(0.45, 0.05, 0.35, 1) 0.4s both; }
        .ab-drop {
          position: absolute;
          top: -120px;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(to bottom, transparent, rgba(190, 240, 255, 0.85));
          animation: abRain linear infinite;
        }
        .ab-rip { animation: abRip 1.1s ease-out infinite; }

        .ab-w1 { animation: abWave 18s linear infinite; }
        .ab-w2 { animation: abWave 28s linear infinite reverse; }
        .ab-wf { animation: abWave 2.4s linear infinite; }
        .ab-bubble { animation: abRise linear infinite; }
        .ab-ripple { animation: abRipple 3.6s ease-out infinite; }
        .ab-float { animation: abFloat 5s ease-in-out infinite; }
        .ab-caustic { animation: abCaustic 9s ease-in-out infinite; }
        .ab-blink { animation: abBlink 1.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ab-sec * { animation: none !important; }
          .ab-pour { display: none; }
        }
      `}</style>

      {/* LOADING: hujan sampai layar penuh air */}
      {pour && (
        <div
          aria-hidden="true"
          className="ab-pour fixed inset-0 z-[60] overflow-hidden bg-gradient-to-b from-[#04204f] to-[#030816]"
        >
          <div className="ab-fill absolute inset-0 z-[2]">
            <Wave d={W_RAIN} h={50} fill="#1494ea" className="ab-wf absolute bottom-full left-0 h-[50px] w-[200%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1494ea] via-[#0a56b5] to-[#04204f]" />
            {ripples.map((x, i) => (
              <span
                key={x}
                className="ab-rip absolute bottom-[calc(100%-6px)] h-3 w-16 rounded-full border border-cyan-100/80"
                style={v({ left: `${x}%`, animationDelay: `${i * 0.35}s` })}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute -inset-[20%] z-[3] rotate-[10deg]">
            {rain.map((r, i) => (
              <i
                key={i}
                className="ab-drop"
                style={v({ left: `${r.l}%`, height: r.h, animationDuration: `${r.t}s`, animationDelay: `${r.d}s` })}
              />
            ))}
          </div>

          <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center gap-2">
            <span className={`${bb} text-[clamp(4rem,12vw,9rem)] leading-none text-white [text-shadow:0_4px_24px_rgba(3,8,22,0.6)]`}>
              {pct}
              <span className="text-cyan-200">%</span>
            </span>
          </div>
        </div>
      )}

      {/* Background laut.png + overlay biar teks kebaca */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/laut.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#04204f]/50 via-[#030816]/65 to-[#02060f]/85" />

      {/* Caustic */}
      <div className="ab-caustic pointer-events-none absolute -left-20 top-20 z-0 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-[90px]" />
      <div
        className="ab-caustic pointer-events-none absolute -right-24 bottom-10 z-0 h-[480px] w-[480px] rounded-full bg-[#ff304f]/[0.07] blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />

      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_4px)]" />

      {/* Bubbles */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {bubbles.map(([left, size, dur, delay]) => (
          <span
            key={left}
            className="ab-bubble absolute bottom-[-40px] rounded-full border border-cyan-100/30 bg-cyan-100/10"
            style={v({ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${delay}s` })}
          />
        ))}
      </div>

      {/* Wave divider atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 overflow-hidden sm:h-28">
        <Wave d={W_TOP1} h={120} fill="#06265d" className="ab-w2 absolute left-0 top-0 h-full w-[200%] opacity-40" />
        <Wave d={W_TOP2} h={120} fill="#030816" className="ab-w1 absolute left-0 top-0 h-[80%] w-[200%] opacity-80" />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:pt-36">
        {/* LEFT: Foto */}
        <div className="relative mx-auto w-full max-w-[420px]" style={{ perspective: "1200px" }}>
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            {[["border-cyan-200/40", 0], ["border-cyan-200/30", 1.2], ["border-[#ff304f]/30", 2.4]].map(([c, d]) => (
              <span
                key={c}
                className={`ab-ripple absolute h-[85%] w-[85%] rounded-full border ${c}`}
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>

          <div className="ab-float">
            <div
              ref={tilt}
              onMouseEnter={() => playP3RHover()}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                tiltTo((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
              }}
              onMouseLeave={() => tiltTo(0, 0)}
              className="relative transition-transform duration-300 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="ab-r absolute -bottom-4 -right-4 h-full w-full border border-cyan-300/50" />

              <div className="ab-photo relative aspect-[3/4] w-full overflow-hidden border border-white/30 bg-[#041d4c]/70 shadow-[0_0_50px_rgba(103,232,249,0.2)]">
                <Image
                  src={profile.image}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030816]/80 via-transparent to-cyan-300/10" />
                <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cyan-300" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="relative">
          <div
            className={`${bb} pointer-events-none absolute -top-10 right-0 select-none text-[clamp(7rem,16vw,14rem)] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:1px_white]`}
          >
            01
          </div>

          <h2
            className={`${bb} relative text-[clamp(3.5rem,9vw,7.5rem)] uppercase leading-[0.85] tracking-[-0.02] text-white [text-shadow:0_5px_24px_rgba(0,0,0,0.4)] [-webkit-text-stroke:1px_black]`}
          >
            <span className="block overflow-hidden">
              <span className="ab-r block" style={rv(0.2, { "--y": "110%", "--b": "0px" })}>
                {profile.firstName}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="ab-r block text-cyan-200 [text-shadow:0_0_30px_rgba(103,232,249,0.45)]"
                style={rv(0.35, { "--y": "110%", "--b": "0px" })}
              >
                {profile.lastName}
              </span>
            </span>
          </h2>

          <div className="ab-r mt-3 w-40 origin-left" style={rv(0.7, { "--sx": 0, "--y": 0, "--b": "0px" })}>
            <div className="h-[5px] w-full -skew-x-12 bg-[#ff304f]/90 shadow-[0_0_14px_rgba(255,48,79,0.6)]" />
          </div>

          <p className={`${bb} ab-r mt-6 text-2xl tracking-[0.2em] text-white/85`} style={rv(0.6)}>
            {profile.role} <span className="text-cyan-200">/</span> {profile.university}
          </p>

          <div className="ab-r mt-5 flex max-w-xl items-start gap-3" style={rv(0.75)}>
            <span className="mt-1 h-full min-h-[3rem] w-1 shrink-0 bg-[#ff304f] shadow-[0_0_12px_rgba(255,48,79,0.7)]" />
            <div className="space-y-3 text-sm leading-6 text-white/80 sm:text-base">
              {profile.descriptions.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>

          {/* Info rows */}
          <div className="mt-8 max-w-xl border-t border-white/15">
            {infoRows.map(([label, value], i) => (
              <div
                key={label}
                style={rv(0.9 + i * 0.1, { "--x": "50px", "--y": 0, "--b": "0px" })}
                onMouseEnter={() => playP3RHover()}
                className="ab-r group flex items-center justify-between gap-4 border-b border-white/15 py-3 transition-all duration-300 hover:border-cyan-200/60 hover:bg-white/[0.03] hover:pl-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/70">{label}</span>
                <span className="text-right text-sm text-white/85 transition group-hover:text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mt-8 flex max-w-xl flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={s} className="ab-r" style={rv(1.3 + i * 0.07, { "--y": "16px", "--sx": 0.9, "--sy": 0.9, "--b": "0px" })}>
                <span
                  onMouseEnter={() => playP3RHover()}
                  className="block cursor-default border border-cyan-200/30 bg-[#041d4c]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100 backdrop-blur-sm transition duration-300 hover:border-cyan-200 hover:bg-cyan-200 hover:text-[#030816]"
                >
                  {s}
                </span>
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} start={show} delay={1.5 + i * 0.1} />
            ))}
          </div>

          {/* CTA */}
          <div className="ab-r mt-9 flex flex-wrap items-center gap-4" style={rv(2)}>
            <Link
              href="/experience"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group relative overflow-hidden border border-cyan-200 bg-cyan-200 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-[#030816] transition hover:text-cyan-100"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#030816] transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative">View Experience →</span>
            </Link>

            <Link
              href="/"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group relative overflow-hidden border border-white/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/80 transition hover:border-cyan-200 hover:text-[#030816]"
            >
              <span className="absolute inset-0 -translate-x-full bg-cyan-200 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative">← Main Menu</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}