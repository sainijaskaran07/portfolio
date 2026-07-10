import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Award, Compass, Heart, ArrowLeft } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

interface AboutPageProps {
  onBack: () => void
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-white px-6 md:px-16 lg:px-24 py-20 relative z-10">
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <div className="mb-12">
          <MagneticButton 
            onClick={onBack}
            className="flex items-center gap-2 border border-white/10 hover:border-primary/40 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:text-primary transition-all duration-300 cursor-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </MagneticButton>
        </div>

        {/* Heading */}
        <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-10 border-b border-white/5 pb-8">
          About me
        </h1>

        <div className="space-y-12">
          {/* Subheading bio */}
          <p className="font-sans font-light text-xl text-primary leading-relaxed">
            I don't just build brands—I build worlds people can belong to. As the Founder of Sins & Roses and Co-Founder of Chithiyan, I transform ideas into living experiences by blending storytelling, design, technology, craftsmanship, and strategy into brands with lasting cultural impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 shadow-md">
              <Compass className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-display font-bold text-white mb-2 uppercase text-xs tracking-wider">Building Digital Experiences</h3>
              <p className="font-sans text-xs text-text-muted leading-relaxed font-light">
                Designing and engineering products that balance aesthetics with performance. Every interaction is intentional, every system is built to scale, and every detail serves a purpose.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 shadow-md">
              <Award className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-display font-bold text-white mb-2 uppercase text-xs tracking-wider">Systems & Intelligence</h3>
              <p className="font-sans text-xs text-text-muted leading-relaxed font-light">
                Creating robust architectures that connect modern frontends, secure backends, databases, APIs, and enterprise platforms into seamless digital ecosystems.
              </p>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 shadow-md">
              <Heart className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-display font-bold text-white mb-2 uppercase text-xs tracking-wider">Vision to Reality</h3>
              <p className="font-sans text-xs text-text-muted leading-relaxed font-light">
                From the first concept to the final deployment, I transform ideas into products that are beautiful to use, reliable to scale, and built for long-term impact.
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 space-y-6">
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">Founder Vision</h3>
            <p className="font-sans font-light text-text-muted text-base leading-relaxed">
              I operate at the intersection of business planning, marketing execution, and raw technology. Rather than writing standalone code, I build comprehensive digital ecosystems where product storefronts communicate seamlessly with ERP backoffices, calligrapher assignment schedulers, inventory ledgers, and automated logistics template printouts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
