import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { BgmPlayer } from "@/components/bgm-player"

export default function Page() {
  return (
    <main className="min-h-screen text-[#e0f2fe] relative selection:bg-[#00e5ff] selection:text-[#030816]">
      {/* Background Laut */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-[80%_center] bg-no-repeat opacity-50 pointer-events-none"
        style={{ backgroundImage: "url('/laut_gerak.gif')" }}
      />

      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#030816]/60 via-[#030816]/80 to-[#030816]/95 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <SiteNav />
        <HeroSection />
        <BgmPlayer />
      </div>
    </main>
  )

}