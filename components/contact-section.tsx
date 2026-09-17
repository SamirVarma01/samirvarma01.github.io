"use client"

import { useState } from "react"
import { Check, Copy, Download, Github, Linkedin } from "lucide-react"
import { withBasePath } from "@/lib/utils"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const email = "sv773@scarletmail.rutgers.edu"

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-8 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-sm">
      <div className="max-w-xl space-y-3">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider">
            Open to Summer 2027 opportunities
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
          Let&apos;s talk about a role, project, or collaboration.
        </h2>
        <p className="text-sm text-muted-foreground">
          Reach out directly by email, or connect on LinkedIn and GitHub.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <button
          onClick={copyEmail}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-background border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors shadow-sm"
        >
          {copied ? <Check className="h-4 w-4 text-secondary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
          <span>{copied ? "Copied to clipboard" : email}</span>
        </button>
        <a
          href={withBasePath("/resume.pdf")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          Download Resume
          <Download className="h-4 w-4" />
        </a>
        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/samir-varma-1a1166281/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3 rounded-lg bg-background border border-border text-foreground hover:bg-muted transition-colors shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/SamirVarma01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-3 rounded-lg bg-background border border-border text-foreground hover:bg-muted transition-colors shadow-sm"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
