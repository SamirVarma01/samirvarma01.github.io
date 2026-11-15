import BootTerminal, { type TermLine } from "./boot-terminal"
import Scramble from "./scramble"
import { experiences, profile } from "@/lib/content"

const BOOT: TermLine[] = [
  { cmd: true, text: "whoami" },
  { text: `${profile.name.toLowerCase()}, ${profile.role.toLowerCase()}` },
  { cmd: true, text: "cat focus.txt" },
  { text: "backend systems / ml infrastructure / distributed systems" },
  { cmd: true, text: "ls ~/experience" },
  { text: experiences.map((e) => e.handle).join("  ") },
]

/** The big name is drawn by the dot-matrix canvas; this is the HUD around it. */
export default function Hero() {
  return (
    <div className="hero">
      <h1 className="sr-only">
        {profile.name}, {profile.role}
      </h1>

      <div className="hero-side">
        <Scramble as="p" className="term-label" text={`// ${profile.degrees}`} />
        <p className="hero-tag">{profile.tagline}</p>
        <p className="hero-meta">
          {profile.school}
          <br />
          {profile.location}
        </p>
      </div>

      <BootTerminal lines={BOOT} />

      <a className="hero-hint" href="#work">
        Scroll
      </a>
    </div>
  )
}
