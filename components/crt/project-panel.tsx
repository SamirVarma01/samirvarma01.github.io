"use client"

import { useEffect, useRef } from "react"
import { projectNumber } from "./work-index"
import { projects } from "@/lib/content"
import { useDialog } from "@/lib/use-dialog"

/** Full-screen detail view for one project, with prev/next and arrow-key paging. */
export default function ProjectPanel({
  index,
  onClose,
  onNavigate,
}: {
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const rootRef = useRef<HTMLElement>(null)
  const open = index !== null
  useDialog(open, onClose, closeRef, rootRef)

  const n = projects.length
  const prev = index === null ? 0 : (index - 1 + n) % n
  const next = index === null ? 0 : (index + 1) % n

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate(prev)
      if (e.key === "ArrowRight") onNavigate(next)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, prev, next, onNavigate])

  // Start each project at the top of the panel.
  useEffect(() => {
    rootRef.current?.scrollTo({ top: 0 })
  }, [index])

  if (index === null) return null
  const p = projects[index]

  return (
    <article ref={rootRef} className="panel" role="dialog" aria-modal="true" aria-labelledby="panel-title">
      <div className="panel-inner">
        <div className="panel-top">
          <p className="term-label">
            Project / {projectNumber(index)} of {projectNumber(n - 1)}
          </p>
          <button ref={closeRef} type="button" className="panel-close" onClick={onClose}>
            Close [esc]
          </button>
        </div>

        <h2 id="panel-title" className="panel-title dot-type" key={p.id}>
          {p.title}
        </h2>
        {p.status && (
          <p className="status-chip panel-status">
            <span className="status-dot" aria-hidden="true" />
            {p.status}
          </p>
        )}

        <div className="panel-grid">
          <div>
            <p className="panel-label">Info</p>
            <p className="panel-desc">{p.description}</p>
          </div>
          <div>
            <p className="panel-label">Focus</p>
            <ul className="panel-tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="panel-label">Stack</p>
            <ul className="panel-tags">
              {p.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="panel-label">Links</p>
            <ul className="panel-links">
              {p.github && (
                <li>
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              )}
              {p.demo && (
                <li>
                  <a href={p.demo} target="_blank" rel="noopener noreferrer">
                    Live demo
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <nav className="panel-nav" aria-label="More projects">
          <button type="button" onClick={() => onNavigate(prev)}>
            &lt; {projects[prev].title}
          </button>
          <button type="button" onClick={() => onNavigate(next)}>
            {projects[next].title} &gt;
          </button>
        </nav>
      </div>
    </article>
  )
}
