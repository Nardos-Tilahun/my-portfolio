// app/page.tsx
import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import TechnicalSkills from '@/components/TechnicalSkills'
import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectShowcase />
      <TechnicalSkills />
      <AboutMe />
      <Contact />
    </>
  )
}