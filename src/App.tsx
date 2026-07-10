import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { AnimatedBackground } from './components/AnimatedBackground'
import { ProjectsPage } from './components/ProjectsPage'
import { CaseStudyView } from './components/CaseStudyView'
import { AboutPage } from './components/AboutPage'
import { ContactPage } from './components/ContactPage'

gsap.registerPlugin(ScrollTrigger)

type RouteState = 'home' | 'projects' | 'sins-roses' | 'chithiyan' | 'about' | 'contact'
type PortraitState = 'default' | 'home' | 'projects' | 'about' | 'contact'

export default function App() {
  const getInitialRoute = (): RouteState => {
    const path = window.location.pathname
    if (path === '/projects') return 'projects'
    if (path === '/projects/sins-and-roses') return 'sins-roses'
    if (path === '/projects/chithiyan') return 'chithiyan'
    if (path === '/about') return 'about'
    if (path === '/contact') return 'contact'
    return 'home'
  }

  const [route, setRoute] = useState<RouteState>(getInitialRoute())
  const [activePortrait, setActivePortrait] = useState<PortraitState>('default')

  const logoRef = useRef<HTMLImageElement>(null)
  const homeRef = useRef<HTMLImageElement>(null)
  const projectsRef = useRef<HTMLImageElement>(null)
  const aboutRef = useRef<HTMLImageElement>(null)
  const contactRef = useRef<HTMLImageElement>(null)

  const portraitWrapperRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const floatTweenRef = useRef<gsap.core.Tween | null>(null)
  const isFirstRender = useRef(true)

  // Check prefers-reduced-motion media query
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // 1. Listen for browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/projects') setRoute('projects')
      else if (path === '/projects/sins-and-roses') setRoute('sins-roses')
      else if (path === '/projects/chithiyan') setRoute('chithiyan')
      else if (path === '/about') setRoute('about')
      else if (path === '/contact') setRoute('contact')
      else setRoute('home')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // 2. Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCallback)
    }
  }, [])

  // 3. Pause/Resume scroll based on active routes
  useEffect(() => {
    if (lenisRef.current) {
      if (route === 'home') {
        lenisRef.current.stop()
        document.body.style.overflow = 'hidden'
      } else {
        lenisRef.current.start()
        document.body.style.overflow = 'auto'
      }
    }
  }, [route])

  // 4. Portrait hover crossfade transitions
  useEffect(() => {
    const targets = [
      logoRef.current,
      homeRef.current,
      projectsRef.current,
      aboutRef.current,
      contactRef.current
    ]

    let activeTarget = logoRef.current
    if (activePortrait === 'home') activeTarget = homeRef.current
    if (activePortrait === 'projects') activeTarget = projectsRef.current
    if (activePortrait === 'about') activeTarget = aboutRef.current
    if (activePortrait === 'contact') activeTarget = contactRef.current

    gsap.to(targets, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
    })

    if (activeTarget) {
      gsap.to(activeTarget, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      })
    }
  }, [activePortrait])

  // 5. Persistent Shared Layout Portrait Positioner & Yoyo Float Animation
  useEffect(() => {
    const el = portraitWrapperRef.current
    if (!el) return

    // Kill any existing float tween and reset y offset
    if (floatTweenRef.current) {
      floatTweenRef.current.kill()
      floatTweenRef.current = null
    }
    gsap.set(el, { y: 0 })

    const isHome = route === 'home'
    const targetTop = isHome ? '50%' : '80px'
    const targetYPercent = isHome ? -50 : 0
    const targetScale = isHome ? 1 : 0.68

    if (isFirstRender.current) {
      // Set instantly on first mount to prevent flickering
      gsap.set(el, {
        top: targetTop,
        yPercent: targetYPercent,
        scale: targetScale,
      })
      isFirstRender.current = false
      
      // Start floating loop if loaded directly on home
      if (isHome && !prefersReducedMotion) {
        floatTweenRef.current = gsap.fromTo(el,
          { y: -4 },
          {
            y: 4,
            duration: 2.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        )
      }
    } else {
      // Smooth interpolation using GPU-accelerated transforms
      gsap.to(el, {
        top: targetTop,
        yPercent: targetYPercent,
        scale: targetScale,
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'power4.inOut',
        overwrite: 'auto',
        onComplete: () => {
          if (isHome && !prefersReducedMotion) {
            floatTweenRef.current = gsap.fromTo(el,
              { y: -4 },
              {
                y: 4,
                duration: 2.2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              }
            )
          }
        }
      })
    }
  }, [route, prefersReducedMotion])

  // 6. Seamless Shared Layout Page Navigator
  const handleNavigate = (targetRoute: RouteState) => {
    if (targetRoute === route) return

    // Map URL pathnames
    let targetPath = '/'
    if (targetRoute === 'projects') targetPath = '/projects'
    else if (targetRoute === 'sins-roses') targetPath = '/projects/sins-and-roses'
    else if (targetRoute === 'chithiyan') targetPath = '/projects/chithiyan'
    else if (targetRoute === 'about') targetPath = '/about'
    else if (targetRoute === 'contact') targetPath = '/contact'

    const mainContent = mainContentRef.current
    const tl = gsap.timeline({
      onComplete: () => {
        window.scrollTo(0, 0)
      }
    })

    if (prefersReducedMotion) {
      // Direct state changes for accessibility
      setRoute(targetRoute)
      window.history.pushState({}, '', targetPath)
      return
    }

    // A. Fade & slide out current page content
    if (mainContent) {
      tl.to(mainContent, {
        opacity: 0,
        y: targetRoute === 'home' ? 20 : -20,
        duration: 0.35,
        ease: 'power2.inOut',
      })
    }

    // B. Switch Router State
    tl.add(() => {
      setRoute(targetRoute)
      window.history.pushState({}, '', targetPath)
    })

    // C. Fade & slide in new page content
    if (mainContent) {
      tl.fromTo(mainContent,
        { opacity: 0, y: targetRoute === 'home' ? -20 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-primary overflow-x-hidden">
      {/* SVG Background Noise Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle Background Red Orbs */}
      <div className="pointer-events-none fixed top-[40%] left-[20%] -translate-y-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary opacity-[0.035] blur-[150px] z-0" />
      <div className="pointer-events-none fixed bottom-[20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary opacity-[0.02] blur-[120px] z-0" />

      {/* Background Scroll Reacting Dot Grid */}
      <AnimatedBackground />

      {/* Floating Ambient Typography (Only on Home Page) */}
      {route === 'home' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-between p-24 select-none">
          <div className="text-stroke text-[9vw] font-display font-black tracking-tighter opacity-10 animate-drift leading-none">
            sins & roses founder
          </div>
          <div className="text-stroke text-[9vw] font-display font-black tracking-tighter opacity-10 animate-drift-reverse text-right leading-none self-end">
            chithiyan co-founder
          </div>
        </div>
      )}

      {/* Fixed HUD Corner Navigation Links */}
      <div className="font-display text-xs tracking-widest font-semibold uppercase">
        {/* HOME (Top Left) */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('home')
          }}
          className={`fixed top-8 left-8 md:top-12 md:left-12 z-40 transition-colors duration-300 cursor-none ${
            route === 'home' ? 'text-white pointer-events-none' : 'text-primary hover:text-white'
          }`}
          onMouseEnter={() => setActivePortrait('home')}
          onMouseLeave={() => setActivePortrait('default')}
        >
          home
        </a>

        {/* PROJECTS (Top Right) */}
        <a 
          href="/projects" 
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('projects')
          }}
          className={`fixed top-8 right-8 md:top-12 md:right-12 z-40 transition-colors duration-300 cursor-none ${
            route === 'projects' ? 'text-white pointer-events-none' : 'text-primary hover:text-white'
          }`}
          onMouseEnter={() => setActivePortrait('projects')}
          onMouseLeave={() => setActivePortrait('default')}
        >
          projects
        </a>

        {/* ABOUT (Bottom Right) */}
        <a 
          href="/about" 
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('about')
          }}
          className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40 transition-colors duration-300 cursor-none ${
            route === 'about' ? 'text-white pointer-events-none' : 'text-primary hover:text-white'
          }`}
          onMouseEnter={() => setActivePortrait('about')}
          onMouseLeave={() => setActivePortrait('default')}
        >
          about
        </a>

        {/* CONTACT (Bottom Left) */}
        <a 
          href="/contact" 
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('contact')
          }}
          className={`fixed bottom-8 left-8 md:bottom-12 md:left-12 z-40 transition-colors duration-300 cursor-none ${
            route === 'contact' ? 'text-white pointer-events-none' : 'text-primary hover:text-white'
          }`}
          onMouseEnter={() => setActivePortrait('contact')}
          onMouseLeave={() => setActivePortrait('default')}
        >
          contact
        </a>
      </div>

      {/* Persistent Circular Portrait (Single mounted element in Root Layout) */}
      <div 
        ref={portraitWrapperRef}
        className="fixed left-1/2 -translate-x-1/2 z-45 pointer-events-none"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault()
            handleNavigate('home')
          }}
          className="group pointer-events-auto block relative h-20 w-20 overflow-hidden rounded-full border border-white/10 shadow-[0_0_24px_rgba(255,255,255,0.03)] bg-[#040606] transition-transform duration-300 hover:scale-105"
        >
          {/* Default Front-Facing Portrait */}
          <img
            ref={logoRef}
            src="/logo.png"
            className="absolute inset-0 h-full w-full object-contain opacity-100 scale-90 translate-y-0.5 grayscale contrast-[1.25] brightness-[0.95]"
            alt="Front-facing Portrait"
          />
          {/* HOME Hover Portrait (looking top-left) */}
          <img
            ref={homeRef}
            src="/home.png"
            className="absolute inset-0 h-full w-full object-contain opacity-0 scale-90 translate-y-0.5 grayscale contrast-[1.25] brightness-[0.95]"
            alt="Top-left Looking Portrait"
          />
          {/* PROJECTS Hover Portrait (looking top-right) */}
          <img
            ref={projectsRef}
            src="/projects.png"
            className="absolute inset-0 h-full w-full object-contain opacity-0 scale-90 translate-y-0.5 grayscale contrast-[1.25] brightness-[0.95]"
            alt="Top-right Looking Portrait"
          />
          {/* ABOUT Hover Portrait (looking bottom-right) */}
          <img
            ref={aboutRef}
            src="/about.png"
            className="absolute inset-0 h-full w-full object-contain opacity-0 scale-90 translate-y-0.5 grayscale contrast-[1.25] brightness-[0.95]"
            alt="Bottom-right Looking Portrait"
          />
          {/* CONTACT Hover Portrait (looking bottom-left) */}
          <img
            ref={contactRef}
            src="/contact.png"
            className="absolute inset-0 h-full w-full object-contain opacity-0 scale-90 translate-y-0.5 grayscale contrast-[1.25] brightness-[0.95]"
            alt="Bottom-left Looking Portrait"
          />
        </a>
      </div>

      {/* Render Subpage Views with Smooth Fade/Slide */}
      <main ref={mainContentRef} className="relative w-full min-h-screen">
        {route === 'home' && null /* Home is strictly minimal, HUD only */}
        
        {route === 'projects' && (
          <ProjectsPage onOpenCaseStudy={(key) => handleNavigate(key)} />
        )}
        
        {route === 'sins-roses' && (
          <CaseStudyView projectKey="sins-roses" onBack={() => handleNavigate('projects')} />
        )}
        
        {route === 'chithiyan' && (
          <CaseStudyView projectKey="chithiyan" onBack={() => handleNavigate('projects')} />
        )}
        
        {route === 'about' && (
          <AboutPage onBack={() => handleNavigate('home')} />
        )}
        
        {route === 'contact' && (
          <ContactPage onBack={() => handleNavigate('home')} />
        )}
      </main>
    </div>
  )
}
