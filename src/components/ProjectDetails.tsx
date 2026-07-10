import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowLeft, ExternalLink, Github, Sparkles } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

interface ProjectDetailsProps {
  projectKey: 'sins-roses' | 'chithiyan' | null
  onClose: () => void
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectKey, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  const detailsData = {
    'sins-roses': {
      title: 'Sins & Roses',
      subtitle: 'Premium Streetwear & Brand Storytelling',
      role: 'Lead Developer & Technical Designer',
      timeline: 'Ongoing (Started Feb 2026)',
      deliverables: 'Headless E-commerce, Inventory ERP, GSAP Brand Experience',
      overview: 'Sins & Roses is a premium streetwear label inspired by cultural narratives and minimalist aesthetic. The technical challenge was to build a highly performant headless storefront that bridges custom 3D web animations with robust ERPNext back-office capabilities.',
      techStack: ['Next.js', 'React', 'TypeScript', 'ERPNext', 'Prisma', 'GSAP', 'Tailwind CSS', 'Stripe'],
      features: [
        { title: 'Headless Architecture', desc: 'Fast, edge-rendered Next.js store communicating via GraphQL APIs to minimize page load times.' },
        { title: 'ERPNext Automation', desc: 'Real-time sync of stock levels, order fulfillments, and automated invoice generations.' },
        { title: 'GSAP Web Glaze', desc: 'Bespoke page-flip and fabric-reveal scroll animations that amplify the luxury editorial tone.' }
      ],
      liveUrl: 'https://sinsandroses.com',
      githubUrl: 'https://github.com/jaskaran/sins-and-roses'
    },
    'chithiyan': {
      title: 'Chithiyan',
      subtitle: 'Personalized Handwritten Letters & Experiences',
      role: 'Full Stack Engineer & UI Architect',
      timeline: 'Ongoing (Started Nov 2025)',
      deliverables: 'Gifting Customizer, Node.js API, MongoDB Schema, Courier API',
      overview: 'Chithiyan is a luxury gifting platform focused on handwritten letters and sentimental keepsakes. It allows users to write letters digitally and select customized physical papers, wax seals, and flowers to be hand-delivered to their loved ones.',
      techStack: ['React', 'Node.js', 'MongoDB', 'ERPNext', 'Tailwind CSS', 'Framer Motion', 'Express'],
      features: [
        { title: 'Interactive Customizer', desc: 'Real-time 2D mockup visualizer for ink styles, wax seal patterns, and textured cotton papers.' },
        { title: 'ERPNext Gifting Sync', desc: 'Custom pipeline routing orders to calligraphers, generating packaging labels automatically.' },
        { title: 'Intelligent Letter Editor', desc: 'Custom rich text editor ensuring the written content fits perfectly inside the letter page constraints.' }
      ],
      liveUrl: 'https://chithiyan.com',
      githubUrl: 'https://github.com/jaskaran/chithiyan'
    }
  }

  const project = projectKey ? detailsData[projectKey] : null

  useEffect(() => {
    if (projectKey) {
      // Disable body scroll when overlay is active
      document.body.style.overflow = 'hidden'

      // Transition IN
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.8, ease: 'power4.inOut' }
      )

      // Animate content stagger
      gsap.fromTo(
        '.anim-detail-item',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.3 }
      )
    }
  }, [projectKey])

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = 'auto'
        onClose()
      }
    })
  }

  if (!project) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#040606] overflow-y-auto px-6 md:px-16 lg:px-24 py-20 text-white flex flex-col justify-start"
    >
      {/* SVG Background Noise */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        {/* Back Button */}
        <div className="mb-12 anim-detail-item opacity-0">
          <MagneticButton
            onClick={handleClose}
            className="flex items-center gap-2 border border-white/10 hover:border-primary/40 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:text-primary transition-all duration-300 cursor-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </MagneticButton>
        </div>

        {/* Title Block */}
        <div className="border-b border-white/5 pb-10 mb-12">
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-4 anim-detail-item opacity-0">
            {project.title}
          </h1>
          <p className="font-sans font-light text-xl text-primary anim-detail-item opacity-0">
            {project.subtitle}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-white/5 pb-12">
          <div className="anim-detail-item opacity-0">
            <span className="text-xs uppercase tracking-widest text-text-muted block mb-2 font-display">Role</span>
            <span className="font-display font-medium text-white">{project.role}</span>
          </div>
          <div className="anim-detail-item opacity-0">
            <span className="text-xs uppercase tracking-widest text-text-muted block mb-2 font-display">Timeline</span>
            <span className="font-display font-medium text-white">{project.timeline}</span>
          </div>
          <div className="anim-detail-item opacity-0">
            <span className="text-xs uppercase tracking-widest text-text-muted block mb-2 font-display font-semibold">Key Deliverables</span>
            <span className="font-display font-medium text-white">{project.deliverables}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Overview */}
          <div className="lg:col-span-7 anim-detail-item opacity-0">
            <h3 className="text-lg uppercase tracking-wider font-display font-bold mb-6 text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Project Overview
            </h3>
            <p className="font-sans font-light text-text-muted text-base sm:text-lg leading-relaxed mb-8">
              {project.overview}
            </p>

            <h3 className="text-lg uppercase tracking-wider font-display font-bold mb-6 text-white">
              Technical Highlights
            </h3>
            <ul className="space-y-6">
              {project.features.map((feature, idx) => (
                <li key={idx} className="border-l-2 border-primary/50 pl-4 py-1">
                  <h4 className="font-display font-bold text-white mb-1">{feature.title}</h4>
                  <p className="font-sans font-light text-text-muted text-sm">{feature.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Links */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 anim-detail-item opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-sm uppercase tracking-widest font-display font-bold mb-6 text-white border-b border-white/5 pb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-semibold bg-background border border-[#2A2A2A] text-white/80 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full border border-primary bg-primary hover:bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 rounded-md"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full border border-[#2A2A2A] hover:border-primary hover:text-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 rounded-md"
              >
                <span>Explore Source Code</span>
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
