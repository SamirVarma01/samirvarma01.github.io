import { GraduationCap, Users } from "lucide-react"

const courses = [
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
]

const involvements = [
  "IEEE Honors Society",
  "Engineering Honors Academy",
  "Quantitative Finance Club",
  "Data Science Club",
  "Book Club",
]

const leadership = [
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
]

export default function EducationSection() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2 pb-2">
        <span className="text-xs font-mono text-secondary font-medium tracking-wide">03</span>
        <span className="text-border font-mono text-xs">/</span>
        <h2 className="text-lg font-medium text-foreground tracking-tight uppercase">Education</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 p-6 bg-card border border-border rounded-xl h-full">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="h-5 w-5 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">Rutgers University, New Brunswick</h3>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Honors College</p>
            <p className="text-sm text-muted-foreground">
              B.S. in Computer Engineering, B.S. in Mathematics, Minor in Physics
            </p>
            <p className="text-sm text-muted-foreground">Aug. 2023 – May 2027</p>
            <p className="text-sm font-medium text-foreground mt-1">GPA: 3.936 / 4.000</p>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3">
              Relevant Coursework
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {courses.map((course) => (
                <div
                  key={course}
                  className="px-2.5 py-2 rounded-lg bg-muted text-xs text-foreground text-center leading-snug flex items-center justify-center"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 bg-card border border-border rounded-xl h-full">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-secondary" />
            <h3 className="text-base font-semibold text-foreground">Involvement</h3>
          </div>

          <div className="mb-6">
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3">
              Organizations
            </span>
            <div className="flex flex-col gap-2">
              {involvements.map((involvement) => (
                <div key={involvement} className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground">
                  {involvement}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3">
              Leadership
            </span>
            <div className="flex flex-col gap-4">
              {leadership.map((role) => (
                <div key={role.title} className="border-l-2 border-secondary pl-4">
                  <h4 className="text-sm font-semibold text-foreground">{role.title}</h4>
                  <p className="text-xs text-muted-foreground">{role.organization}</p>
                  <p className="text-xs text-muted-foreground">{role.period}</p>
                  <p className="text-sm text-muted-foreground mt-1.5">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
