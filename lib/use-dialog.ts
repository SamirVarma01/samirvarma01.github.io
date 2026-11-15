"use client"

import { useEffect, useRef, type RefObject } from "react"

/**
 * Shared behavior for full-screen overlays: focus the given element on open,
 * lock page scroll, close on Escape, keep Tab inside the overlay, and return
 * focus to whatever opened it.
 */
export function useDialog(
  open: boolean,
  onClose: () => void,
  initialFocus: RefObject<HTMLElement | null>,
  container: RefObject<HTMLElement | null>,
) {
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    initialFocus.current?.focus()
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current()
        return
      }
      if (e.key !== "Tab" || !container.current) return
      const focusable = container.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      opener?.focus()
    }
  }, [open, initialFocus, container])
}
