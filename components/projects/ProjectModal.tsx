"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CldImage } from "next-cloudinary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {  Globe, Github, ExternalLink, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from "next/link"




interface ProjectTechnology {
  name: string
  category: "frontend" | "backend" | "database" | "devops" | "other"
}

interface ProjectImage {
  url: string
  alt: string
  caption?: string
}

interface Project {
  id: string
  title: string
  description: string
  type: string
  content: string
  imageUrl: string
  features: string[]
  technologies: ProjectTechnology[]
  images: ProjectImage[]
  challenges: string[]
  solutions: string[]
  learnings: string[]
  timeline: string
  githubUrl: string
  liveDemoUrl: string
  mockSiteUrl: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
  allProjects: Project[]
}



const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, allProjects }) => {
  const [currentTab, setCurrentTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find the index of the current project to enable navigation
  const currentProjectIndex = allProjects.findIndex(p => p.id === project.id)
  
  // Navigate to previous or next project
  const navigateToProject = (direction: "prev" | "next") => {
    let newIndex = direction === "prev" 
      ? (currentProjectIndex - 1 + allProjects.length) % allProjects.length
      : (currentProjectIndex + 1) % allProjects.length
    
    // Return the new project at the calculated index
    return allProjects[newIndex]
  }

  // Handle image navigation
  const navigateImages = (direction: "prev" | "next") => {
    const totalImages = project.images.length
    setCurrentImageIndex(prevIndex => {
      if (direction === "prev") {
        return (prevIndex - 1 + totalImages) % totalImages
      } else {
        return (prevIndex + 1) % totalImages
      }
    })
  }

  // Get background color for technology badge based on category
  const getTechBadgeColor = (category: string): string => {
    switch (category) {
      case "frontend": return "bg-blue-500 hover:bg-blue-600"
      case "backend": return "bg-green-500 hover:bg-green-600"
      case "database": return "bg-yellow-500 hover:bg-yellow-600" 
      case "devops": return "bg-purple-500 hover:bg-purple-600"
      default: return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-gray-800 rounded-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh] text-white relative"
      >
        {/* Close button - floating in top right */}
        <Button 
          onClick={onClose} 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 rounded-full hover:bg-gray-700"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Project title and type badge */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="text-gray-300 bg-gray-700">
              {project.type}
            </Badge>
            <p className="text-gray-400 ml-4 text-sm">{project.timeline}</p>
          </div>
        </div>

        <Tabs defaultValue="overview" onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-800 p-2 rounded-lg">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="Learning"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
            >
              Learning
            </TabsTrigger>
            <TabsTrigger
              value="technical"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
            >
              Technical
            </TabsTrigger>
          </TabsList>



          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="relative">
              <CldImage
                width={800}
                height={450}
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Project Description</h3>
              <p className="text-gray-300 leading-relaxed">{project.content}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-600 rounded-full h-5 w-5 mr-2 mt-1 text-xs">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            
          </TabsContent>

          

          {/* Learning Process Tab */}
          <TabsContent value="Learning" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Challenges & Solutions</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gray-700 bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Challenge {index + 1}</h4>
                    <p className="text-gray-300 mb-3">{challenge}</p>
                    <h4 className="font-semibold text-white mb-2">Solution</h4>
                    <p className="text-gray-300">{project.solutions[index]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Key Learnings</h3>
              <ul className="space-y-2">
                {project.learnings.map((development, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{development}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Technical Details Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Technology Stack</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-gray-400 mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies
                      .filter(tech => tech.category === "frontend")
                      .map((tech, index) => (
                        <Badge key={index} className={`${getTechBadgeColor("frontend")}`}>
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies
                      .filter(tech => tech.category === "backend")
                      .map((tech, index) => (
                        <Badge key={index} className={`${getTechBadgeColor("backend")}`}>
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-2">Database</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies
                      .filter(tech => tech.category === "database")
                      .map((tech, index) => (
                        <Badge key={index} className={`${getTechBadgeColor("database")}`}>
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-gray-400 mb-2">DevOps & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies
                      .filter(tech => tech.category === "devops" || tech.category === "other")
                      .map((tech, index) => (
                        <Badge key={index} className={`${getTechBadgeColor(tech.category)}`}>
                          {tech.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal footer with navigation */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-6 py-3 flex items-center gap-2 transition-transform transform hover:scale-105">
              <Github className="w-5 h-5" />
              GitHub
            </Button>
          </a>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 flex items-center gap-2 transition-transform transform hover:scale-105">
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-4xl bg-gray-900 border-gray-700 text-white">
                    <DialogHeader>
                      <div className="flex justify-between items-center mb-4">
                        <DialogTitle className="text-xl text-white">{project.title} - Demo</DialogTitle>
                        
                      </div>
                    </DialogHeader>
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/Uv0tDX2JCDE?autoplay=1&mute=1" 
                      title={`${project.title} demo video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    </div>
                    <div className="mt-4 text-gray-300">
                      {project.description}
                    </div>
                  </DialogContent>
                </Dialog>`
          <a href={project.mockSiteUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 flex items-center gap-2 transition-transform transform hover:scale-105">
              <Globe className="w-5 h-5" />
              Mock Site
            </Button>
          </a>
          <Link href={`/projects/${project.id}`} passHref>
          <Button 
              variant="outline" 
              className="border-emerald-600/50 text-black backdrop-blur-sm hover:bg-emerald-900/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              
              More Details
                <ExternalLink className="ml-2 h-4 w-4" />
              
            </Button>
            </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectModal