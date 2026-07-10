import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  range?: number
  speed?: number
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  range = 0.35, // scale of attraction
  speed = 0.3,
  className = '',
  ...props
}) => {
  const elRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: speed, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: speed, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = el.getBoundingClientRect()
      
      const x = clientX - (rect.left + rect.width / 2)
      const y = clientY - (rect.top + rect.height / 2)
      
      const distance = Math.sqrt(x * x + y * y)
      const triggerArea = rect.width * 1.5

      if (distance < triggerArea) {
        xTo(x * range)
        yTo(y * range)
      } else {
        xTo(0)
        yTo(0)
      }
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [range, speed])

  return (
    <button ref={elRef} className={`${className} inline-block`} {...props}>
      {children}
    </button>
  )
}
