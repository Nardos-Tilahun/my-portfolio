"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, BarChart, Users, FileText, CreditCard,  Edit, Plus, AlertCircle, Home, ZoomIn, X, } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

// Import Project and Screenshot interfaces and data fetching functions
import { Project } from '@/data/projects'
import { getScreenshotsByProjectId, Screenshot } from '@/data/screenshots'


interface ProjectOverviewProps {
  project: Project // Now expects a full Project object as a prop
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showDetailedDescription, setShowDetailedDescription] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const containerRef = useRef<HTMLDivElement>(null)
  const lastWheelTime = useRef<number>(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Fetch screenshots relevant to this project ID
  const allProjectScreenshots: Screenshot[] = getScreenshotsByProjectId(project.id);

  // Filter screenshots based on active category
  const filteredScreenshots = activeCategory === "All"
    ? allProjectScreenshots
    : allProjectScreenshots.filter(screenshot => screenshot.category === activeCategory);

  useEffect(() => {
    // Reset current index when changing categories
    setCurrentIndex(0);
    setShowDetailedDescription(false); // Also reset detailed description visibility
  }, [activeCategory, project.id]); // Add project.id as a dependency

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleNext = useCallback(() => {
    if (isScrolling || currentIndex >= filteredScreenshots.length - 1) return
    setIsScrolling(true)
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => setIsScrolling(false), 500)
  }, [isScrolling, currentIndex, filteredScreenshots.length])

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

      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      if (isMobile) {
        if (absY > 10) {
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
  }, [handleNext, handlePrev, isMobile])

  const getScreenshotStyle = (index: number) => {
    const diff = index - currentIndex
    let translateX = 0
    let opacity = 1
    let scale = 1
    let zIndex = 1

    if (diff === 0) {
      translateX = 0
      zIndex = 2
      scale = 1
    } else if (Math.abs(diff) === 1) {
      translateX = diff * 100
      zIndex = 1
      scale = 0.9
      opacity = 0.7
    } else {
      translateX = diff * 120
      zIndex = 0
      scale = 0.8
      opacity = 0
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.5s ease-out",
    }
  }

  // Function to check if screenshot has a valid Cloudinary ID
  const hasValidCloudinaryId = (cloudinaryId: string) => {
    return cloudinaryId && !cloudinaryId.startsWith('default_');
  };

  // Get the unique categories from the project's screenshots
  const categories = ["All", ...new Set(allProjectScreenshots.map(item => item.category))];

  // Function to get icon for screenshot
  const getIconForScreenshot = (title: string) => {
    if (title.includes("Dashboard")) return <BarChart className="w-5 h-5" />;
    if (title.includes("User") || title.includes("Admin")) return <Users className="w-5 h-5" />;
    if (title.includes("Loan") || title.includes("Shipment")) return <FileText className="w-5 h-5" />;
    if (title.includes("Payment")) return <CreditCard className="w-5 h-5" />;
    if (title.includes("Add") || title.includes("New")) return <Plus className="w-5 h-5" />;
    if (title.includes("Edit") || title.includes("Form")) return <Edit className="w-5 h-5" />;
    if (title.includes("Error") || title.includes("Not Found")) return <AlertCircle className="w-5 h-5" />;
    return <Home className="w-5 h-5" />;
  };

  const toggleDetailedDescription = () => {
    setShowDetailedDescription(!showDetailedDescription);
  };

  // Get badge color based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Admin":
      case "Dashboard": // For shipment project dashboard
      case "Auth": // For shipment project auth
        return "bg-indigo-900/50 text-indigo-200 border-indigo-500";
      case "Customer":
      case "Shipments": // For shipment project shipments
      case "Forms": // For shipment project forms
        return "bg-emerald-900/50 text-emerald-200 border-emerald-500";
      case "Mutual":
      case "Error":
        return "bg-rose-900/50 text-rose-200 border-rose-500";
      default:
        return "bg-gray-800/50 text-gray-200 border-gray-500";
    }
  };
  const navigateScreenshots = (direction : number) => {
    const newIndex = (currentIndex + direction + filteredScreenshots.length) % filteredScreenshots.length;
    setCurrentIndex(newIndex);
  };
  // Get icon color based on category
  const getCategoryIconColor = (category: string) => {
    switch(category) {
      case "Admin":
      case "Dashboard":
      case "Auth":
        return "bg-indigo-500/70";
      case "Customer":
      case "Shipments":
      case "Forms":
        return "bg-emerald-500/70";
      case "Mutual":
      case "Error":
        return "bg-rose-500/70";
      default:
        return "bg-gray-500/70";
    }
  };

  // Render nothing if project data is not provided or screenshots are empty
  if (!project || allProjectScreenshots.length === 0) {
    return (
      <section id="overview" className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>No project data or screenshots found for this ID.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="overview" className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-center mb-4 font-sans">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600">
            {project.title}
          </span>
        </h2>
        <p className="text-center text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
          {project.description}
        </p>
  
        {/* Project Details - Now full width matching the screenshots section */}
        <div className="max-w-full mx-auto mb-12">
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <span className="bg-gradient-to-r from-purple-400 to-indigo-500 w-6 h-0.5 mr-2"></span>
                Project Overview
              </CardTitle>
              <CardDescription className="text-gray-400">
                Details and technologies
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="mb-6">
                <Badge variant="outline" className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-200 border-indigo-500 mb-4">
                  {project.type}
                </Badge>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed font-light tracking-wide bg-gradient-to-r from-gray-200 via-indigo-100 to-gray-200 bg-clip-text text-transparent">
                  {project.content} {/* Changed from longDescription to content */}
                </p>
              </div>
  
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-purple-400 to-indigo-500 w-6 h-0.5 mr-2"></span>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700/60 text-gray-200 rounded-full text-sm border border-gray-600/30 backdrop-blur-sm transition-all hover:bg-gray-600/80 cursor-default">
                        {tech.name} {/* Access tech.name */}
                      </span>
                    ))}
                  </div>
                </div>
  
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-purple-400 to-indigo-500 w-6 h-0.5 mr-2"></span>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start list-none group">
                        <span className="text-indigo-400 mr-2 text-lg group-hover:text-purple-400 transition-colors">•</span>
                        <span className="font-light text-gray-300 group-hover:text-indigo-200 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
  
            </CardContent>
          </Card>
        </div>
        
        {/* Full-width Screenshot Gallery */}
        <div>
          <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/90 backdrop-blur-sm shadow-xl border border-gray-700/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <span className="bg-gradient-to-r from-purple-400 to-indigo-500 w-6 h-0.5 mr-2"></span>
                Project Screenshots
              </CardTitle>
              <CardDescription className="text-gray-400">
                Scroll through to see some pages of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm h-6 md:h-8 ${
                    activeCategory === category
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  {category}
                </Button>
              ))}
              </div>
              
              <div className="flex justify-center items-center gap-6 mb-4">
                <Button
                  onClick={handlePrev}
                  disabled={currentIndex <= 0}
                  className={`p-2 rounded-full transition-all ${
                    currentIndex <= 0
                      ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-indigo-800 text-white"
                  }`}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-gray-300 font-mono">
                  {filteredScreenshots.length > 0 ? `${currentIndex + 1} / ${filteredScreenshots.length}` : "0 / 0"}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={currentIndex >= filteredScreenshots.length - 1}
                  className={`p-2 rounded-full transition-all ${
                    currentIndex >= filteredScreenshots.length - 1
                      ? "bg-gray-800/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-indigo-800 text-white"
                  }`}
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Full-width Screenshot Container */}
              <div className="flex flex-col w-full">
                  {/* Mobile Header - Only visible on mobile */}
                  <div className="md:hidden mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {filteredScreenshots[currentIndex]?.title || "Screenshots"}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className={`${getCategoryIconColor(filteredScreenshots[currentIndex]?.category)} p-1.5 rounded-full mr-2 backdrop-blur-sm`}>
                        {getIconForScreenshot(filteredScreenshots[currentIndex]?.title)}
                      </span>
                      <Badge variant="outline" className={`mt-1 text-xs ${getCategoryColor(filteredScreenshots[currentIndex]?.category)}`}>
                        {filteredScreenshots[currentIndex]?.category || "General"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 font-light mt-2">
                      {filteredScreenshots[currentIndex]?.description || "Browse through the screenshots."}
                    </p>
                    
                    {/* Show/Hide Details Button */}
                    {filteredScreenshots[currentIndex]?.detailedDescription && (
                      <>
                        <Button
                          onClick={toggleDetailedDescription}
                          variant="outline"
                          className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all mt-3"
                        >
                          {showDetailedDescription ? "Hide Details" : "Show Full Description"}
                        </Button>
                        
                        {showDetailedDescription && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-gray-700/50"
                          >
                            <p className="text-sm text-gray-300 font-light leading-relaxed">
                              {filteredScreenshots[currentIndex]?.detailedDescription}
                            </p>
                          </motion.div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Screenshots Container */}
                  <div
                    ref={containerRef}
                    className="relative w-full aspect-[1892/855] overflow-hidden select-none rounded-xl"
                  >
                    <AnimatePresence>
                      {filteredScreenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          className="absolute w-full h-full"
                          style={getScreenshotStyle(index)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className="h-full"
                          >
                            <div className="relative h-full rounded-lg overflow-hidden border border-gray-700/50 shadow-xl">
                              {/* Expandable Image Container */}
                              <div
                                className={`w-full h-full transition-all duration-300 ${
                                  isExpanded && currentIndex === index ? "fixed inset-0 z-50 bg-black/90" : ""
                                }`}
                                onClick={() => {
                                  if (isExpanded) {
                                    setIsExpanded(false);
                                  } else {
                                    setCurrentIndex(index);
                                    setIsExpanded(true);
                                  }
                                }}
                              >
                                {hasValidCloudinaryId(screenshot.cloudinaryId) ? (
                                  <CldImage
                                    src={screenshot.cloudinaryId}
                                    alt={screenshot.title}
                                    width={1892}
                                    height={855}
                                    className={`${
                                      isExpanded && currentIndex === index
                                        ? "w-full h-full object-contain p-4 md:p-8"
                                        : "w-full h-full object-contain"
                                    }`}
                                  />
                                ) : (
                                  <Image
                                    src={`https://via.placeholder.com/1892x855?text=Image+Missing`} // Fallback placeholder
                                    alt={screenshot.title}
                                    width={1892}
                                    height={855}
                                    className={`${
                                      isExpanded && currentIndex === index
                                        ? "w-full h-full object-contain p-4 md:p-8"
                                        : "w-full h-full object-cover"
                                    }`}
                                  />
                                )}
                                
                                {/* Mobile expand indicator */}
                                {!isExpanded && (
                                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm p-2 rounded-full md:hidden">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                  </div>
                                )}
                                
                                {/* Close button when expanded */}
                                {isExpanded && currentIndex === index && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsExpanded(false);
                                    }}
                                    className="absolute top-4 right-4 bg-black/70 hover:bg-red-700 p-2 rounded-full text-white transition-colors"
                                    aria-label="Close expanded view"
                                  >
                                    <X className="w-6 h-6" />
                                  </button>
                                )}
                              </div>
                              
                              {/* Info overlay - Only shown on desktop or when expanded on mobile */}
                              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 ${
                                isExpanded && currentIndex === index ? "hidden" : "hidden md:block"
                              }`}>
                                <div className="flex items-center mb-2">
                                  <span className={`${getCategoryIconColor(screenshot.category)} p-1.5 rounded-full mr-2 backdrop-blur-sm`}>
                                    {getIconForScreenshot(screenshot.title)}
                                  </span>
                                  <div>
                                    <h4 className="text-xl font-bold text-white">{screenshot.title}</h4>
                                    <Badge variant="outline" className={`mt-1 text-xs ${getCategoryColor(screenshot.category)}`}>
                                      {screenshot.category}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-300 font-light mt-2 max-w-3xl">{screenshot.description}</p>
                                
                                {showDetailedDescription && index === currentIndex && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 pt-3 border-t border-gray-700/50 max-w-3xl"
                                  >
                                    <p className="text-sm text-gray-300 font-light leading-relaxed">
                                      {screenshot.detailedDescription}
                                    </p>
                                  </motion.div>
                                )}
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDetailedDescription();
                                  }}
                                  variant="outline"
                                  className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all mt-3"
                                >
                                  {showDetailedDescription ? "Hide Details" : "Show Full Description"}
                                </Button>
                              </div>
                              
                              {/* Mobile expanded view info */}
                              {isExpanded && currentIndex === index && (
                                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:hidden">
                                  <div className="flex items-center mb-2">
                                    <span className={`${getCategoryIconColor(screenshot.category)} p-1.5 rounded-full mr-2 backdrop-blur-sm`}>
                                      {getIconForScreenshot(screenshot.title)}
                                    </span>
                                    <div>
                                      <h4 className="text-xl font-bold text-white">{screenshot.title}</h4>
                                      <Badge variant="outline" className={`mt-1 text-xs ${getCategoryColor(screenshot.category)}`}>
                                        {screenshot.category}
                                      </Badge>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-300 font-light mt-2 max-w-3xl">{screenshot.description}</p>
                                  
                                  {showDetailedDescription && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-3 pt-3 border-t border-gray-700/50 max-w-3xl"
                                    >
                                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                                        {screenshot.detailedDescription}
                                      </p>
                                    </motion.div>
                                  )}
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDetailedDescription();
                                    }}
                                    variant="outline"
                                    className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-all mt-3"
                                  >
                                    {showDetailedDescription ? "Hide Details" : "Show Full Description"}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Navigation controls for mobile - optional to add if needed */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 md:hidden z-10">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/60 backdrop-blur-sm border-gray-700 text-white hover:bg-black/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateScreenshots(-1);
                        }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/60 backdrop-blur-sm border-gray-700 text-white hover:bg-black/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateScreenshots(1);
                        }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProjectOverview