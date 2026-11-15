import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { projects } from "@/lib/content"

export default function ProjectsSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-secondary font-medium tracking-wide">02</span>
          <span className="text-border font-mono text-xs">/</span>
          <h2 className="text-lg font-medium text-foreground tracking-tight uppercase">Selected Work</h2>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{projects.length} projects</span>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="w-full bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm card-hover"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.status && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-secondary/40 bg-secondary/10 text-secondary font-mono text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                    {project.status}
                  </span>
                )}
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-mono text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-foreground tracking-tight">{project.title}</h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded border border-border text-xs text-foreground font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-secondary transition-colors group"
                  >
                    <Github className="h-4 w-4" />
                    Code
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-secondary transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
