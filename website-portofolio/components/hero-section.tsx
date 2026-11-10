"use client"

import Image from "next/image"
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio"
import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden bg-[#076bd5] text-white"
    >
      {/* =========================================================
          LEFT: PROFILE PANEL
      ========================================================= */}
      <div className="absolute inset-y-0 left-0 z-40 w-[36.7%] min-w-[285px] bg-[#f5f5f3]/85 text-[#171719]">
        <div className="relative flex h-full flex-col overflow-hidden">

          {/* TOP META */}
          <div className="absolute left-[9%] top-[6%] z-20 flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-[#e60012]">
              01
            </span>

            <span className="h-px w-8 bg-[#171719]/40" />

            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#171719]/60">
              Profile
            </span>
          </div>

          {/* PORTFOLIO */}
          <div className="absolute left-[-1%] top-[15%] z-0 overflow-visible">
            <div
              className={`${bebas.className} text-[170px] uppercase leading-[0.62] tracking-[-0.04em] text-black [text-shadow:8px_7px_0_#b8b8b8]`}
              style={{ writingMode: "vertical-rl" }}
            >
              PORTFOLIO
            </div>
          </div>

          {/* DECORATIVE RED LINE */}
          <div className="absolute left-[9%] top-[14%] z-10 h-[1px] w-[70%] bg-[#171719]/15" />

          <div className="absolute right-[9%] top-[14%] z-10 h-2 w-2 bg-[#e60012]" />

          {/* PROFILE IMAGE FRAME */}
          <div className="absolute right-[10%] top-[23%] z-10 w-[65%]">

            {/* BLACK OFFSET */}
            <div className="absolute -bottom-3 left-3 h-full w-full border-[3px] border-black/70" />

            {/* RED OUTLINE + IMAGE */}
            <div className="relative border-[4px] border-[#e60012]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#d8d8d6]">

                <Image
                  src="/mukagwe.jpeg"
                  alt="Profile"
                  fill
                  priority
                  className="object-cover object-center"
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />

                {/* IMAGE NUMBER */}
                <div className="absolute bottom-3 left-3 font-mono text-[9px] font-bold tracking-[0.15em] text-white">
                  IMG_001
                </div>

              </div>
            </div>

          </div>

          {/* SMALL LABEL ABOVE IMAGE */}
          <div className="absolute right-[10%] top-[20%] z-20 font-mono text-[9px] uppercase tracking-[0.2em] text-[#171719]/50">
            Selected Profile
          </div>

          {/* PROFILE INFORMATION */}
          <div className="absolute bottom-[10.5%] right-[8%] z-20 w-[65%]">

            {/* NAME */}
            <h1
              className={`${bebas.className} text-[42px] uppercase leading-[0.85] tracking-[-0.025em] text-white [text-shadow:2px_2px_0_#000,-2px_2px_0_#000,2px_-2px_0_#000,-2px_-2px_0_#000]`}
            >
              Oliver
              <br />
              Martinez
            </h1>

            {/* ROLE */}
            <div className="mt-4 flex translate-y-[5px] items-center gap-3">
              <div className="h-[2px] w-7 bg-[#e60012]" />

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#171719]/70">
                Software Engineer
              </p>
            </div>

            {/* SOCIAL / CONTACT META */}
            <div className="mt-5 grid grid-cols-2 border-t border-[#171719]/15 pt-3">

              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#171719]/40">
                  Instagram
                </p>

                <p className="mt-1 font-mono text-[9px] font-bold">
                  @olivermrtz_
                </p>
              </div>

              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#171719]/40">
                  LinkedIn
                </p>

                <p className="mt-1 font-mono text-[9px] font-bold">
                  Oliver Martinez
                </p>
              </div>

            </div>
          </div>

          {/* BOTTOM DECORATION */}
          <div className="absolute bottom-[4%] left-[9%] z-10 flex items-center gap-3">

            <div className="h-2 w-2 rotate-45 bg-[#e60012]" />

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#171719]/40">
              Portfolio / 2026
            </span>

          </div>

        </div>
      </div>

      {/* =========================================================
          RIGHT: OCEAN
      ========================================================= */}
      <div className="absolute inset-y-0 right-0 w-[63.3%] overflow-hidden">

        {/* Ocean wallpaper */}
        <Image
          src="/laut_gerak.gif"
          alt=""
          fill
          priority
          className="object-cover object-[80%_center]"
        />

        {/* Blue overlay */}
        <div className="absolute inset-0 bg-[#006ee8]/45" />

        {/* Dark blue bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#022274]/90 via-[#064bb3]/50 to-transparent" />

        {/* =====================================================
            MENU
        ===================================================== */}
        <div className="absolute left-[3%] top-1/2 z-20 h-[65%] w-[80%] min-w-[300px] -translate-y-1/2">
          <nav className="relative h-full w-full">

            {/* =================================================
                SKILLS
            ================================================= */}
            <a
              href="/skills"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group absolute left-[4%] top-[0%] z-30 block w-max -rotate-[8deg] -skew-x-[8deg] px-2 font-p3r text-[110px] font-black italic uppercase leading-[0.8] tracking-[-0.06em] transition-all duration-500 ease-out hover:z-50 hover:translate-x-3 hover:scale-[1.05]"
            >
              {/* RED OFFSET */}
              <span
                className="pointer-events-none absolute left-[-18px] top-[17px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-[#e60012] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* WHITE PANEL */}
              <span
                className="pointer-events-none absolute left-[-10px] top-[4px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* TEXT */}
              <span
                className="relative z-10 block bg-[linear-gradient(to_bottom,#9ff6ff_0%,#24dcff_50%,#0874d9_100%)] bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:bg-[linear-gradient(to_bottom,#000000_0%,#000000_35%,#ff1744_65%,#ff5a73_100%)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Skills
              </span>
            </a>

            {/* =================================================
                PENGALAMAN
            ================================================= */}
            <a
              href="/experience"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group absolute left-[18%] top-[18%] z-20 block w-max rotate-[6deg] -skew-x-[8deg] px-2 font-p3r text-[110px] font-black italic uppercase leading-[0.8] tracking-[-0.06em] transition-all duration-500 ease-out hover:z-50 hover:translate-x-3 hover:scale-[1.05]"
            >
              {/* RED OFFSET */}
              <span
                className="pointer-events-none absolute left-[-18px] top-[17px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-[#e60012] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* WHITE PANEL */}
              <span
                className="pointer-events-none absolute left-[-10px] top-[4px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* TEXT */}
              <span
                className="relative z-10 block bg-[linear-gradient(to_bottom,#d2fbff_0%,#35cfff_50%,#0759b8_100%)] bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:bg-[linear-gradient(to_bottom,#000000_0%,#000000_35%,#ff1744_65%,#ff5a73_100%)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pengalaman
              </span>
            </a>

            {/* =================================================
                CONTACT
            ================================================= */}
            <a
              href="/contact"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group absolute left-[5%] top-[36%] z-40 block w-max -rotate-[4deg] -skew-x-[8deg] px-2 font-p3r text-[110px] font-black italic uppercase leading-[0.8] tracking-[-0.06em] transition-all duration-500 ease-out hover:z-50 hover:translate-x-3 hover:scale-[1.05]"
            >
              {/* RED OFFSET */}
              <span
                className="pointer-events-none absolute left-[-18px] top-[17px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-[#e60012] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* WHITE PANEL */}
              <span
                className="pointer-events-none absolute left-[-10px] top-[4px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* TEXT */}
              <span
                className="relative z-10 block bg-[linear-gradient(to_bottom,#7cecff_0%,#159fe8_50%,#03448f_100%)] bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:bg-[linear-gradient(to_bottom,#000000_0%,#000000_35%,#ff1744_65%,#ff5a73_100%)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Contact
              </span>
            </a>

            {/* =================================================
                ABOUT ME
            ================================================= */}
            <a
              href="/about"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group absolute left-[25%] top-[52%] z-10 block w-max rotate-[9deg] -skew-x-[8deg] px-2 font-p3r text-[110px] font-black italic uppercase leading-[0.8] tracking-[-0.06em] transition-all duration-500 ease-out hover:z-50 hover:translate-x-3 hover:scale-[1.05]"
            >
              {/* RED OFFSET */}
              <span
                className="pointer-events-none absolute left-[-18px] top-[17px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-[#e60012] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* WHITE PANEL */}
              <span
                className="pointer-events-none absolute left-[-10px] top-[4px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* TEXT */}
              <span
                className="relative z-10 block bg-[linear-gradient(to_bottom,#baf9ff_0%,#1ec5f5_50%,#0566c7_100%)] bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:bg-[linear-gradient(to_bottom,#000000_0%,#000000_35%,#ff1744_65%,#ff5a73_100%)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                About Me
              </span>
            </a>

            {/* =================================================
                PROJECTS
            ================================================= */}
            <a
              href="#projects"
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="group absolute left-[10%] top-[72%] z-20 block w-max -rotate-[7deg] -skew-x-[8deg] px-2 font-p3r text-[110px] font-black italic uppercase leading-[0.8] tracking-[-0.06em] transition-all duration-500 ease-out hover:z-50 hover:translate-x-3 hover:scale-[1.05]"
            >
              {/* RED OFFSET */}
              <span
                className="pointer-events-none absolute left-[-18px] top-[17px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-[#e60012] opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* WHITE PANEL */}
              <span
                className="pointer-events-none absolute left-[-10px] top-[4px] h-[82%] w-[calc(100%+70px)] translate-x-[-8px] bg-white opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-70"
                style={{
                  clipPath:
                    "polygon(0 67%, 100% 0, 94% 100%, 8% 100%)",
                }}
              />

              {/* TEXT */}
              <span
                className="relative z-10 block bg-[linear-gradient(to_bottom,#e0fdff_0%,#2ab8ed_50%,#034b9d_100%)] bg-clip-text text-transparent transition-all duration-500 ease-out group-hover:bg-[linear-gradient(to_bottom,#000000_0%,#000000_35%,#ff1744_65%,#ff5a73_100%)]"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Projects
              </span>
            </a>

          </nav>
        </div>
      </div>
    </section>
  )
}