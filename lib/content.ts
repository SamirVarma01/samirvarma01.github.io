// Single source of truth for everything the portfolio displays.

export const profile = {
  name: "Samir Varma",
  role: "Software Engineer",
  email: "sv773@scarletmail.rutgers.edu",
  github: "https://github.com/SamirVarma01",
  linkedin: "https://www.linkedin.com/in/samir-varma-1a1166281/",
  location: "Monroe Township, NJ",
  school: "Rutgers University Honors College",
  degrees: "Computer Engineering, Mathematics, and Physics",
  tagline: "Building reliable backend systems and ML infrastructure, from research prototype to production.",
  bio: "Software engineer with experience across Dropbox, AT&T, and stealth startups, shipping data pipelines, inference services, and full-stack applications. Currently a senior at the Rutgers University Honors College, studying Computer Engineering and Mathematics with a minor in Physics.",
  stack: "Python / TypeScript / Go / React",
}

export type Project = {
  id: string
  title: string
  /** One-line summary for compact lists. */
  line: string
  tags: string[]
  description: string
  stack: string[]
  github?: string
  demo?: string
  status?: string
}

export const projects: Project[] = [
  {
    id: "deadbot",
    title: "Deadbot",
    status: "In Development",
    line: "A Discord bot that finds Deadlock players their best teammates.",
    tags: ["Discord Bot", "Data Engineering"],
    description:
      "Discord bot, currently in development, that helps Deadlock players find teammates. Users link and verify a Steam account, and the bot builds playstyle profiles and teammate synergy from match history — inferring premade parties from friend and back-to-back match signals and scoring each pair with a Bayesian-shrunk win rate against an expected baseline. LFG posts and /fill suggest the best-fitting server members by weighting synergy, role coverage, availability, and rank, with a reason for every pick. Deployed with Docker Compose on a 1 GB Azure VM, with scheduled syncs and a bounded Redis cache.",
    stack: ["Python", "PostgreSQL", "Redis", "Alembic", "APScheduler", "Docker"],
    github: "https://github.com/SamirVarma01/deadbot",
  },
  {
    id: "llm-gateway",
    title: "Multi-Provider LLM Gateway",
    line: "An OpenAI-compatible Go gateway with failover, rate limits, and budgets.",
    tags: ["AI Infrastructure", "Distributed Systems"],
    description:
      "OpenAI-compatible gateway in Go that routes requests across OpenAI- and Anthropic-format providers by priority, price, or measured latency, translating between the two APIs with full streaming support. Circuit breakers fail over to a backup provider before the first byte reaches the client, a Redis Lua token bucket enforces per-key rate limits, and a reserve-then-settle Postgres ledger enforces per-key budgets. Under load, a primary-provider outage caused 0 client errors in 1,500 requests, and 20 SIGKILLs of the gateway left 0 double charges or ledger discrepancies.",
    stack: ["Go", "PostgreSQL", "Redis", "Docker", "Prometheus"],
    github: "https://github.com/SamirVarma01/Multi-Provider-LLM-Gateway",
  },
  {
    id: "task-queue",
    title: "Distributed Task Queue & Agent Runtime",
    line: "A crash-proof task queue with a durable runtime for LLM agents.",
    tags: ["Distributed Systems", "AI Infrastructure"],
    description:
      "Distributed task queue built on Redis Streams and MySQL with at-least-once delivery, heartbeat-based crash recovery, exponential-backoff retries, and per-task timeouts — a chaos test that repeatedly SIGKILLs workers mid-run lost 0 of 10,000 tasks. On top of the queue sits a durable runtime for LLM tool-calling agents that checkpoints every LLM and tool call, resumes mid-run after a crash, never repeats a side-effecting tool call, and enforces token and cost budgets across Claude and OpenAI.",
    stack: ["Python", "FastAPI", "Redis Streams", "MySQL", "Docker"],
    github: "https://github.com/SamirVarma01/Distributed-Task-Queue",
  },
  {
    id: "pokemon-rl",
    title: "Distributed Pokémon RL Training",
    line: "Offline RL for Pokémon battles, scaled across A100s on Perlmutter.",
    tags: ["Distributed Deep Learning", "Reinforcement Learning"],
    description:
      "Team project for a Distributed Deep Learning course reproducing Metamon, an offline RL agent for competitive Pokémon battles, on NERSC's Perlmutter supercomputer. Trains a 15M-parameter policy with behavior cloning on Gen 1 OU human replays, then measures scaling from 1 to 4 and 8 A100 GPUs with PyTorch DDP — instrumenting per-step throughput and memory, and scoring held-out action-prediction accuracy against the paper's released checkpoint.",
    stack: ["Python", "PyTorch", "DDP", "Slurm", "Weights & Biases"],
    github: "https://github.com/SamirVarma01/DDLS-Pokemon-RL-Project",
  },
  {
    id: "nexusml",
    title: "NexusML",
    line: "Git-integrated model versioning with a batching Go inference proxy.",
    tags: ["ML Infrastructure", "Go", "FastAPI"],
    description:
      "Two-plane ML infrastructure platform combining Git-integrated model versioning with cloud storage (S3/GCS) and a high-performance inference stack — a Go proxy with dynamic request batching in front of a Python FastAPI model server. Lets data scientists track, deploy, and serve models reproducibly with low-latency prediction.",
    stack: ["Go", "Python", "Docker", "AWS S3", "GCP", "FastAPI"],
    github: "https://github.com/SamirVarma01/NexusML",
  },
  {
    id: "pokechat",
    title: "PokéChat",
    line: "AI-powered competitive team analysis with live meta trends.",
    tags: ["Full-Stack", "AI"],
    description:
      "Competitive team-analysis web app pairing an AI-powered FastAPI backend with a Next.js frontend. Built scraping pipelines for real-time strategic data, then layered on team validation and meta-trend visualization using Chart.js and the OpenAI API to help users evaluate compositions and track competitive trends.",
    stack: ["FastAPI", "Next.js", "Chart.js", "OpenAI API", "Python"],
    github: "https://github.com/SamirVarma01/PokeChat",
  },
  {
    id: "nextlevel",
    title: "NextLevel",
    line: "A social platform for game reviews with 100+ active users.",
    tags: ["Full-Stack", "Community Platform"],
    description:
      "Social platform for game reviews with account management, interactive feedback, and automatic image processing. Integrated with a large external game database for catalog coverage, with infrastructure built to scale alongside a growing user base — currently 100+ active users.",
    stack: ["Node.js", "MongoDB", "React", "TypeScript", "AWS Lambda", "Next.js"],
    github: "https://github.com/SamirVarma01/NextLevel",
    demo: "https://next-level-eight-zeta.vercel.app/",
  },
]

