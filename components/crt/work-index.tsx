"use client"

import Scramble from "./scramble"
import { projects } from "@/lib/content"

export const projectNumber = (i: number) => String(i + 1).padStart(2, "0")

export default function WorkIndex({
  onOpen,
  onHover,
}: {
  onOpen: (index: number) => void
  onHover: (index: number | null) => void
}) {
  return (
    <div className="section-wrap">
      <header className="section-head">
        <span className="term-label">[01]</span>
        <Scramble as="h2" className="section-title dot-type" text="Selected Work" />
        <span className="term-label">{projects.length} projects</span>
      </header>

      <ol className="work-list" onMouseLeave={() => onHover(null)}>
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              className="work-row"
              onClick={() => onOpen(i)}
              onMouseEnter={() => onHover(i)}
              onFocus={() => onHover(i)}
              onBlur={() => onHover(null)}
              aria-haspopup="dialog"
            >
              <span className="work-num">[{projectNumber(i)}]</span>
              <span className="work-main">
                <span className="work-title">
                  {p.title}
                  {p.status && (
                    <span className="status-chip">
                      <span className="status-dot" aria-hidden="true" />
                      {p.status}
                    </span>
                  )}
                </span>
                <span className="work-line">{p.line}</span>
              </span>
              <span className="work-stack">{p.stack.slice(0, 3).join(" / ")}</span>
              <span className="work-open" aria-hidden="true">
                Open &gt;
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
