"use client"

import { useEffect, useRef } from "react"
import { profile } from "@/lib/content"
import { withBasePath } from "@/lib/utils"

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      opener?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="menu" role="dialog" aria-modal="true" aria-label="Menu">
      <button ref={closeRef} type="button" className="menu-close" onClick={onClose}>
        Close [esc]
      </button>
      <p className="menu-brand dot-type">{profile.name}</p>
      <ul className="menu-list">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} onClick={onClose}>
              <span>{item.label}</span>
              <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
            </a>
          </li>
        ))}
        <li>
          <a href={withBasePath("/resume.pdf")} target="_blank" rel="noopener noreferrer">
            <span>Resume</span>
            <span className="menu-num">{String(NAV_ITEMS.length + 1).padStart(2, "0")}</span>
          </a>
        </li>
      </ul>
      <ul className="menu-socials">
        <li>
          <a href={`mailto:${profile.email}`}>Email</a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
      <div className="menu-foot">
        <span>{profile.school}</span>
        <span>&copy;{new Date().getFullYear()}</span>
      </div>
    </div>
  )
}
