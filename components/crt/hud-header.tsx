"use client"

import { useEffect, useState } from "react"
import Scramble from "./scramble"
import { profile } from "@/lib/content"
import { withBasePath } from "@/lib/utils"

function useClock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const update = () => setNow(fmt.format(new Date()))
    update()
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

export default function HudHeader({ onMenu }: { onMenu: () => void }) {
  const clock = useClock()

  return (
    <header className="hud-top">
      <a className="hud-brand" href="#hero">
        <Scramble text={profile.name} onHover />
      </a>
      <span className="hud-clock" aria-label="Local time in New Jersey">
        NJ {clock ?? "--:--:--"}
      </span>
      <nav className="hud-actions" aria-label="Primary">
        <a className="hud-btn" href={withBasePath("/resume.pdf")} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <a className="hud-btn" href="#contact">
          <span className="live-dot" aria-hidden="true" />
          Contact
        </a>
        <button type="button" className="hud-btn" onClick={onMenu} aria-haspopup="dialog">
          [Menu]
        </button>
      </nav>
    </header>
  )
}
