"use client"

import { useState, useEffect } from "react"
import { Moon } from "lucide-react"
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio"

const navLinks = [
  { href: "#about", label: "Status", code: "01" },
  { href: "#skills", label: "Skills", code: "02" },
  { href: "#experience", label: "Pengalaman", code: "03" },
  { href: "#projects", label: "Proyek", code: "04" },
  { href: "#contact", label: "Kontak", code: "05" },
]

export function SiteNav() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()

      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }

    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed right-0 top-0 z-50 w-[63.3%] px-4 py-3.5">
      <div
        className="
          ml-auto
          flex
          w-[92%]
          items-center
          justify-between
          rounded-full
          border
          border-[#00e5ff]/35
          bg-[#030816]/85
          px-5
          py-2
          backdrop-blur-xl
          shadow-[0_0_25px_rgba(0,229,255,0.18)]
        "
      >
        {/* =====================================================
            NAME
        ====================================================== */}
        <a
          href="#top"
          onMouseEnter={() => playP3RHover()}
          onClick={() => playP3RSelect()}
          className="
            shrink-0
            text-[13px]
            font-bold
            tracking-wide
            text-white
            transition-colors
            duration-200
            hover:text-[#00e5ff]
          "
        >
          Oliver Martinez
        </a>

        {/* =====================================================
            CLOCK
        ====================================================== */}
        <div
          className="
            hidden
            text-[11px]
            font-medium
            tracking-[0.08em]
            text-white/65
            lg:block
          "
        >
          {time}
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.code}
              href={link.href}
              onMouseEnter={() => playP3RHover()}
              onClick={() => playP3RSelect()}
              className="
                group
                relative
                flex
                items-center
                gap-1.5
                rounded-full
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wide
                text-white/75
                transition-all
                duration-200
                hover:bg-white
                hover:text-black
                hover:shadow-[4px_4px_0_#e60012]
              "
            >
              <span
                className="
                  text-[8px]
                  font-bold
                  text-[#00e5ff]
                  transition-colors
                  duration-200
                  group-hover:text-black
                "
              >
                #{link.code}
              </span>

              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* =====================================================
            MOON
        ====================================================== */}
        <button
          type="button"
          onMouseEnter={() => playP3RHover()}
          onClick={() => playP3RSelect()}
          className="
            ml-1
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            text-white/70
            transition-all
            duration-200
            hover:bg-white
            hover:text-black
            hover:shadow-[3px_3px_0_#e60012]
          "
          aria-label="Toggle theme"
        >
          <Moon size={14} strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}