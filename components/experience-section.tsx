import { Calendar, MapPin } from "lucide-react"
import { experiences } from "@/lib/content"

export default function ExperienceSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs font-mono text-secondary font-medium tracking-wide">01</span>
        <span className="text-border font-mono text-xs">/</span>
        <h2 className="text-lg font-medium text-foreground tracking-tight uppercase">Experience</h2>
      </div>

      <div className="flex flex-col gap-6">
        {experiences.map((exp) => (
          <div key={`${exp.title}-${exp.company}`} className="p-6 bg-card border border-border rounded-xl">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">{exp.title}</h3>
                <p className="text-sm text-secondary font-medium">{exp.company}</p>
              </div>
              <div className="flex flex-col md:items-end gap-1 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{exp.location}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded border border-border text-xs text-foreground font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
