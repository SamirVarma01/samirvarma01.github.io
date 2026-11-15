"use client"

import { useEffect, useState } from "react"

export type TermLine = { cmd?: boolean; text: string }

/** Types out shell-style lines one character at a time, ending on a blinking cursor. */
export default function BootTerminal({ lines, startDelay = 500 }: { lines: TermLine[]; startDelay?: number }) {
  const total = lines.reduce((n, l) => n + l.text.length, 0)
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setChars(total)
      return
    }
    let n = 0
    let timer = 0
    const tick = () => {
      n += 1
      setChars(n)
      if (n < total) timer = window.setTimeout(tick, 14 + Math.random() * 28)
    }
    timer = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timer)
  }, [total, startDelay])

  let budget = chars
  return (
    <div className="boot-term" aria-label="Terminal">
      {lines.map((line, i) => {
        const shown = line.text.slice(0, Math.max(0, budget))
        budget -= line.text.length
        if (!shown && i > 0) return null
        return (
          <p key={i} className={line.cmd ? "boot-cmd" : "boot-out"}>
            {line.cmd && <span className="amber">&gt; </span>}
            {shown}
          </p>
        )
      })}
      <span className="boot-cursor" aria-hidden="true" />
    </div>
  )
}
