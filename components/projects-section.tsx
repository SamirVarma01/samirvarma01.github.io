import { ArrowUpRight, ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "NexusML",
    tags: ["ML Infrastructure", "Go", "FastAPI"],
    description:
      "Two-plane ML infrastructure platform combining Git-integrated model versioning with cloud storage (S3/GCS) and a high-performance inference stack — a Go proxy with dynamic request batching in front of a Python FastAPI model server. Lets data scientists track, deploy, and serve models reproducibly with low-latency prediction.",
    stack: ["Go", "Python", "Docker", "AWS S3", "GCP", "FastAPI"],
    github: "https://github.com/SamirVarma01/NexusML",
  },
  {
    title: "PokéChat",
    tags: ["Full-Stack", "AI"],
    description:
      "Competitive team-analysis web app pairing an AI-powered FastAPI backend with a Next.js frontend. Built scraping pipelines for real-time strategic data, then layered on team validation and meta-trend visualization using Chart.js and the OpenAI API to help users evaluate compositions and track competitive trends.",
    stack: ["FastAPI", "Next.js", "Chart.js", "OpenAI API", "Python"],
    github: "https://github.com/SamirVarma01/PokeChat",
  },
  {
    title: "NextLevel",
    tags: ["Full-Stack", "Community Platform"],
    description:
      "Social platform for game reviews with account management, interactive feedback, and automatic image processing. Integrated with a large external game database for catalog coverage, with infrastructure built to scale alongside a growing user base — currently 100+ active users.",
    stack: ["Node.js", "MongoDB", "React", "TypeScript", "AWS Lambda", "Next.js"],
    github: "https://github.com/SamirVarma01/NextLevel",
    demo: "https://next-level-eight-zeta.vercel.app/",
  },
  {
    title: "Paladin",
    tags: ["Security", "AT&T Internship"],
    description:
      "Security-focused alert system for monitoring and protecting IoT infrastructure at large-scale events, built during AT&T's TDP Intern Innovation Challenge. Detects unauthorized changes to critical system files and automatically rolls them back, integrating with AT&T's Dynamic Defense framework to flag suspicious network activity. Led as primary backend developer and team manager for a team of five engineers.",
    stack: ["Flask", "MySQL", "React", "Tailwind CSS", "Next.js"],
  },
  {
    title: "TF-Trades",
    tags: ["Marketplace", "Automation"],
    description:
      "Dynamic marketplace platform for a video game's in-game item economy, combining automated trade tracking with a user-facing interface. Integrated data from multiple trading platforms and adapted a custom bot to identify and execute profitable trades in real time, with a frontend surfacing historical pricing trends.",
    stack: ["Go", "PostgreSQL", "React", "Next.js", "TypeScript", "Python", "Selenium"],
    github: "https://github.com/SamirVarma01/TF-Trades",
  },
  {
    title: "Game-Theoretic Battle Agent",
    tags: ["Applied Game Theory", "Reinforcement Learning"],
    description:
      "AI agent applying game theory to real-time strategic decision-making, competing against human players on an online platform. Combined probabilistic modeling with state analysis to evaluate possible actions under uncertainty, alongside a companion tool for visualizing and refining performance over time.",
    stack: ["C++", "Python", "C#", "Scikit-Learn", "WebSockets", "NumPy"],
    github: "https://github.com/SamirVarma01/Game-Theory-in-Pokemon",
  },
]

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
