import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

interface ContactPageProps {
  onBack: () => void
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        subject: "Portfolio Contact",
        message: form.message,
      }),
    })

    const data = await response.json()

    if (data.success) {
      setSubmitted(true)
      setForm({
        name: "",
        email: "",
        message: "",
      })

      setTimeout(() => setSubmitted(false), 5000)
    } else {
      alert("Failed to send message")
    }

  } catch (error) {
    console.error("Contact error:", error)
    alert("Backend connection failed")
  }
}

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-white px-6 md:px-16 lg:px-24 py-20 relative z-10">
      <div className="max-w-4xl mx-auto">
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
          Contact
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <p className="font-sans font-light text-text-muted text-base leading-relaxed">
              Have a premium streetwear brand concept, gifting customizer project, or full-stack architectural design in mind? Let's connect.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#2A2A2A] flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-display block">Email</span>
                  <a href="mailto:sainijaskaransingh429@gmail.com" className="text-sm font-sans text-white hover:text-primary transition-colors duration-300">
                    sainijaskaransingh429@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#2A2A2A] flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-display block">Location / Phone</span>
                  <span className="text-sm font-sans text-white">+91 82839 19884</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#111111] border border-[#2A2A2A] flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase font-display block">Base</span>
                  <span className="text-sm font-sans text-white">Punjab, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h3 className="font-display font-bold text-lg text-white">Message Transmitted</h3>
                <p className="font-sans font-light text-xs text-text-muted max-w-xs">
                  Your inquiry has been successfully queued. I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase font-display tracking-widest text-text-muted block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-[#2A2A2A] focus:border-primary px-4 py-3 rounded text-sm text-white focus:outline-none transition-all duration-300"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-display tracking-widest text-text-muted block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-[#2A2A2A] focus:border-primary px-4 py-3 rounded text-sm text-white focus:outline-none transition-all duration-300"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-display tracking-widest text-text-muted block mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-[#2A2A2A] focus:border-primary px-4 py-3 rounded text-sm text-white focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <MagneticButton 
                  type="submit"
                  className="w-full group flex items-center justify-center gap-2 border border-primary bg-primary px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-transparent rounded cursor-none"
                >
                  <span>Transmit message</span>
                  <Send className="h-3.5 w-3.5" />
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
