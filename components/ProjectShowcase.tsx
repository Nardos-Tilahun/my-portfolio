"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react"
import { CldImage } from "next-cloudinary"
import { motion } from "framer-motion"
import Link from "next/link"
import ProjectModal from "./projects/ProjectModal"

// Import Project and projects array from data/projects.ts
import { Project, projects } from '@/data/projects';

// Define the props interface for ProjectShowcase
interface ProjectShowcaseProps {
  id: string; // Add id to the props interface
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ id }) => { // Accept id prop
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isLastCard, setIsLastCard] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastWheelTime = useRef<number>(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // projects.length is a static value, so it doesn't need to be in the dependency array.
    setIsLastCard(currentIndex === (isMobile ? projects.length - 1 : projects.length - 2))
  }, [currentIndex, isMobile]) // Removed projects.length

  const handleNext = useCallback(() => {
    // projects.length is a static value, so it doesn't need to be in the dependency array.
    if (isScrolling || currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)) return
    setIsScrolling(true)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => setIsScrolling(false), 500)
  }, [isScrolling, currentIndex, isMobile]) // Removed projects.length

  const handlePrev = useCallback(() => {
    if (isScrolling || currentIndex <= 0) return
    setIsScrolling(true)
    setCurrentIndex((prev) => prev - 1)
    setTimeout(() => setIsScrolling(false), 500)
  }, [isScrolling, currentIndex])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const wheelHandler = (e: WheelEvent) => {
      const currentTime = Date.now()
      if (currentTime - lastWheelTime.current < 100) return
      lastWheelTime.current = currentTime

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      if (isLastCard) {
        if ((isMobile && e.deltaY > 0) || (!isMobile && e.deltaX > 0)) {
          return
        }
      }

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      if (isMobile) {
        if (absY > 10) {
          e.preventDefault()
          if (e.deltaY > 0) {
            handleNext()
          } else {
            handlePrev()
          }
        }
      } else {
        if (absX > absY && absX > 10) {
          e.preventDefault()
          if (e.deltaX > 0) {
            handleNext()
          } else {
            handlePrev()
          }
        }
      }

      scrollTimeout.current = setTimeout(() => {
        lastWheelTime.current = 0
      }, 500)
    }

    element.addEventListener("wheel", wheelHandler, { passive: false })
    return () => element.removeEventListener("wheel", wheelHandler)
  }, [handleNext, handlePrev, isMobile, isLastCard])

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    let translateX = 0
    let translateY = 0
    let opacity = 1
    let scale = 1
    let zIndex = 1

    if (isMobile) {
      if (diff === 0) {
        translateY = 0
        zIndex = 2
      } else {
        opacity = 0
        scale = 0.8
        translateY = diff < 0 ? -150 : 150
      }
    } else {
      if (diff === 0) {
        translateX = -52
        zIndex = 2
      } else if (diff === 1) {
        translateX = 52
        zIndex = 2
      } else {
        opacity = 0
        scale = 0.8
        translateX = diff < 0 ? -150 : 150
      }
    }

    if (
      (isMobile && (index < currentIndex || index > currentIndex)) ||
      (!isMobile && (index < currentIndex || index > currentIndex + 1))
    ) {
      opacity = 0
    }

    return {
      transform: isMobile ? `translateY(${translateY}%) scale(${scale})` : `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.5s ease-out",
    }
  }

  return (
    <div
      id={id} // Use id prop here
      ref={containerRef}
      className="w-full bg-gray-900 overflow-hidden select-none relative pt-16 pb-16"
    >
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Featured Projects
      </h2>
      <div className="top-8 mt-6 left-0 right-0 flex justify-center gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className={`p-2 rounded-full transition-colors ${
            currentIndex <= 0 ? "bg-gray-700 opacity-50 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)}
          className={`p-2 rounded-full transition-colors ${
            currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)
              ? "bg-gray-700 opacity-50 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full flex justify-center items-center min-h-[600px]">
          {projects.map((project, index) => (
            <div key={index} className="absolute w-full max-w-xl px-4" style={getCardStyle(index)}>
              <Card className="bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Link
                  href={`/projects/${project.id}`}
                  className="transition-colors duration-300 hover:underline hover:text-blue-500"
                  >
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">{project.type}</CardDescription>
                  </CardHeader>
                  </Link>
                <CardContent>
                  <Link
                  href={`/projects/${project.id}`}
                  className="transition-colors duration-300 hover:underline hover:text-blue-500"
                  >
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                    <CldImage
                      alt={`${project.title} preview`}
                      src={project.imageUrl}
                      width={600}
                      height={300}
                      className="w-full rounded-lg object-cover"
                    />
                  </motion.div>
                  </Link>
                    <p className="mt-4 text-gray-300">
                      {project.content.split(". ").slice(0, 2).join(". ") + "."}
                    </p>

                </CardContent>

                <CardFooter className="flex justify-between gap-2 sm:gap-4">
                  <Button
                    onClick={() => setSelectedProject(project)}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 flex items-center hover:text-black gap-1.5 xs:gap-2 transition-transform transform hover:scale-105 text-xs xs:text-sm sm:text-base"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-3 w-3 xs:h-4 xs:w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <Link href={`/projects/${project.id}`} passHref>
                    <Button
                      variant="outline"
                      className="border-emerald-600/50 text-black backdrop-blur-sm hover:bg-emerald-900/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400 hover:shadow-lg hover:shadow-emerald-500/20 px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-3 text-xs xs:text-sm sm:text-base"
                    >
                      View Details
                      <ExternalLink className="ml-1 h-3 w-3 xs:h-4 xs:w-4" />
                    </Button>
                  </Link>
                </CardFooter>


              </Card>
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default ProjectShowcase;