"use client"

import Image from "next/image"
import { SectionHeading } from "./about-section"
import { ExternalLink, Sparkles, Terminal, Flame } from "lucide-react"
import { playP3RHover, playP3RSelect, playP3RChime } from "@/lib/p3r-audio"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const projects = [
  {
    title: "Insight Analytics Platform",
    codeName: "OPERATION: CHRONOS",
    rank: "S-RANK",
    rankBg: "#facc15",
    difficulty: "HIGH-THREAT",
    description:
      "Dashboard analitik SaaS enterprise dengan visualisasi metrik performa real-time, streaming data berkecepatan tinggi, dan automasi laporan eksekutif.",
    image: "/project-1.png",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Tailwind CSS", "Recharts"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Omni Marketplace Mobile & Web",
    codeName: "OPERATION: HERMES",
    rank: "S-RANK",
    rankBg: "#00e5ff",
    difficulty: "EXTREME",
    description:
      "Aplikasi e-commerce modern dengan arsitektur checkout instan, sinkronisasi inventori real-time via WebSockets, dan sistem pembayaran terenkripsi.",
    image: "/project-2.png",
    tags: ["React Native", "Node.js", "Stripe Payment", "Redis", "Docker"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Cyber Creative Studio Engine",
    codeName: "OPERATION: APOLLO",
    rank: "A-RANK",
    rankBg: "#34d399",
    difficulty: "TACTICAL",
    description:
      "Website agensi interaktif dengan transisi halaman ultra-halus, headless CMS, dan skor SEO & performa 100/100 di Google Lighthouse.",
    image: "/project-3.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Headless CMS", "WebGL"],
    demoUrl: "#",
    githubUrl: "#",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-4 py-20 md:px-6 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* Section Heading */}
        <SectionHeading
          code="04"
          eyebrow="OPERATION ARCHIVE"
          title="ALL-OUT ATTACK: PROYEK PILIHAN"
          subtitle="Kompilasi operasi rekayasa perangkat lunak berskala penuh yang telah berhasil diselesaikan dengan presisi maksimal."
        />

        {/* All-Out Attack Finish Banner Graphic Motif */}
        <div className="mt-8 mb-12 p-3 bg-gradient-to-r from-[#00e5ff]/20 via-[#061b44] to-transparent border-l-4 border-[#facc15] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-p3r font-black italic text-lg tracking-wider text-[#facc15] uppercase">
              ALL-OUT ATTACK // FINISH ARCHIVE
            </span>
            <span className="hidden sm:inline font-mono text-xs text-[#94a3b8]">
              | TOTAL TARGETS NEUTRALIZED: 40+
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-[#00e5ff]">
            <Flame className="size-3.5 text-[#facc15]" />
            <span>CRITICAL HIT RATE: 100%</span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              onMouseEnter={playP3RHover}
              className="group relative flex flex-col border border-[#00e5ff]/25 bg-[#061433]/90 transition-all duration-500 hover:border-[#00e5ff] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
            >
              {/* Top Tactical Label Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#030816] border-b border-[#00e5ff]/20 font-mono text-[11px]">
                <span className="text-[#00e5ff] font-semibold tracking-wider">
                  {project.codeName}
                </span>

                <span
                  className="font-p3r font-black italic px-2 py-0.2 text-[#030816] skew-x-[-10deg]"
                  style={{ backgroundColor: project.rankBg }}
                >
                  <span className="skew-x-[10deg]">{project.rank}</span>
                </span>
              </div>

              {/* Project Image Preview with Tactical Scanlines */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#030816] border-b border-[#00e5ff]/20">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`Tampilan operasi ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 p3r-scanlines opacity-40 pointer-events-none" />

                {/* Difficulty overlay badge */}
                <div className="absolute bottom-2 left-2 bg-[#030816]/90 border border-[#00e5ff]/40 px-2 py-0.5 font-mono text-[10px] text-[#cbd5e1]">
                  {project.difficulty}
                </div>
              </div>

              {/* Project Information */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-p3r text-xl font-bold uppercase italic text-white group-hover:text-[#00e5ff] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#94a3b8] font-sans">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[#00e5ff]/15">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 bg-[#030816] text-[#7dd3fc] border border-[#00e5ff]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                  <a
                    href={project.demoUrl}
                    onClick={playP3RChime}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-[#00e5ff] hover:bg-white text-[#030816] font-p3r font-black italic uppercase text-xs py-2 px-3 tracking-wider skew-x-[-8deg] transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.6)]"
                  >
                    <span className="skew-x-[8deg] flex items-center gap-1">
                      <ExternalLink className="size-3 text-[#030816]" />
                      <span>SUMMON DEMO</span>
                    </span>
                  </a>

                  <a
                    href={project.githubUrl}
                    onClick={playP3RSelect}
                    title="Source Code"
                    className="p-2 border border-[#00e5ff]/40 bg-[#030816] hover:border-[#00e5ff] text-[#00e5ff] hover:text-white transition-colors"
                  >
                    <GithubIcon className="size-4" />
                  </a>
                </div>
              </div>

              {/* Bottom Glowing Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
