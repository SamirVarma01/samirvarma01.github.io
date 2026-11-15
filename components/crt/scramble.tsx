"use client"

import { useCallback, useEffect, useRef, type ElementType } from "react"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>_=+"

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Text that resolves out of random glyphs the first time it scrolls into view,
 * and again on hover when `onHover` is set. The real text is always in the DOM
 * for screen readers via aria-label.
 */
export default function Scramble({
  text,
  as: Tag = "span",
  className,
  duration = 650,
  onHover = false,
}: {
  text: string
  as?: ElementType
  className?: string
  duration?: number
  onHover?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(0)

  const run = useCallback(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    cancelAnimationFrame(frame.current)
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      let out = ""
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        out += i < revealed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      el.textContent = out
      if (p < 1) frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
  }, [text, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [run])

  return (
    <Tag ref={ref} className={className} aria-label={text} onMouseEnter={onHover ? run : undefined}>
      {text}
    </Tag>
  )
}
