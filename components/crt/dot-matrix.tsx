"use client"

import { useEffect, useRef } from "react"
import { createDotEngine, type DotScene } from "@/lib/dot-engine"

/** Fixed, full-viewport dot-matrix display. Changing `scene` dissolves to new text. */
export default function DotMatrix({ scene }: { scene: DotScene }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ReturnType<typeof createDotEngine> | null>(null)
  const sceneKey = JSON.stringify(scene)

  useEffect(() => {
    if (!canvasRef.current) return
    const engine = createDotEngine(canvasRef.current)
    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [])

  useEffect(() => {
    engineRef.current?.setScene(JSON.parse(sceneKey) as DotScene)
  }, [sceneKey])

  return <canvas ref={canvasRef} className="dot-matrix" aria-hidden="true" />
}
