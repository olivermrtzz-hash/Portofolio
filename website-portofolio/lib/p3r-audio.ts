// Persona 3 Reload Synth Audio Engine (Web Audio API)
// Synthesizes tactile, crisp sci-fi/RPG UI sounds without external audio assets.

let audioCtx: AudioContext | null = null
let isMuted = false

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume()
  }
  return audioCtx
}

export function toggleMute(): boolean {
  isMuted = !isMuted
  if (typeof window !== "undefined") {
    localStorage.setItem("p3r_audio_muted", isMuted ? "true" : "false")
  }
  if (!isMuted) {
    playP3RChime()
  }
  return isMuted
}

export function getIsMuted(): boolean {
  if (typeof window !== "undefined" && isMuted === false) {
    const saved = localStorage.getItem("p3r_audio_muted")
    if (saved === "true") {
      isMuted = true
    }
  }
  return isMuted
}

// Hover Tick (P3R menu hover blip)
export function playP3RHover() {
  if (getIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = "sine"
  osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
  osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.04) // Quick upward chirp

  gain.gain.setValueAtTime(0.04, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.05)
}

// Select / Action Click (P3R battle command confirm)
export function playP3RSelect() {
  if (getIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Dual tone for crisp punch
  const osc1 = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const gain = ctx.createGain()

  osc1.type = "triangle"
  osc1.frequency.setValueAtTime(523.25, now) // C5
  osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.09) // C6

  osc2.type = "sine"
  osc2.frequency.setValueAtTime(1318.51, now) // E6
  osc2.frequency.exponentialRampToValueAtTime(2093.0, now + 0.09) // C7

  gain.gain.setValueAtTime(0.09, now)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

  osc1.connect(gain)
  osc2.connect(gain)
  gain.connect(ctx.destination)

  osc1.start(now)
  osc2.start(now)
  osc1.stop(now + 0.13)
  osc2.stop(now + 0.13)
}

// Summon / All-Out Attack Chime
export function playP3RChime() {
  if (getIsMuted()) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const notes = [659.25, 880, 1046.5, 1318.51] // E5, A5, C6, E6

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, now + idx * 0.03)

    gain.gain.setValueAtTime(0.06, now + idx * 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.03 + 0.22)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now + idx * 0.03)
    osc.stop(now + idx * 0.03 + 0.25)
  })
}
