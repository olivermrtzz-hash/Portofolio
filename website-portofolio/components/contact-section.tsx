"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Bebas_Neue } from "next/font/google";
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const bb = bebas.className;

/* ---------- DATA (edit di sini) ---------- */
type Tone = "cyan" | "red" | "blue";

type Contact = {
  code: string;
  label: string;
  value: string;
  href?: string;
  tone: Tone;
};

const contacts: Contact[] = [
  {
    code: "CT / 01",
    label: "Personal Email",
    value: "olivermrtzz@gmail.com",
    href: "mailto:olivermrtzz@gmail.com",
    tone: "cyan",
  },
  {
    code: "CT / 02",
    label: "BINUS Email",
    value: "oliver.martinez@binus.ac.id",
    href: "mailto:oliver.martinez@binus.ac.id",
    tone: "blue",
  },
  {
    code: "CT / 03",
    label: "LinkedIn",
    value: "Oliver Martinez",
    // href: "https://www.linkedin.com/in/....",
    tone: "red",
  },
  {
    code: "CT / 04",
    label: "Instagram",
    value: "@olivermrtz_",
    href: "https://instagram.com/olivermrtz_",
    tone: "cyan",
  },
  {
    code: "CT / 05",
    label: "LINE",
    value: "@ikonikfriendly",
    href: "https://line.me/R/ti/p/@ikonikfriendly",
    tone: "blue",
  },
];

const toneClasses: Record<Tone, { stripe: string; text: string; tag: string }> = {
  cyan: { stripe: "bg-cyan-300", text: "text-cyan-200", tag: "border-cyan-200/40 text-cyan-100" },
  red: { stripe: "bg-[#ff304f]", text: "text-[#ff8a9b]", tag: "border-[#ff304f]/50 text-[#ff8a9b]" },
  blue: { stripe: "bg-blue-400", text: "text-blue-200", tag: "border-blue-300/40 text-blue-200" },
};

/* [left %, ukuran, durasi, delay] */
const bubbles = [
  [8, 10, 14, 0], [20, 18, 18, 3], [36, 8, 12, 6], [55, 14, 16, 1],
  [72, 20, 20, 8], [90, 11, 15, 4],
];

const W_TOP1 = "M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 C1350,100 1550,20 1800,60 C2050,100 2250,20 2400,60 L2400,0 L0,0 Z";
const W_TOP2 = "M0,50 C200,10 400,90 600,50 C800,10 1000,90 1200,50 C1400,10 1600,90 1800,50 C2000,10 2200,90 2400,50 L2400,0 L0,0 Z";

const d = (s: number, extra: Record<string, string | number> = {}) =>
  ({ "--d": `${s}s`, ...extra }) as CSSProperties;

function Wave({ path, fill, className }: { path: string; fill: string; className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 2400 120" preserveAspectRatio="none" className={className}>
      <path d={path} fill={fill} />
    </svg>
  );
}

