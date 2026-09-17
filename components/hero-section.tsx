"use client"

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Terminal } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="max-w-4xl flex flex-col items-start">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
          Computer Engineering, Mathematics, and Physics, Rutgers University Honors College
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight leading-[1.08] mb-6">
        Building reliable backend systems and ML infrastructure, from research prototype to production.
      </h1>

      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        Software engineer with experience across Dropbox, AT&T, and stealth startups, shipping data pipelines, inference
        services, and full-stack applications. Currently a senior at the Rutgers University Honors College,
        studying Computer Engineering and Mathematics with a minor in Physics.
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-20">
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          View Selected Work
          <ArrowDown className="h-4 w-4" />
        </a>
        <a
          href="mailto:sv773@scarletmail.rutgers.edu"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-lg bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors shadow-sm border border-border"
        >
          Get in Touch
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-card p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
            Location
          </span>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Monroe Township, NJ</span>
          </div>
        </div>
        <div className="bg-card p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Stack</span>
          <div className="flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground truncate">
              Python / TypeScript / Go / React
            </span>
          </div>
        </div>
        <div className="bg-card p-5 flex flex-col justify-between">
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
            Connect
          </span>
          <div className="flex items-center gap-3">
            <a
              href="mailto:sv773@scarletmail.rutgers.edu"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/samir-varma-1a1166281/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/SamirVarma01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
