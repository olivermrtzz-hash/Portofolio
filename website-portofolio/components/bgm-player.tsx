"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music, Info, ExternalLink, X } from "lucide-react"
import { playP3RHover, playP3RSelect } from "@/lib/p3r-audio"

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showCredits, setShowCredits] = useState(false)

  useEffect(() => {
    // Attempt playback on first user gesture anywhere on the webpage
    const tryAutoplay = () => {
      if (audioRef.current && !hasInteracted) {
        audioRef.current.volume = volume
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(() => {
            // Browser autoplay restricted until direct gesture
          })
      }
    }

    window.addEventListener("click", tryAutoplay, { once: true })
    window.addEventListener("keydown", tryAutoplay, { once: true })

    return () => {
      window.removeEventListener("click", tryAutoplay)
      window.removeEventListener("keydown", tryAutoplay)
    }
  }, [hasInteracted, volume])

  const togglePlay = () => {
    playP3RSelect()
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        })
        .catch((err) => {
          console.log("Playback error:", err)
        })
    }
  }

  const toggleMute = () => {
    playP3RSelect()
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.volume = volume
      setIsMuted(false)
    } else {
      audioRef.current.volume = 0
      setIsMuted(true)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Credit Popover Panel */}
      {showCredits && (
        <div className="mb-3 w-80 bg-[#030816]/95 border-2 border-[#00e5ff] p-4 shadow-[0_0_30px_rgba(0,229,255,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200 font-sans">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#00e5ff]/20">
            <span className="font-p3r font-black italic text-xs uppercase text-[#00e5ff] tracking-wider flex items-center gap-1.5">
              <Music className="size-3.5 text-[#00e5ff]" />
              AUDIO TRANSMISSION CREDIT
            </span>
            <button
              onClick={() => setShowCredits(false)}
              className="text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-[#cbd5e1] font-mono">
            <div>
              <span className="text-[#94a3b8]">Song:</span>{" "}
              <strong className="text-white font-semibold">Shizuka</strong>
            </div>
            <div>
              <span className="text-[#94a3b8]">Composer:</span>{" "}
              <a
                href="https://www.youtube.com/channel/UCoZbM1a4PKQ6haa2Ap4TSdg"
                target="_blank"
                rel="noreferrer"
                className="text-[#00e5ff] hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>AERØHEAD</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
            <div>
              <span className="text-[#94a3b8]">License:</span>{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noreferrer"
                className="text-[#facc15] hover:underline inline-flex items-center gap-1"
              >
                <span>Creative Commons (BY-SA 3.0)</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
            <div className="pt-2 border-t border-[#00e5ff]/15 text-[11px] text-[#94a3b8]">
              Music powered by{" "}
              <a
                href="https://breakingcopyright.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#38bdf8] hover:underline inline-flex items-center gap-1"
              >
                <span>BreakingCopyright</span>
                <ExternalLink className="size-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Tactical P3R Music Player */}
      <div className="relative group flex items-center gap-2.5 bg-[#061433]/95 border-2 border-[#00e5ff]/50 px-3 py-2 shadow-[0_0_25px_rgba(0,229,255,0.3)] backdrop-blur-md skew-x-[-6deg] transition-all hover:border-[#00e5ff] hover:shadow-[0_0_35px_rgba(0,229,255,0.45)]">
        
        {/* Glowing Top Cyan Bar */}
        <div className="absolute -top-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          onMouseEnter={playP3RHover}
          title={isPlaying ? "Pause BGM" : "Play BGM"}
          className="skew-x-[6deg] size-9 flex items-center justify-center bg-[#00e5ff] hover:bg-white text-[#030816] transition-all shadow-[0_0_12px_rgba(0,229,255,0.6)] cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Track Info & Animated Equalizer */}
        <div className="skew-x-[6deg] flex flex-col justify-center select-none">
          <div className="flex items-center gap-2">
            <span className="font-p3r font-black italic text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              <Music className="size-3 text-[#00e5ff]" />
              <span>Shizuka</span>
            </span>

            {/* Equalizer Waveform Bars */}
            <div className="flex items-end gap-[3px] h-3.5">
              <span
                className={`w-[3px] bg-[#00e5ff] transition-all duration-300 ${
                  isPlaying ? "animate-pulse h-3.5" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-[3px] bg-[#38bdf8] transition-all duration-300 ${
                  isPlaying ? "animate-pulse h-2 delay-100" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-[3px] bg-[#facc15] transition-all duration-300 ${
                  isPlaying ? "animate-pulse h-3 delay-200" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-[3px] bg-[#00e5ff] transition-all duration-300 ${
                  isPlaying ? "animate-pulse h-2.5 delay-150" : "h-1 opacity-40"
                }`}
              />
            </div>
          </div>

          <div className="font-mono text-[10px] text-[#7dd3fc] tracking-wider flex items-center gap-1.5">
            <span className="text-[#34d399] font-semibold">{isPlaying ? "PLAYING" : "PAUSED"}</span>
            <span className="text-[#64748b]">|</span>
            <span className="text-[#cbd5e1] truncate max-w-[100px]">AERØHEAD</span>
          </div>
        </div>

        {/* Credits Trigger Button */}
        <button
          onClick={() => setShowCredits(!showCredits)}
          onMouseEnter={playP3RHover}
          title="Lihat Credit Lagu"
          className="skew-x-[6deg] p-1.5 border border-[#00e5ff]/30 bg-[#030816] text-[#00e5ff] hover:text-white hover:border-[#00e5ff] transition-colors cursor-pointer"
        >
          <Info className="size-3.5" />
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          onMouseEnter={playP3RHover}
          title={isMuted ? "Unmute" : "Mute"}
          className="skew-x-[6deg] p-1.5 border border-[#00e5ff]/20 bg-[#030816] text-[#7dd3fc] hover:text-[#00e5ff] hover:border-[#00e5ff] transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="size-3.5 text-red-400" />
          ) : (
            <Volume2 className="size-3.5" />
          )}
        </button>

      </div>
    </div>
  )
}
