import Scramble from "./scramble"
import { experiences } from "@/lib/content"

export default function ExperienceLog() {
  return (
    <div className="section-wrap">
      <header className="section-head">
        <span className="term-label">[02]</span>
        <Scramble as="h2" className="section-title dot-type" text="Experience" />
        <span className="term-label">tail -n {experiences.length} career.log</span>
      </header>

      <ol className="log-list">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${exp.period}`}>
            <details className="log-entry" open={i === 0}>
              <summary>
                <span className="log-period">{exp.period}</span>
                <span className="log-company">{exp.company}</span>
                <span className="log-role">{exp.title}</span>
                <span className="log-toggle" aria-hidden="true" />
              </summary>
              <div className="log-body">
                <p className="log-loc">{exp.location}</p>
                <p className="log-desc">{exp.description}</p>
                <ul className="panel-tags">
                  {exp.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  )
}
