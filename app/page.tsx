// app/page.tsx
import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import TechnicalSkills from '@/components/TechnicalSkills'
import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      {/* Add id attributes to your sections */}
      <Hero id="home" /> {/* Added ID for home section */}
      <ProjectShowcase id="projects" />
      <TechnicalSkills id="skills" />
      <AboutMe id="about" />
      <Contact id="contact" />
    </>
  )
}