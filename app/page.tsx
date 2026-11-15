"use client"

import { useCallback, useEffect, useState } from "react"
import CrtOverlay from "@/components/crt/crt-overlay"
import DotMatrix from "@/components/crt/dot-matrix"
import Hero from "@/components/crt/hero"
import HudHeader from "@/components/crt/hud-header"
import MenuOverlay from "@/components/crt/menu-overlay"
import { profile } from "@/lib/content"
import type { DotScene } from "@/lib/dot-engine"

const faint = (word: string): DotScene => ({ lines: [word], intensity: 0.2, align: "right", anchor: "bottom" })

/** What the dot-matrix display shows while each section is on screen. */
const SCENES: Record<string, DotScene> = {
  hero: { lines: profile.name.toUpperCase().split(" "), intensity: 1, align: "left", anchor: "middle" },
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState("hero")
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Track which section crosses the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id)
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    document.querySelectorAll("[data-scene]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <DotMatrix scene={SCENES[section] ?? faint(section.toUpperCase())} />
      <CrtOverlay />
      <HudHeader onMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />

      <main className="crt-main">
        <section id="hero" data-scene className="crt-section crt-hero">
          <Hero />
        </section>
      </main>
    </>
  )
}
