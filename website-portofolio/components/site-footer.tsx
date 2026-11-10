"use client"

import { playP3RHover } from "@/lib/p3r-audio"

export function SiteFooter() {
  return (
    <footer className="border-t border-[#00e5ff]/20 bg-[#02050e] py-10 px-4 md:px-6 relative overflow-hidden">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: S.E.E.S. Brand Tag */}
        <div className="flex items-center gap-3">
          <div className="bg-[#ef4444] text-white px-2 py-0.5 text-[10px] font-black tracking-widest uppercase font-p3r italic skew-x-[-10deg]">
            <span className="skew-x-[10deg]">S.E.E.S.</span>
          </div>
          <div>
            <span className="font-p3r text-base font-bold italic uppercase tracking-wider text-white">
              OLIVER MARTINEZ
            </span>
            <div className="font-mono text-[10px] text-[#00e5ff]">
              FULLSTACK SOFTWARE ENGINEER // LVL 99
            </div>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="font-mono text-xs text-[#94a3b8] text-center">
          <div className="flex items-center justify-center gap-2 text-[#7dd3fc]">
            <span className="size-1.5 rounded-full bg-[#00e5ff] animate-ping" />
            <span className="font-semibold uppercase tracking-wider">TACTICAL HUD ONLINE</span>
          </div>
          <div className="text-[11px] mt-0.5 text-[#64748b]">
            &copy; {new Date().getFullYear()} Oliver Martinez. Inspired by Persona 3 Reload aesthetic.
          </div>
        </div>

        {/* Right: Quick To-Top Trigger */}
        <a
          href="#top"
          onMouseEnter={playP3RHover}
          className="font-p3r text-xs font-bold uppercase italic text-[#00e5ff] hover:text-white px-3 py-1.5 border border-[#00e5ff]/30 bg-[#061433] transition-all hover:border-[#00e5ff] skew-x-[-10deg]"
        >
          <span className="skew-x-[10deg]">RETURN TO APEX [▲]</span>
        </a>

      </div>
    </footer>
  )
}
