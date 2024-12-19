import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Hero from '@/components/Hero'
import ProjectShowcase from '@/components/ProjectShowcase'
import TechnicalSkills from '@/components/TechnicalSkills'
import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-12 ">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Nardos</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#projects">
              Projects
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#skills">
              Skills
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 px-12 ">
        <Hero />
        <ProjectShowcase />
        <TechnicalSkills />
        <AboutMe />
        <Contact />
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">
              Built by John Doe. Hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Vercel
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/johndoe/portfolio"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

