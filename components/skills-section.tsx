const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "C++", "Go", "Java", "C#", "SQL", "R", "HTML", "CSS", "MATLAB"],
  },
  {
    name: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "TensorFlow",
      "PyTorch",
      "FastAPI",
      "Flask",
      "Django",
      "LangChain",
      "LangGraph",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "Tailwind CSS",
    ],
  },
  {
    name: "Infrastructure & Tools",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "GCP",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "MLflow",
      "Apache Airflow",
      "Databricks",
      "Spark SQL",
      "SQLAlchemy",
      "Redis",
      "Bazel",
    ],
  },
]

export default function SkillsSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs font-mono text-secondary font-medium tracking-wide">04</span>
        <span className="text-border font-mono text-xs">/</span>
        <h2 className="text-lg font-medium text-foreground tracking-tight uppercase">Skills</h2>
      </div>

      <div className="flex flex-col gap-6">
        {skillCategories.map((category) => (
          <div key={category.name} className="p-6 bg-card border border-border rounded-xl">
            <h3 className="text-sm font-semibold text-foreground mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-muted text-sm text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
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
