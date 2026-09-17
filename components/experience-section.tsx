import { Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Dropbox",
    location: "San Francisco, CA",
    period: "May 2026 – Present",
    description:
      "Built an automated QBR slide-generation workflow using Flask, LangGraph, Redis, and LangChain, managing service builds with Bazel and integrating live customer data and LLM-generated narratives directly into Google Slides. Engineered a cloud data-grounding layer with Databricks, Spark SQL, and SQLAlchemy, developing three parameterized query sources for trailing-12-month YoY analytics across millions of usage events — reducing QBR preparation time from 4 hours to 10 minutes.",
    skills: ["Python", "Flask", "LangGraph", "LangChain", "Redis", "Bazel", "Databricks", "Spark SQL", "SQLAlchemy"],
  },
  {
    title: "Data Science Intern",
    company: "AT&T",
    location: "Middletown, NJ",
    period: "June 2025 – Aug. 2025",
    description:
      "Built and deployed Isolation Forest-based intrusion detection services to flag malicious IPs from high-volume network telemetry, processing 3M+ traffic records with low-latency inference. Designed modular training and evaluation pipelines with GridSearchCV parameter sweeps, increasing anomaly detection precision to 96%, and engineered a scheduled ETL workflow with Apache Airflow to orchestrate ingestion and feature preprocessing from Azure Databricks for reliable daily model refreshes. Led a team of five engineers in AT&T's Intern Innovation Challenge, building Paladin, a full-stack application that monitors and automatically rolls back malicious changes to secure project files.",
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "React", "Azure Databricks", "Apache Airflow", "GitLab"],
  },
  {
    title: "Software Engineering Intern",
    company: "Cocogen.ai",
    location: "San Francisco, CA",
    period: "Jan. 2025 – Apr. 2025",
    description:
      "Developed AI inference services using FastAPI and PyTorch, containerized with Docker and deployed on Google Cloud Platform, orchestrating computer vision workflows to power automated, user-driven image editing through scalable backend services. Engineered distributed image processing pipelines using OpenCV, Redis, and GCS to batch-process and preprocess 5,000+ images, improving throughput for large-scale computer vision inference.",
    skills: ["Python", "FastAPI", "PyTorch", "OpenCV", "Redis", "Docker", "Google Cloud Platform"],
  },
  {
    title: "Machine Learning Researcher",
    company: "CyberPhysical Intelligence Lab, Rutgers University",
    location: "Piscataway, NJ",
    period: "June 2024 – Apr. 2025",
    description:
      "Advanced autonomous vehicle decision-making by integrating multi-agent reinforcement learning algorithms into a high-fidelity driving simulator. Implemented and fine-tuned neural network architectures for more adaptive, efficient control strategies, and led experimental comparisons between reinforcement learning approaches, contributing to more computationally efficient training pipelines.",
    skills: ["Python", "TensorFlow", "TensorBoard", "Pandas", "Matplotlib", "Git", "Linux"],
  },
  {
    title: "Data Analyst",
    company: "NASA L'SPACE Mission Concept Academy",
    location: "Tempe, AZ",
    period: "May 2024 – Aug. 2024",
    description:
      "Optimized lunar rover subsystem designs through data-driven analyses of component performance and cost-efficiency. Used structured queries and interactive dashboards to identify opportunities for energy savings and cost reduction, visualizing key financial and operational metrics to support mission planning decisions.",
    skills: ["SQL", "Google BigQuery", "Power BI"],
  },
]

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
