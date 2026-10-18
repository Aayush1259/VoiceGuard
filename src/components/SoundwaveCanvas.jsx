import React, { useEffect, useRef } from 'react'

export function SoundwaveCanvas({ isActive = false, isAlert = false, height = 48 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let phase = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const numBars = 24
      const barWidth = 3
      const gap = (canvas.width - numBars * barWidth) / (numBars - 1)

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + gap)
        let amplitude = 4
        if (isActive) {
          // Dynamic harmonic sound wave simulation
          const wave1 = Math.sin(phase + i * 0.4)
          const wave2 = Math.cos(phase * 1.5 + i * 0.25)
          amplitude = Math.max(6, Math.abs(wave1 * 0.6 + wave2 * 0.4) * (canvas.height * 0.8))
        }

        const y = (canvas.height - amplitude) / 2

        // Gradient styling
        const grad = ctx.createLinearGradient(0, y, 0, y + amplitude)
        if (isAlert) {
          grad.addColorStop(0, '#f43f5e')
          grad.addColorStop(1, '#e11d48')
        } else {
          grad.addColorStop(0, '#0d9488')
          grad.addColorStop(0.5, '#14b8a6')
          grad.addColorStop(1, '#10b981')
        }

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, amplitude, 2)
        ctx.fill()
      }

      phase += 0.08
      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [isActive, isAlert])

  return (
    <div className="w-full flex items-center justify-center py-1">
      <canvas
        ref={canvasRef}
        width={220}
        height={height}
        className="w-full max-w-[220px] rounded-lg"
      />
    </div>
  )
}
