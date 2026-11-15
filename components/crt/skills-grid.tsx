import Scramble from "./scramble"
import { skillCategories } from "@/lib/content"

const dirName = (name: string) => `~/${name.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-")}`

export default function SkillsGrid() {
  return (
    <div className="section-wrap">
      <header className="section-head">
        <span className="term-label">[04]</span>
        <Scramble as="h2" className="section-title dot-type" text="Skills" />
        <span className="term-label">ls -1 ~/skills</span>
      </header>

      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <p className="panel-label">
              <span className="amber">{dirName(cat.name)}</span>
            </p>
            <ul className="panel-tags skill-tags">
              {cat.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
