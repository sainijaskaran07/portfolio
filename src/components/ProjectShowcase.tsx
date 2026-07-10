import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, BookOpen, Circle } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

interface ProjectProps {
  number: string
  title: string
  status: string
  description: string
  tech: string[]
  image: string
  onOpenCaseStudy: () => void
  liveUrl: string
  githubUrl: string
  layout: 'image-left' | 'image-right'
}

export const ProjectShowcase: React.FC<ProjectProps> = ({
  number,
  title,
  status,
  description,
  tech,
  image,
  onOpenCaseStudy,
  liveUrl,
  githubUrl,
  layout,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const imgContainer = imageContainerRef.current
    const img = imageRef.current
    const textEl = textRef.current
    if (!container || !imgContainer || !img || !textEl) return

    // 1. Entry scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Reveal number & status
    tl.fromTo(
      textEl.querySelectorAll('.anim-top'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0
    )

    // Reveal title (word reveal)
    tl.fromTo(
      textEl.querySelectorAll('.anim-title'),
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.05 },
      0.1
    )

    // Reveal description
    tl.fromTo(
      textEl.querySelector('.anim-desc'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.3
    )

    // Reveal tech tags
    tl.fromTo(
      textEl.querySelectorAll('.anim-tag'),
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.03 },
      0.4
    )

    // Reveal buttons
    tl.fromTo(
      textEl.querySelectorAll('.anim-btn-container'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.05 },
      0.5
    )

    // Reveal Image with custom mask/clip-path fade-in
    tl.fromTo(
      imgContainer,
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.1 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'power4.inOut' },
      0
    )

    // 2. Parallax scaling & rotation on scroll trigger
    gsap.fromTo(
      img,
      { yPercent: -10, scale: 1.1 },
      {
        yPercent: 10,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }, [])

  // 3D Tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageContainerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const rotateX = (yc - y) / 18
    const rotateY = (x - xc) / 18
    
    gsap.to(el, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    })

    el.style.setProperty('--glow-x', `${x}px`)
    el.style.setProperty('--glow-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    const el = imageContainerRef.current
    if (!el) return
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen w-full flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 py-20 px-6 md:px-16 lg:px-24 border-b border-white/[0.03] relative z-10 ${
        layout === 'image-right' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Visual background line anchor for each section */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div
          ref={imageContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onOpenCaseStudy}
          className="relative w-full aspect-video overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group/image cursor-pointer will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* Subtle Glow Ring */}
          <div className="absolute inset-0 rounded-xl border border-white/5 group-hover/image:border-primary/20 transition-colors duration-500 z-20 pointer-events-none" />

          {/* Interactive Mouse Glow Spot */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(350px circle at var(--glow-x, 0px) var(--glow-y, 0px), rgba(255, 51, 71, 0.12), transparent 80%)`,
            }}
          />

          {/* Sins & Roses Editorial Text Overlay */}
          {number === "01" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 pointer-events-none group-hover/image:bg-black/20 transition-colors duration-500">
              <h3 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-white/90 tracking-wide uppercase select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                Sins & Roses
              </h3>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 mt-2 font-display">Est. 2026</span>
            </div>
          )}

          {/* Chithiyan Luxury Script Text Overlay */}
          {number === "02" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 pointer-events-none group-hover/image:bg-black/20 transition-colors duration-500">
              <h3 className="font-display font-light tracking-[0.2em] text-4xl sm:text-5xl lg:text-6xl text-white/95 uppercase select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                Chithiyan
              </h3>
              <span className="text-[9px] uppercase tracking-[0.4em] text-primary mt-2 font-sans font-bold">Luxury Gifting</span>
            </div>
          )}

          {/* Project Image */}
          <img
            ref={imageRef}
            src={image}
            alt={title}
            className="w-full h-full object-cover scale-110 will-change-transform select-none"
          />
          
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content Section */}
      <div ref={textRef} className="w-full md:w-1/2 flex flex-col justify-center">
        {/* Project Number & Status */}
        <div className="flex items-center gap-4 mb-4 text-xs tracking-widest font-semibold uppercase text-text-muted anim-top opacity-0">
          <span className="text-primary text-sm font-display tracking-normal">{number}</span>
          <span className="w-1.5 h-1.5 bg-white/10 rounded-full" />
          <div className="flex items-center gap-1.5 text-text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <Circle className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 text-emerald-500 fill-emerald-500 border-none" />
            </span>
            <span>{status}</span>
          </div>
        </div>

        {/* Project Title (Overflow Hidden for Word Reveal) */}
        <div className="overflow-hidden mb-6 py-1">
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter anim-title opacity-0">
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="font-sans font-light text-base lg:text-lg text-text-muted leading-relaxed mb-8 max-w-lg anim-desc opacity-0">
          {description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2.5 mb-10 max-w-md">
          {tech.map((tag, idx) => (
            <span
              key={idx}
              className="anim-tag opacity-0 px-3.5 py-1.5 text-xs font-medium bg-[#111111] border border-[#2A2A2A] text-white/80 rounded-full hover:border-primary/30 hover:text-white transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="anim-btn-container opacity-0">
            <MagneticButton 
              onClick={onOpenCaseStudy}
              className="group flex items-center justify-center gap-2 border border-primary bg-primary px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-transparent cursor-none"
            >
              <span>Case Study</span>
              <BookOpen className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>

          <div className="anim-btn-container opacity-0">
            <MagneticButton 
              onClick={() => window.open(liveUrl, '_blank')}
              className="group flex items-center justify-center gap-2 border border-[#2A2A2A] bg-transparent px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:border-primary hover:text-primary cursor-none"
            >
              <span>Live Site</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>

          <div className="anim-btn-container opacity-0">
            <MagneticButton 
              onClick={() => window.open(githubUrl, '_blank')}
              className="group flex items-center justify-center gap-2 border border-[#2A2A2A] bg-transparent px-7 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:border-primary hover:text-primary cursor-none"
            >
              <span>💻</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
