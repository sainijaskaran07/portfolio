import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowLeft, ExternalLink, Linkedin, Sparkles, BookOpen, Compass, Heart, Feather } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

interface CaseStudyProps {
  projectKey: 'sins-roses' | 'chithiyan'
  onBack: () => void
}

export const CaseStudyView: React.FC<CaseStudyProps> = ({ projectKey, onBack }) => {
  if (projectKey === 'sins-roses') {
    return <SinsRosesCaseStudy onBack={onBack} />
  } else {
    return <ChithiyanCaseStudy onBack={onBack} />
  }
}

// ==========================================
// 1. SINS & ROSES CASE STUDY (Luxury Magazine Layout)
// ==========================================
const SinsRosesCaseStudy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo(
      '.sr-hero-img',
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out', delay: 0.1 }
    )

    gsap.fromTo(
      '.sr-anim',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.08, delay: 0.2 }
    )
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F5F5DC] text-[#333333] font-sans selection:bg-[#800020] selection:text-white py-24 px-6 md:px-16 lg:px-24 relative z-10"
      style={{
        backgroundImage: 'radial-gradient(rgba(128,0,32,0.015) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Back navigation */}
        <div className="sr-anim opacity-0">
          <MagneticButton 
            onClick={onBack}
            className="flex items-center gap-2 border border-[#800020]/20 hover:border-[#800020]/60 px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 cursor-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Gallery</span>
          </MagneticButton>
        </div>

        {/* Hero Section */}
        <header className="space-y-6 text-left sr-anim opacity-0">
          <span className="text-[#800020] font-sans text-xs uppercase tracking-widest font-bold block">Case Study No. 01</span>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#800020] border-b border-[#800020]/15 pb-6">
            SINS & ROSES
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#555555]/90">
            <span className="font-semibold">Storytelling Streetwear</span>
            <span className="text-[#800020]">•</span>
            <span className="italic text-[#800020] font-semibold font-serif lowercase tracking-wider">wear what matters.</span>
          </div>
        </header>

        {/* Cover Widescreen Banner */}
        <div className="relative w-full aspect-[21/9] rounded-2xl border border-[#E8DCC4] overflow-hidden shadow-[0_20px_40px_rgba(128,0,32,0.15)] sr-anim opacity-0">
          {/* Garment Image with GSAP target class 'sr-hero-img' */}
          <img 
            src="/sins_roses_garment.jpg" 
            alt="Sins & Roses Woven Detail" 
            className="sr-hero-img w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/10 via-transparent to-transparent opacity-60" />
        </div>

        {/* Brand Overview Introduction */}
        <section className="text-left max-w-3xl space-y-6 sr-anim opacity-0 border-l-2 border-[#800020]/30 pl-6 py-2">
          <h2 className="font-display text-[#800020] text-xl font-bold uppercase tracking-wide">Brand Overview</h2>
          <p className="text-[#444444] font-light text-base leading-relaxed">
            Sins & Roses is a storytelling-driven streetwear brand built around the relationship between identity, emotion, and personal expression.
          </p>
          <p className="text-[#444444] font-light text-base leading-relaxed">
            The brand explores the contrast between human imperfections and human beauty — the "Sins" we carry and the "Roses" that represent growth, resilience, and transformation. Rather than treating clothing as a simple product, Sins & Roses approaches each garment as a wearable piece of storytelling.
          </p>
        </section>

        {/* Founder Metadata Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[#800020]/15 py-12 sr-anim opacity-0 text-left font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-2">My Role</span>
            <p className="text-xs uppercase tracking-wider text-[#800020] font-bold">Founder & Creative Director</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-2">Core Responsibilities</span>
            <ul className="text-xs text-[#555555] space-y-1 font-light list-disc pl-4">
              <li>Defined the brand vision and long-term creative direction</li>
              <li>Developed brand identity, storytelling framework, and visual language</li>
              <li>Designed digital storefront experience and customer journey</li>
              <li>Structured product concepts, collection themes, and brand architecture</li>
            </ul>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-2">Platform Connections</span>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://sinsandroses.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[11px] font-bold text-[#800020] hover:text-[#800020]/75 transition-colors duration-300"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Brand</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jaskaran-saini-a49a782b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[11px] font-bold text-[#800020] hover:text-[#800020]/75 transition-colors duration-300"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Visual Storytelling Content */}
        <div className="space-y-24 text-left">
          
          {/* Section 1: Vision */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">01 / The Vision</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Moving Beyond Traditional Streetwear</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                Most online fashion experiences reduce clothing into product images, prices, and quick transactions. This removes the emotions, stories, and craftsmanship behind what people wear.
              </p>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                Sins & Roses was created to build a deeper connection between clothing and identity. The vision is to create a digital-first fashion house where every collection represents a story, every garment carries meaning, and every customer becomes part of the narrative.
              </p>
            </div>
          </div>

          {/* Luxury Pull Quote */}
          <blockquote className="border-y border-[#800020]/15 py-12 text-center sr-anim opacity-0">
            <p className="font-serif italic text-xl text-[#333333] max-w-3xl mx-auto leading-relaxed">
              "The garment is not just something you wear. It becomes a reflection of the experiences, emotions, and moments that define you."
            </p>
            <cite className="block text-[#800020] uppercase tracking-widest text-[9px] font-bold mt-4 font-sans">— Founder Perspective</cite>
          </blockquote>

          {/* Section 2: Brand Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">02 / Brand Philosophy</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">The Contrast Between Darkness & Beauty</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The foundation of Sins & Roses comes from contrast.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">Sins represent</h4>
                  <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                    <li>Imperfections</li>
                    <li>Inner struggles</li>
                    <li>Human complexity</li>
                    <li>Personal battles</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">Roses represent</h4>
                  <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                    <li>Growth</li>
                    <li>Beauty</li>
                    <li>Hope</li>
                    <li>Transformation</li>
                  </ul>
                </div>
              </div>
              <p className="text-[#444444] font-light text-sm leading-relaxed pt-2">
                This duality shapes the brand language — balancing darker emotional themes with refined luxury aesthetics.
              </p>
            </div>
          </div>

          {/* Section 3: Creative Direction */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">03 / Creative Direction</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Visual Identity System</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The visual direction focuses on creating a timeless luxury streetwear atmosphere.
              </p>
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">Design Principles</h4>
                <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                  <li>Minimal but expressive layouts</li>
                  <li>Premium editorial styling</li>
                  <li>Strong typography hierarchy</li>
                  <li>Story-driven visuals</li>
                  <li>High-quality product presentation</li>
                </ul>
              </div>
              <p className="text-[#444444] font-light text-sm leading-relaxed pt-2">
                <strong>Color Language:</strong> Deep Navy (#014C4E) and Golden Beige (#EAD292), paired with soft cream backgrounds, charcoal black accents, and muted metallic accents. This palette represents confidence, heritage, elegance, and timelessness.
              </p>
            </div>
          </div>

          {/* Garment Detail Campaign Image */}
          <div className="w-full aspect-[2/1] rounded border border-[#E8DCC4] overflow-hidden shadow-[0_20px_40px_rgba(128,0,32,0.1)] sr-anim opacity-0">
            <img 
              src="/sins_roses.jpg" 
              alt="Sins & Roses Brand Moodboard Detail" 
              className="w-full h-full object-cover grayscale contrast-[1.1] hover:scale-105 transition-transform duration-[1.5s]"
            />
          </div>

          {/* Section 4: Product Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">04 / Product Philosophy</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Clothing With Meaning</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                Sins & Roses focuses on creating garments that feel intentional rather than trend-driven.
              </p>
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">The Product Approach</h4>
                <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                  <li>Heavyweight silhouettes</li>
                  <li>Premium fabric selection</li>
                  <li>Detailed craftsmanship</li>
                  <li>Limited collection concepts</li>
                  <li>Story-driven designs</li>
                </ul>
              </div>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                Every piece is designed to communicate a feeling, memory, or personal statement.
              </p>
            </div>
          </div>

          {/* Section 5: Digital Storefront Experience */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">05 / Digital Storefront</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Creating a Digital Gallery</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The storefront experience was designed to feel closer to a fashion gallery than a traditional e-commerce website.
              </p>
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">Experience Focus Areas</h4>
                <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                  <li>Editorial storytelling</li>
                  <li>Immersive product sections</li>
                  <li>Smooth motion interactions</li>
                  <li>Premium visual hierarchy</li>
                  <li>Emotional connection before purchase</li>
                </ul>
              </div>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The goal is to make browsing feel like discovering a collection rather than scrolling through products.
              </p>
            </div>
          </div>

          {/* Section 6: Technology & Experience Design */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">06 / Experience Design</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Building The Digital Foundation</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The digital ecosystem focuses on combining creativity with scalable technology.
              </p>
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#800020] font-bold">Key Experience Areas</h4>
                <ul className="text-sm font-light text-[#555555] list-disc pl-4 space-y-1">
                  <li>Responsive storefront architecture</li>
                  <li>Modern frontend interactions</li>
                  <li>Product storytelling pages</li>
                  <li>Scalable commerce structure</li>
                  <li>Future-ready inventory and order management systems</li>
                </ul>
              </div>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                The technology supports the brand vision while keeping the customer experience at the center.
              </p>
            </div>
          </div>

          {/* Color swatches display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sr-anim opacity-0">
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-10 bg-[#014C4E] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Deep Navy</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#014C4E</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-10 bg-[#EAD292] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Golden Beige</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#EAD292</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-10 bg-[#FDFBF7] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Soft Cream</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#FDFBF7</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-10 bg-[#1C1C1C] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Charcoal Black</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#1C1C1C</span>
            </div>
          </div>

          {/* Section 7: Future Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start sr-anim opacity-0">
            <div className="md:col-span-4">
              <h2 className="font-sans font-bold uppercase tracking-widest text-xs text-[#800020] border-l border-[#800020] pl-3">07 / Future Roadmap</h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <h3 className="font-sans text-[#333333] text-lg font-bold">Beyond Digital Fashion</h3>
              <p className="text-[#444444] font-light text-sm leading-relaxed">
                Sins & Roses aims to evolve from a digital-first brand into a complete fashion experience:
              </p>
              <ul className="space-y-4 text-[#444444] font-light text-sm list-none pl-0">
                <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>Phase 1:</strong> Building a strong online presence through storytelling, collections, and community.</li>
                <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>Phase 2:</strong> Expanding into immersive shopping experiences and stronger customer personalization.</li>
                <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>Phase 3:</strong> Collaborations with artists, creators, and cultural voices to create meaningful capsule collections.</li>
              </ul>
            </div>
          </div>

          {/* Impact block */}
          <div className="bg-[#800020]/5 border border-[#800020]/10 p-8 rounded-xl space-y-4 text-center max-w-2xl mx-auto sr-anim opacity-0">
            <Sparkles className="h-6 w-6 text-[#800020] mx-auto" />
            <h4 className="font-sans font-bold uppercase text-base text-[#800020]">Brand Impact</h4>
            <p className="text-xs font-sans font-light text-[#555555] leading-relaxed">
              Sins & Roses represents a different approach to streetwear — where clothing is not only designed to be seen, but designed to be felt. The mission is simple: Create garments that carry stories, represent identity, and become part of people's personal journeys.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}


// ==========================================
// 2. CHITHIYAN CASE STUDY (Warm Printed Journal Layout)
// ==========================================
const ChithiyanCaseStudy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo(
      '.ch-anim',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
    )
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#F5F5DC] text-[#333333] font-serif selection:bg-[#800020] selection:text-white py-24 px-6 md:px-16 lg:px-24 relative z-10"
      style={{
        backgroundImage: 'radial-gradient(rgba(128,0,32,0.015) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Back navigation */}
        <div className="ch-anim opacity-0 text-left">
          <MagneticButton 
            onClick={onBack}
            className="flex items-center gap-2 border border-[#800020]/20 hover:border-[#800020]/60 px-6 py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 cursor-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Gallery</span>
          </MagneticButton>
        </div>

        {/* Hero Section */}
        <header className="space-y-6 text-left ch-anim opacity-0">
          <span className="text-[#800020] font-sans text-xs uppercase tracking-widest font-bold block">Entry No. 02</span>
          <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-[#800020] border-b border-[#800020]/10 pb-6">
            Chithiyan
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#555555] max-w-2xl leading-relaxed">
            Preserving the weight of handwritten thoughts in a hyper-digitized age.
          </p>
        </header>

        {/* Hero Image (Antique paper and shadow style) */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(128,0,32,0.15)] border border-[#E8DCC4] ch-anim opacity-0">
          <img 
            src="/chithiyan.jpg" 
            alt="Chithiyan Gifting Journal" 
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/10 via-transparent to-transparent" />
        </div>

        {/* Founder Metadata Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[#800020]/15 py-10 text-left ch-anim opacity-0 font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-1">My Role</span>
            <p className="text-xs uppercase tracking-wider text-[#800020] font-bold">Co-Founder, Product Strategist & Experience Designer</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-1">Core Mandate</span>
            <p className="text-xs text-[#555555] leading-relaxed">Built the emotional personalization funnel, Calligrapher network portal, and automated invoice systems.</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#800020]/60 block mb-1">Interactive Links</span>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://chithiyan.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[11px] font-bold text-[#800020] hover:text-[#800020]/75 transition-colors duration-300"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Visit Platform</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/jaskaran-saini-a49a782b9?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-[11px] font-bold text-[#800020] hover:text-[#800020]/75 transition-colors duration-300"
              >
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Narrative Flow */}
        <div className="space-y-16 text-left leading-relaxed">
          
          {/* Section: The Beginning */}
          <div className="space-y-4 ch-anim opacity-0">
            <div className="flex items-center gap-2 text-[#800020]">
              <Feather className="h-4 w-4" />
              <h2 className="font-sans text-xs uppercase tracking-wider font-bold">01 / The Beginning</h2>
            </div>
            <p className="text-[#444444] font-light text-base pl-6">
              Instant messaging has made communication frictionless, but it has also stripped it of value. A digital message takes seconds to read and is easily forgotten. A handwritten letter has physical weight, texture, ink press variations, and personal touch. It is kept in a drawer for decades. Chithiyan (meaning "letters" in Punjabi) was founded to make this nostalgic luxury accessible to the modern world.
            </p>
          </div>

          {/* Section: The Problem Worth Solving */}
          <div className="space-y-4 ch-anim opacity-0">
            <div className="flex items-center gap-2 text-[#800020]">
              <Compass className="h-4 w-4" />
              <h2 className="font-sans text-xs uppercase tracking-wider font-bold">02 / The Problem</h2>
            </div>
            <p className="text-[#444444] font-light text-base pl-6">
              Despite the deep sentiment behind handwritten notes, ordering calligraphy offline isoperationally fragmented. Customers struggle to find skilled calligraphers, delivery takes weeks, and pricing is non-transparent. Artisans also waste valuable hours managing billing and logistics instead of practicing their writing craft.
            </p>
          </div>

          {/* Paper Texture Pull Quote */}
          <div className="bg-[#E8DCC4]/50 border border-[#800020]/10 p-8 rounded-lg text-center shadow-inner ch-anim opacity-0">
            <p className="font-serif italic text-lg text-[#333333] max-w-2xl mx-auto leading-relaxed">
              "We studied the psychology of gifting. The emotional climax of a gift is not the item itself, but the unboxing ritual—the texture of parchment, the breaking of a custom wax seal, the slow unfolding of ink. The digital portal had to honor that same cadence."
            </p>
            <span className="block text-[#800020] uppercase font-sans tracking-widest text-[9px] font-bold mt-3">— Co-Founder thinking</span>
          </div>

          {/* Section: Designing the Experience */}
          <div className="space-y-4 ch-anim opacity-0">
            <div className="flex items-center gap-2 text-[#800020]">
              <Heart className="h-4 w-4" />
              <h2 className="font-sans text-xs uppercase tracking-wider font-bold">03 / Designing the Experience</h2>
            </div>
            <p className="text-[#444444] font-light text-base pl-6">
              As the Co-Founder & Experience Designer, I built the entire digital customization wizard. Users are guided through a calm, slow personalization flow. They choose their paper color, select actual calligrapher handwriting styles, draft their personal messages, and pick custom wax seals. The user interface feels quiet, organic, and uncluttered, intentionally utilizing generous spacing.
            </p>
          </div>

          {/* Section: Building for Artisans */}
          <div className="space-y-4 ch-anim opacity-0">
            <div className="flex items-center gap-2 text-[#800020]">
              <BookOpen className="h-4 w-4" />
              <h2 className="font-sans text-xs uppercase tracking-wider font-bold">04 / The Artisan Ecosystem</h2>
            </div>
            <p className="text-[#444444] font-light text-base pl-6">
              The heart of Chithiyan is our calligrapher network. We built dedicated artisan portals that translate digital orders into physical handwriting templates. Our custom ERPNext integration automates payouts, delivery tracking labels, and courier pickups, leaving calligraphers entirely free to focus on their hand-crafted art.
            </p>
          </div>

          {/* Color swatches display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ch-anim opacity-0 font-sans">
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-8 bg-[#800020] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Heritage Burgundy</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#800020</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-8 bg-[#D4AF37] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Metallic Gold</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#D4AF37</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-8 bg-[#F5F5DC] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Classic Beige</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#F5F5DC</span>
            </div>
            <div className="bg-[#E8DCC4] border border-[#800020]/15 rounded p-4 text-left">
              <div className="w-full h-8 bg-[#E8DCC4] rounded mb-3" />
              <span className="text-[10px] text-[#800020] uppercase tracking-widest block font-bold mb-1">Parchment</span>
              <span className="text-[9px] text-[#555555] uppercase font-mono">#E8DCC4</span>
            </div>
          </div>

          {/* Section: Scaling & What's Next */}
          <div className="space-y-4 ch-anim opacity-0">
            <div className="flex items-center gap-2 text-[#800020]">
              <Sparkles className="h-4 w-4" />
              <h2 className="font-sans text-xs uppercase tracking-wider font-bold">05 / The Path Forward</h2>
            </div>
            <p className="text-[#444444] font-light text-sm pl-6">
              Our vision for Chithiyan is to bridge ancient calligraphy with modern interactive tech:
            </p>
            <ul className="space-y-3 text-[#444444] font-light text-sm list-none pl-6">
              <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>Regional Artistry:</strong> Onboarding local calligraphy masters for Punjabi (Gurmukhi), Hindi (Devanagari), and Urdu scripts.</li>
              <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>AR Voice Notes:</strong> Recipient scans their physical wax seal via mobile browser, playing a spatial audio file recorded by the sender.</li>
              <li className="flex gap-2 items-start"><span className="text-[#800020]">✦</span> <strong>Artisan Hubs:</strong> Launching physical heritage journaling workshops in metropolitan centers.</li>
            </ul>
          </div>

          {/* Impact block */}
          <div className="bg-[#800020]/5 border border-[#800020]/10 p-8 rounded-xl space-y-4 text-center max-w-2xl mx-auto ch-anim opacity-0">
            <h4 className="font-sans font-bold uppercase text-base text-[#800020]">Chithiyan Platform Impact</h4>
            <p className="text-xs font-sans font-light text-[#555555] leading-relaxed">
              Onboarded 85 calligraphers, decreased order turnaround delivery times by 40%, and delivered over 12,000 hand-drafted letter gifts celebrating personal milestones.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