export type Experience = {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
}

export const experiences: Experience[] = [
  {
    title: "Software Engineering Intern",
    company: "Dropbox",
    location: "San Francisco, CA",
    period: "May 2026 – Aug. 2026",
    description:
      "Built an agentic Quarterly Business Review deck-generation service in Python and Flask, orchestrating LLM narrative steps with LangGraph over live customer data, with Redis-backed state and Bazel-managed service builds. Engineered a cloud data-grounding layer using Databricks SQL and SQLAlchemy with 11 parameterized query sources for trailing-12-month YoY analytics, cutting QBR drafting time by 95%. Designed a conversational editing pipeline with parallel data grounding, structured LLM outputs, schema-validated block mutations, optimistic concurrency control, and audit logging, achieving a 92% task success rate.",
    skills: ["Python", "Flask", "LangGraph", "Redis", "Bazel", "Databricks SQL", "SQLAlchemy"],
  },
  {
    title: "Data Science Intern",
    company: "AT&T",
    location: "Middletown, NJ",
    period: "June 2025 – Aug. 2025",
    description:
      "Built and deployed Isolation Forest-based intrusion detection services to flag malicious IPs from high-volume network telemetry, processing 3M+ traffic records with low-latency inference. Designed modular training and evaluation pipelines with GridSearchCV parameter sweeps, increasing anomaly detection precision to 96%, and engineered a scheduled ETL workflow with Apache Airflow to orchestrate ingestion, validation, and feature preprocessing from Azure Databricks for reliable daily model refreshes. Led a team of five engineers in AT&T's Intern Innovation Challenge, building Paladin, a full-stack application that monitors and automatically rolls back malicious changes to secure project files.",
    skills: ["Python", "Scikit-Learn", "Pandas", "NumPy", "React", "Azure Databricks", "Apache Airflow", "GitLab"],
  },
  {
    title: "Software Engineering Intern",
    company: "Coco Labs",
    location: "San Francisco, CA",
    period: "Jan. 2025 – Apr. 2025",
    description:
      "Developed AI inference services using FastAPI and PyTorch, containerized with Docker and deployed on Google Cloud Platform, orchestrating computer vision workflows to power automated, user-driven image editing through scalable backend services. Engineered distributed image processing pipelines using OpenCV, Redis, and GCS to batch-process and preprocess 5,000+ images, improving throughput for large-scale computer vision inference.",
    skills: ["Python", "FastAPI", "PyTorch", "OpenCV", "Redis", "Docker", "Google Cloud Platform"],
  },
  {
    title: "Machine Learning Research Assistant",
    company: "CyberPhysical Intelligence Lab, Rutgers University",
    location: "Piscataway, NJ",
    period: "June 2024 – Apr. 2025",
    description:
      "Implemented Actor–Critic reinforcement learning agents in PyTorch within the CARLA autonomous driving simulator, designing modular policy and value networks that improved average episode reward by 14%. Developed an evaluation framework that ran DQN and Actor–Critic experiments across parallel simulation runs, logging reward curves, convergence, and policy stability for reproducible comparison.",
    skills: ["Python", "PyTorch", "CARLA", "TensorBoard", "Pandas", "Matplotlib", "Git", "Linux"],
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

export const education = {
  school: "Rutgers University, New Brunswick",
  college: "Honors College",
  degree: "B.S. in Computer Engineering, B.S. in Mathematics, Minor in Physics",
  period: "Aug. 2023 – May 2027",
  gpa: "3.936 / 4.000",
  courses: [
    "Data Structures and Algorithms",
    "Computer Architecture",
    "Database Management",
    "Software Engineering",
    "Linear Algebra",
    "Multivariable Calculus",
    "Differential Equations",
    "Probability and Random Processes",
    "Machine Learning",
    "Distributed Deep Learning Systems",
    "Mathematical Reasoning",
    "Principles of Electrical Engineering I",
    "Principles of Electrical Engineering II",
    "Digital Logic Design",
    "Programming Methodology I",
    "Programming Methodology II",
    "Linear Systems and Signals",
    "Electronic Devices and Circuits",
    "Introduction to Computer Systems",
    "Real Analysis I",
    "Abstract Algebra I",
  ],
  involvements: [
    "IEEE Honors Society",
    "Engineering Honors Academy",
    "Quantitative Finance Club",
    "Data Science Club",
    "Book Club",
  ],
  leadership: [
    {
      title: "Head of Event Organization",
      organization: "Engineering Honors Academy Events Committee",
      period: "Jan. 2024 – Present",
      description:
        "Spearheaded professional events, fostering an inclusive environment for 250+ engineering honors academy scholars.",
    },
    {
      title: "Discussion Group Leader",
      organization: "Rutgers Engineers Assessing Literature",
      period: "Feb. 2024 – Present",
      description:
        "Led biweekly meetings with honors engineering scholars to collaboratively discuss literary works, including research papers and novels.",
    },
  ],
}

export const skillCategories = [
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
