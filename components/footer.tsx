export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://github.com/SamirVarma01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/samir-varma-1a1166281/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:sv773@scarletmail.rutgers.edu"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border"
          >
            sv773@scarletmail.rutgers.edu
          </a>
        </div>
      </div>
    </footer>
  )
}
