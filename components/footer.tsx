export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Samir Varma. All rights reserved.</span>
        <div className="flex items-center gap-6">
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
