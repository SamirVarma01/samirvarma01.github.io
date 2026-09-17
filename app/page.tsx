"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import EducationSection from "@/components/education-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(key)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = sectionsRef.current[sectionId]
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 64,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="w-full min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <div className="pt-16">
        <section
          ref={(el) => {
            sectionsRef.current.hero = el
          }}
          id="hero"
          className="w-full max-w-6xl mx-auto px-6 pt-12 pb-20 lg:pt-20 lg:pb-28"
        >
          <HeroSection />
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.experience = el
          }}
          id="experience"
          className="w-full bg-muted/60 py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <ExperienceSection />
          </div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.work = el
          }}
          id="work"
          className="w-full max-w-6xl mx-auto px-6 py-20"
        >
          <ProjectsSection />
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.education = el
          }}
          id="education"
          className="w-full bg-muted/60 py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <EducationSection />
          </div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.skills = el
          }}
          id="skills"
          className="w-full max-w-6xl mx-auto px-6 py-20"
        >
          <SkillsSection />
        </section>

        <section
          ref={(el) => {
            sectionsRef.current.contact = el
          }}
          id="contact"
          className="w-full max-w-6xl mx-auto px-6 pb-20 lg:pb-28"
        >
          <ContactSection />
        </section>
      </div>

      <Footer />
    </main>
  )
}