/* ---------- MAIN ---------- */
export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copy = async (c: Contact) => {
    playP3RSelect();
    try {
      await navigator.clipboard.writeText(c.value);
    } catch {
      return;
    }
    setCopied(c.code);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section
      id="contact"
      className="ct-sec relative min-h-screen overflow-hidden bg-[#030816] text-[#e0f2fe] selection:bg-[#00e5ff] selection:text-[#030816]"
    >
      <style>{`
        @keyframes ctWave { to { transform: translateX(-50%); } }
        @keyframes ctRise {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 0.7; }
          50% { transform: translate(14px, -55vh); }
          100% { transform: translate(-10px, -120vh); opacity: 0; }
        }
        @keyframes ctCaustic {
          0%, 100% { transform: none; opacity: 0.5; }
          50% { transform: translate(40px, 20px) scale(1.15); opacity: 0.8; }
        }
        @keyframes ctBlink { 50% { opacity: 0.25; } }
        @keyframes ctIn {
          from {
            opacity: 0;
            filter: blur(var(--b, 10px));
            transform: translate(var(--x, 0), var(--y, 40px)) scale(var(--sx, 1), 1);
          }
        }

        .ct-r { animation: ctIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0s) backwards; }
        .ct-w1 { animation: ctWave 18s linear infinite; }
        .ct-w2 { animation: ctWave 28s linear infinite reverse; }
        .ct-bubble { animation: ctRise linear infinite; }
        .ct-caustic { animation: ctCaustic 9s ease-in-out infinite; }
        .ct-blink { animation: ctBlink 1.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ct-sec * { animation: none !important; }
        }
      `}</style>

      {/* Background laut.png + overlay biar teks kebaca */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/laut.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#04204f]/50 via-[#030816]/65 to-[#02060f]/85" />

      {/* Caustic */}
      <div className="ct-caustic pointer-events-none absolute -left-20 top-20 z-0 h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-[90px]" />
      <div
        className="ct-caustic pointer-events-none absolute -right-24 bottom-10 z-0 h-[480px] w-[480px] rounded-full bg-[#ff304f]/[0.07] blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />

      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#fff_0px,#fff_1px,transparent_1px,transparent_4px)]" />

      {/* Bubbles */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {bubbles.map(([left, size, dur, delay]) => (
          <span
            key={left}
            className="ct-bubble absolute bottom-[-40px] rounded-full border border-cyan-100/30 bg-cyan-100/10"
            style={{ left: `${left}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      {/* Wave divider atas */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-20 overflow-hidden sm:h-28">
        <Wave path={W_TOP1} fill="#06265d" className="ct-w2 absolute left-0 top-0 h-full w-[200%] opacity-40" />
        <Wave path={W_TOP2} fill="#030816" className="ct-w1 absolute left-0 top-0 h-[80%] w-[200%] opacity-80" />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:min-h-screen lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-12 lg:pt-28">
        {/* LEFT: Heading */}
        <div className="relative">
          <div
            className={`${bb} pointer-events-none absolute -top-10 left-0 select-none text-[clamp(7rem,16vw,14rem)] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:1px_white]`}
          >
            05
          </div>

          <div
            style={d(0.1)}
            className="ct-r relative mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200/70"
          >
            <span className="h-px w-8 bg-cyan-300" />
            Contact // 05
            <span className="ct-blink h-1.5 w-1.5 rounded-full bg-[#ff304f] shadow-[0_0_8px_rgba(255,48,79,0.9)]" />
          </div>

          <h2
            className={`${bb} relative text-[clamp(3.5rem,9vw,7.5rem)] uppercase leading-[0.85] tracking-[-0.02] text-white [text-shadow:0_5px_24px_rgba(0,0,0,0.4)] [-webkit-text-stroke:1px_black]`}
          >
            <span className="block overflow-hidden">
              <span className="ct-r block" style={d(0.2, { "--y": "110%", "--b": "0px" })}>
                Get In
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="ct-r block text-cyan-200 [text-shadow:0_0_30px_rgba(103,232,249,0.45)]"
                style={d(0.35, { "--y": "110%", "--b": "0px" })}
              >
                Touch
              </span>
            </span>
          </h2>

          <div className="ct-r mt-3 w-40 origin-left" style={d(0.7, { "--sx": 0, "--y": 0, "--b": "0px" })}>
            <div className="h-[5px] w-full -skew-x-12 bg-[#ff304f]/90 shadow-[0_0_14px_rgba(255,48,79,0.6)]" />
          </div>

          <div className="ct-r mt-6 flex max-w-md items-start gap-3" style={d(0.75)}>
            <span className="mt-1 h-full min-h-[3rem] w-1 shrink-0 bg-[#ff304f] shadow-[0_0_12px_rgba(255,48,79,0.7)]" />
            <p className="text-sm leading-6 text-white/80 sm:text-base">
              Punya pertanyaan, ide proyek, atau sekadar mau ngobrol? Hubungi aku lewat salah satu kontak di samping.
            </p>
          </div>

          <div className="ct-r mt-9" style={d(1)}>
            <Link
              href="/"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group relative inline-block overflow-hidden border border-white/30 px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-white/80 transition hover:border-cyan-200 hover:text-[#030816]"
            >
              <span className="absolute inset-0 -translate-x-full bg-cyan-200 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative">← Main Menu</span>
            </Link>
          </div>
        </div>

        {/* RIGHT: Contact list */}
        <div className="flex flex-col gap-3">
          {contacts.map((c, i) => {
            const tone = toneClasses[c.tone];
            const isCopied = copied === c.code;
            const external = c.href?.startsWith("http");

            const body = (
              <>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">{c.code}</span>
                  <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${tone.tag}`}>
                    {c.label}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="break-all text-base font-semibold text-white sm:text-xl">{c.value}</span>
                  {c.href && (
                    <span
                      className={`${bb} -translate-x-2 text-xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${tone.text}`}
                    >
                      ↗
                    </span>
                  )}
                </div>
              </>
            );

            return (
              <div
                key={c.code}
                style={d(0.5 + i * 0.12, { "--x": "50px", "--y": 0, "--b": "0px" })}
                onMouseEnter={() => playP3RHover()}
                className="ct-r group relative flex items-stretch border border-white/15 bg-[#041d4c]/40 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60 hover:bg-[#06265d]/60"
              >
                <span
                  className={`absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100 ${tone.stripe}`}
                />

                {c.href ? (
                  <a
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    onClick={() => playP3RSelect()}
                    className="min-w-0 flex-1 px-5 py-4"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="min-w-0 flex-1 px-5 py-4">{body}</div>
                )}

                <button
                  type="button"
                  aria-label={`Copy ${c.label}`}
                  onClick={() => copy(c)}
                  className={`w-24 shrink-0 border-l border-white/15 px-3 font-mono text-[10px] uppercase tracking-[0.2em] transition hover:bg-white/10 ${isCopied ? tone.text : "text-white/60 hover:text-white"
                    }`}
                >
                  {isCopied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}