"use client"

import { useEffect, useRef, useCallback } from "react"
import * as rive from "@rive-app/canvas"

export default function Confetti() {
  const confettiAnimation = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    new rive.Rive({
      src: "/animations.riv",
      artboard: "confetti",
      canvas: confettiAnimation.current as HTMLCanvasElement,
      autoplay: true,
    })
  }, [])

  return (
    <div className="max-w-[100vw] max-h-screen overflow-hidden">
      <canvas ref={confettiAnimation} width={1200} height={600} />
    </div>
  )
}
