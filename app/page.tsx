"use client"

import { useCallback, useEffect, useState } from "react"
import CrtOverlay from "@/components/crt/crt-overlay"
import DotMatrix from "@/components/crt/dot-matrix"
import ExperienceLog from "@/components/crt/experience-log"
import Hero from "@/components/crt/hero"
import HudHeader from "@/components/crt/hud-header"
import MenuOverlay from "@/components/crt/menu-overlay"
import ProjectPanel from "@/components/crt/project-panel"
import WorkIndex, { projectNumber } from "@/components/crt/work-index"
import { profile } from "@/lib/content"
import type { DotScene } from "@/lib/dot-engine"

const faint = (word: string): DotScene => ({ lines: [word], intensity: 0.34, align: "right", anchor: "bottom" })

/** What the dot-matrix display shows while each section is on screen. */
const SCENES: Record<string, DotScene> = {
  experience: faint("LOG"),
  hero: { lines: profile.name.toUpperCase().split(" "), intensity: 1, align: "left", anchor: "middle" },
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [section, setSection] = useState("hero")
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const [openProject, setOpenProject] = useState<number | null>(null)
  const [hoverProject, setHoverProject] = useState<number | null>(null)
  const closeProject = useCallback(() => setOpenProject(null), [])

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

  // A hovered or open project takes over the display with its number.
  const focusProject = openProject ?? (section === "work" ? hoverProject : null)
  const scene: DotScene =
    focusProject !== null
      ? { lines: [projectNumber(focusProject)], intensity: openProject !== null ? 0.22 : 0.34, align: "right", anchor: "middle" }
      : (SCENES[section] ?? faint(section.toUpperCase()))

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <DotMatrix scene={scene} />
      <CrtOverlay />
      <HudHeader onMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={closeMenu} />
      <ProjectPanel index={openProject} onClose={closeProject} onNavigate={setOpenProject} />

      <main className="crt-main">
        <section id="hero" data-scene className="crt-section crt-hero">
          <Hero />
        </section>

        <section id="work" data-scene className="crt-section">
          <WorkIndex onOpen={setOpenProject} onHover={setHoverProject} />
        </section>

        <section id="experience" data-scene className="crt-section">
          <ExperienceLog />
        </section>
      </main>
    </>
  )
}
