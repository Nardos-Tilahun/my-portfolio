"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'

import ProjectOverview from "./ProjectOverview"
import TechStack from "./TechStack"
import CodeSnippets from "./CodeSnippetsClient"
import DevelopmentProcess from "./DevelopmentProcess"
import Challenges from "./Challenges"
import FutureImprovements from "./FutureImprovements"

const sections = [
  { id: "overview", title: "Overview", Component: ProjectOverview },
  { id: "tech-stack", title: "Tech Stack", Component: TechStack },
  { id: "code-snippets", title: "Code Snippets", Component: CodeSnippets },
  { id: "development-process", title: "Development Process", Component: DevelopmentProcess },
  { id: "challenges", title: "Challenges", Component: Challenges },
  { id: "future-improvements", title: "Future Improvements", Component: FutureImprovements },
]

export default function ProjectDetails({ project }: { project: any }) {
  const [activeSection, setActiveSection] = useState("overview")

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <Link href="/#projects">
            <Button variant="ghost" className="mb-4 text-white hover:text-gray-200">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl">{project.description}</p>
        </div>
      </header>

      <nav className="sticky top-0 bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-4 overflow-x-auto">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-2 rounded-full transition-colors duration-200 ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: activeSection === section.id ? 1 : 0, y: activeSection === section.id ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className={activeSection === section.id ? "block" : "hidden"}
          >
            <section.Component {...project} />
          </motion.div>
        ))}
      </main>
    </div>
  )
}
