"use client"

import { useState } from "react"
import Scramble from "./scramble"
import { profile } from "@/lib/content"
import { withBasePath } from "@/lib/utils"

export default function ContactBlock() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <div className="contact">
      <Scramble as="p" className="term-label" text="[05] Get in touch" />
      <h2 className="contact-big dot-type">
        <a href={`mailto:${profile.email}`}>Let&apos;s talk.</a>
      </h2>
      <p className="contact-sub">Open to roles, projects, and collaborations.</p>

      <div className="contact-actions">
        <button type="button" className="contact-copy" onClick={copyEmail} aria-live="polite">
          {copied ? "> copied to clipboard" : `> ${profile.email}`}
        </button>
        <ul className="contact-socials">
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
          <li>
            <a href={withBasePath("/resume.pdf")} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </div>

      <footer className="crt-footer">
        <span>
          {profile.name} &copy;{new Date().getFullYear()}
        </span>
        <a href="#hero">Back to top ^</a>
      </footer>
    </div>
  )
}
