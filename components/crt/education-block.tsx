import Scramble from "./scramble"
import { education } from "@/lib/content"

export default function EducationBlock() {
  const rows: [string, string][] = [
    ["school", education.school],
    ["college", education.college],
    ["degree", education.degree],
    ["period", education.period],
  ]

  return (
    <div className="section-wrap">
      <header className="section-head">
        <span className="term-label">[03]</span>
        <Scramble as="h2" className="section-title dot-type" text="Education" />
        <span className="term-label">cat education.yml</span>
      </header>

      <div className="edu-grid">
        <div>
          <dl className="kv">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}:</dt>
                <dd>{v}</dd>
              </div>
            ))}
            <div>
              <dt>gpa:</dt>
              <dd className="amber">{education.gpa}</dd>
            </div>
          </dl>

          <p className="panel-label">Relevant coursework</p>
          <ul className="panel-tags">
            {education.courses.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="panel-label">Leadership</p>
          <ul className="lead-list">
            {education.leadership.map((role) => (
              <li key={role.title}>
                <p className="lead-title">{role.title}</p>
                <p className="lead-org">
                  {role.organization} / {role.period}
                </p>
                <p className="lead-desc">{role.description}</p>
              </li>
            ))}
          </ul>

          <p className="panel-label">Involvement</p>
          <ul className="plain-list">
            {education.involvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
