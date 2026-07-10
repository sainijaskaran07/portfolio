import React, { useEffect, useRef } from 'react'

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000 }
    let lastScrollY = window.scrollY

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX
      mouse.ty = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.tx = -1000
      mouse.ty = -1000
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initDots()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    interface Dot {
      x: number
      y: number
      ox: number
      oy: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    let dots: Dot[] = []
    const spacing = 35

    const initDots = () => {
      dots = []
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            ox: c * spacing,
            oy: r * spacing,
            vx: 0,
            vy: 0,
            size: 1.2,
            alpha: 0.12,
          })
        }
      }
    }

    initDots()

    const animate = () => {
      ctx.fillStyle = '#040606'
      ctx.fillRect(0, 0, width, height)

      // Calculate scroll difference
      const currentScrollY = window.scrollY
      const scrollDiff = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Smooth mouse interpolation
      if (mouse.tx !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.tx
          mouse.y = mouse.ty
        } else {
          mouse.x += (mouse.tx - mouse.x) * 0.1
          mouse.y += (mouse.ty - mouse.y) * 0.1
        }
      } else {
        mouse.x = -1000
        mouse.y = -1000
      }

      dots.forEach((dot) => {
        // If there was scrolling, add vertical impulse velocity to dots (lag effect)
        if (Math.abs(scrollDiff) > 0.05) {
          dot.vy += scrollDiff * 0.06
        }

        let dx = 0
        let dy = 0
        let dist = 99999

        if (mouse.x !== -1000) {
          dx = mouse.x - dot.x
          dy = mouse.y - dot.y
          dist = Math.sqrt(dx * dx + dy * dy)
        }

        const maxDist = 100

        if (dist < maxDist) {
          // Mouse repulsion force
          const force = (maxDist - dist) / maxDist
          const angle = Math.atan2(dy, dx)
          const targetX = dot.ox - Math.cos(angle) * force * 12
          const targetY = dot.oy - Math.sin(angle) * force * 12
          
          dot.vx += (targetX - dot.x) * 0.2
          dot.vy += (targetY - dot.y) * 0.2
          
          dot.alpha = 0.12 + force * 0.38
          dot.size = 1.2 + force * 2.2
        } else {
          // Spring back force to original grid anchors
          dot.vx += (dot.ox - dot.x) * 0.08
          dot.vy += (dot.oy - dot.y) * 0.08
          dot.alpha += (0.12 - dot.alpha) * 0.08
          dot.size += (1.2 - dot.size) * 0.08
        }

        // Apply friction drag
        dot.vx *= 0.82
        dot.vy *= 0.82

        dot.x += dot.vx
        dot.y += dot.vy

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist
          // Transition to Imperial Red (#FF3347 - RGB: 255, 51, 71)
          const g = Math.round(255 - (255 - 51) * force)
          const b = Math.round(255 - (255 - 71) * force)
          ctx.fillStyle = `rgba(255, ${g}, ${b}, ${dot.alpha})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`
        }
        
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block h-full w-full bg-background"
    />
  )
}
