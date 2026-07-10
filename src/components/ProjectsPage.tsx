import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ProjectShowcase } from './ProjectShowcase'


interface ProjectObject {
  title: string
  description: string
  github: string
  website: string
  caseStudy: 'sins-roses' | 'chithiyan'
  image: string
  status: string
  tech: string[]
  number: string
}

interface ProjectsPageProps {
  onOpenCaseStudy: (key: 'sins-roses' | 'chithiyan') => void
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenCaseStudy }) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Dynamic projects configuration array
  const projectsList: ProjectObject[] = [
    {
      number: '01',
      title: 'Sins & Roses',
      description: 'Premium luxury streetwear brand focused on storytelling, craftsmanship and timeless design.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP', 'ERPNext', 'Prisma'],
      image: '/sins_roses.jpg',
      status: 'Ongoing',
      caseStudy: 'sins-roses',
      website: 'https://sinsandroses.com',
      github: 'https://www.linkedin.com/in/jaskaran-saini-a49a782b9?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    },
    {
      number: '02',
      title: 'Chithiyan',
      description: 'Luxury gifting platform connecting meaningful handwritten letters and personalized experiences.',
      tech: ['React', 'Node', 'MongoDB', 'ERPNext', 'Tailwind'],
      image: '/chithiyan.jpg',
      status: 'Ongoing',
      caseStudy: 'chithiyan',
      website: 'https://chithiyan.com',
      github: 'https://www.linkedin.com/in/jaskaran-saini-a49a782b9?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  ]

  useEffect(() => {
    // Scroll to top of projects page on mount
    window.scrollTo(0, 0)

    // GSAP page fade-in
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, scale: 0.99 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    )

    // Hero content reveal
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.anim-project-hero'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.15 }
      )
    }
  }, [])

  return (
    <div ref={pageRef} className="w-full min-h-screen bg-background text-white pb-32">
      {/* 1. Large Editorial Project Hero */}
      <section 
        ref={heroRef}
        className="min-h-[80vh] w-full flex flex-col justify-center items-center text-center px-6 md:px-16 py-20 border-b border-white/[0.03]"
      >
        <h1 className="anim-project-hero opacity-0 font-display font-black text-[12vw] sm:text-[9vw] lg:text-[7vw] uppercase tracking-tighter leading-none mb-6">
          Projects
        </h1>
        <p className="anim-project-hero opacity-0 font-sans font-light text-base sm:text-lg lg:text-xl text-text-muted max-w-lg tracking-wider lowercase">
          building products with design, engineering and storytelling.
        </p>
      </section>

      {/* 2. Alternating Project Showcase Cards (Dynamic Map) */}
      <div className="w-full flex flex-col items-center">
        {projectsList.map((project, idx) => (
          <ProjectShowcase
            key={idx}
            number={project.number}
            title={project.title}
            status={project.status}
            description={project.description}
            tech={project.tech}
            image={project.image}
            onOpenCaseStudy={() => onOpenCaseStudy(project.caseStudy)}
            liveUrl={project.website}
            githubUrl={project.github}
            layout={idx % 2 === 0 ? 'image-left' : 'image-right'}
          />
        ))}
      </div>

    </div>
  )
}
