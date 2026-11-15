// Canvas engine for the full-screen dot-matrix display.
// Text is rasterized into a low-res grid (one pixel per dot), and every dot eases
// toward its target brightness at its own speed, so scene changes dissolve in.

export type DotAlign = "left" | "right" | "center"

export type DotScene = {
  lines: string[]
  /** Peak brightness of lit dots, 0..1. */
  intensity: number
  align: DotAlign
  /** Vertical anchor: middle of the screen, or pinned to the bottom edge. */
  anchor: "middle" | "bottom"
}

type Engine = {
  setScene(scene: DotScene): void
  destroy(): void
}

const LEVELS = 18
const AMBER = [255, 176, 0] as const
const POINTER_RADIUS = 120

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export function createDotEngine(canvas: HTMLCanvasElement): Engine {
  const ctx = canvas.getContext("2d")
  if (!ctx) return { setScene() {}, destroy() {} }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  let width = 0
  let height = 0
  let cell = 8
  let cols = 0
  let rows = 0
  let cur = new Float32Array(0)
  let target = new Float32Array(0)
  let speed = new Float32Array(0)
  let phase = new Float32Array(0)
  let sprites: HTMLCanvasElement[] = []
  let scene: DotScene = { lines: [], intensity: 0, align: "left", anchor: "middle" }

  const pointer = { x: -1e4, y: -1e4 }
  const glitch = { row: 0, span: 0, until: 0, next: 3 }
  let raf = 0
  let last = 0
  let time = 0

  function buildSprites() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const size = cell * 2
    sprites = []
    for (let l = 0; l < LEVELS; l++) {
      const b = (l + 1) / LEVELS
      const sp = document.createElement("canvas")
      sp.width = sp.height = Math.ceil(size * dpr)
      const g = sp.getContext("2d")!
      g.scale(dpr, dpr)
      const c = size / 2
      const [r, gr, bl] = AMBER
      // Halo only for brighter dots, so the unlit panel stays crisp.
      if (b > 0.3) {
        const halo = g.createRadialGradient(c, c, 0, c, c, cell * 0.95)
        halo.addColorStop(0, `rgba(${r},${gr},${bl},${0.32 * b})`)
        halo.addColorStop(1, `rgba(${r},${gr},${bl},0)`)
        g.fillStyle = halo
        g.fillRect(0, 0, size, size)
      }
      // Hot dots shift toward white, like an overdriven phosphor.
      const mix = clamp((b - 0.8) / 0.2, 0, 1) * 0.3
      const cr = Math.round(r + (255 - r) * mix)
      const cg = Math.round(gr + (255 - gr) * mix)
      const cb = Math.round(bl + (255 - bl) * mix)
      g.fillStyle = `rgba(${cr},${cg},${cb},${0.18 + 0.82 * b})`
      g.beginPath()
      g.arc(c, c, cell * (0.2 + 0.16 * b), 0, Math.PI * 2)
      g.fill()
      sprites.push(sp)
    }
  }

  function rasterize(s: DotScene) {
    const out = new Float32Array(cols * rows)
    if (!s.lines.length || s.intensity <= 0) return out

    const off = document.createElement("canvas")
    off.width = cols
    off.height = rows
    const g = off.getContext("2d", { willReadFrequently: true })!

    const narrow = width < 760
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-sans").trim() || "Arial Black, sans-serif"
    const maxW = cols * (narrow ? 0.9 : s.align === "center" ? 0.82 : 0.6)
    const maxH = rows * (s.anchor === "middle" ? (narrow ? 0.42 : 0.6) : 0.34)

    let size = Math.floor(maxH / (s.lines.length * 0.95))
    g.font = `900 ${size}px ${family}`
    const widest = Math.max(...s.lines.map((line) => g.measureText(line).width))
    if (widest > maxW) size = Math.floor((size * maxW) / widest)
    size = Math.max(size, 5)
    g.font = `900 ${size}px ${family}`

    const lineH = size * 0.95
    const blockH = lineH * s.lines.length
    const padX = Math.round(cols * (narrow ? 0.05 : 0.045))
    const padY = Math.round(rows * 0.08)

    let x = padX
    g.textAlign = "left"
    if (s.align === "right") {
      x = cols - padX
      g.textAlign = "right"
    } else if (s.align === "center") {
      x = cols / 2
      g.textAlign = "center"
    }

    let top: number
    if (s.anchor === "bottom") top = rows - padY - blockH
    else top = (narrow ? rows * 0.4 : rows * 0.5) - blockH / 2

    g.fillStyle = "#fff"
    g.textBaseline = "alphabetic"
    s.lines.forEach((line, i) => g.fillText(line, x, top + (i + 1) * lineH - size * 0.14))

    const data = g.getImageData(0, 0, cols, rows).data
    for (let i = 0; i < out.length; i++) {
      const a = data[i * 4 + 3] / 255
      // Hard threshold keeps the letterforms legible at dot resolution.
      out[i] = (a > 0.42 ? 1 : a * 0.6) * s.intensity
    }
    return out
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = window.innerWidth
    height = window.innerHeight
    cell = clamp(Math.round(width / 150), 6, 11)
    cols = Math.ceil(width / cell) + 1
    rows = Math.ceil(height / cell) + 1

    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    const n = cols * rows
    cur = new Float32Array(n)
    speed = new Float32Array(n)
    phase = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      speed[i] = 1.8 + Math.random() * 7
      phase[i] = Math.random() * Math.PI * 2
    }
    buildSprites()
    target = rasterize(scene)
    if (reduceMotion) {
      cur.set(target)
      draw()
    }
  }

  function draw() {
    const c = ctx!
    c.clearRect(0, 0, width, height)
    const glitching = !reduceMotion && time < glitch.until
    const r2 = POINTER_RADIUS * POINTER_RADIUS
    const off = cell

    for (let y = 0; y < rows; y++) {
      const py = y * cell + cell / 2
      const shift = glitching && y >= glitch.row && y < glitch.row + glitch.span ? cell * 2 : 0
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const px = x * cell + cell / 2 + shift
        let b = cur[i]

        if (!reduceMotion) {
          const dx = px - pointer.x
          const dy = py - pointer.y
          const d2 = dx * dx + dy * dy
          if (d2 < r2) {
            const k = 1 - Math.sqrt(d2) / POINTER_RADIUS
            b += k * k * (b > 0.3 ? 0.35 : 0.45)
          }
        }

        // Unlit panel: a faint, slowly drifting shimmer.
        const base = reduceMotion ? 0.06 : 0.055 + 0.03 * Math.sin(x * 0.09 + y * 0.06 + time * 0.7 + phase[i] * 0.25)
        if (b < base) b = base

        const level = Math.min(LEVELS - 1, Math.floor(b * LEVELS))
        c.drawImage(sprites[level], px - off, py - off, off * 2, off * 2)
      }
    }
  }

  function frame(now: number) {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016)
    last = now
    time += dt

    for (let i = 0; i < cur.length; i++) {
      cur[i] += (target[i] - cur[i]) * (1 - Math.exp(-speed[i] * dt))
    }

    if (time > glitch.next) {
      glitch.row = Math.floor(Math.random() * rows)
      glitch.span = 1 + Math.floor(Math.random() * 3)
      glitch.until = time + 0.09 + Math.random() * 0.08
      glitch.next = time + 4 + Math.random() * 5
    }

    draw()
    raf = requestAnimationFrame(frame)
  }

  const onPointer = (e: PointerEvent) => {
    pointer.x = e.clientX
    pointer.y = e.clientY
  }
  const onLeave = () => {
    pointer.x = pointer.y = -1e4
  }

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(resize, 120)
  }

  resize()
  window.addEventListener("resize", onResize)
  if (!reduceMotion) {
    window.addEventListener("pointermove", onPointer, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(frame)
  }

  // Re-rasterize once web fonts land so the letterforms use the real typeface.
  document.fonts?.ready.then(() => {
    target = rasterize(scene)
    if (reduceMotion) {
      cur.set(target)
      draw()
    }
  })

  return {
    setScene(next) {
      scene = next
      target = rasterize(next)
      if (reduceMotion) {
        cur.set(target)
        draw()
        return
      }
      // A short burst of static, then everything settles toward the new frame.
      for (let i = 0; i < cur.length; i++) {
        if (Math.random() < 0.08) cur[i] = Math.random() * 0.7
      }
    },
    destroy() {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onPointer)
      document.documentElement.removeEventListener("pointerleave", onLeave)
    },
  }
}
