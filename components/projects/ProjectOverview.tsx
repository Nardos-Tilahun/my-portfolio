"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Github, ExternalLink, BarChart, Users, FileText, CreditCard, User, Edit, Plus, AlertCircle, Home, ZoomIn, X, } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CldImage } from 'next-cloudinary'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'

interface Screenshot {
  cloudinaryId: string
  title: string
  description: string
  detailedDescription: string
  category: string
}

interface ProjectDetails {
  id: string
  title: string
  description: string
  type: string
  longDescription: string
  technologies: string[]
  features: string[]
  screenshots: Screenshot[]
  githubUrl: string
  liveDemoUrl: string
}

interface ProjectOverviewProps {
  id: string
  cloudinaryImageIds?: string[] // Array of Cloudinary image IDs to use
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ id, cloudinaryImageIds = [] }) => {
  // Project data based on the README file and all pages from document

  const projectData: ProjectDetails = {
    id: id,
    title: "Personal Financial Loan Management System",
    description: "A comprehensive platform for managing personal loans online",
    type: "Full Stack Web Application",
    longDescription: "This platform enables secure loan management for both administrators and customers. Administrators can manage users, loans, and payments, while customers can track their loan statuses and payment history. The application streamlines the entire lending process with features like authentication, payment tracking, email notifications, and detailed analytics. The system is designed with role-based access to provide different views and capabilities depending on user permissions.",
    technologies: [
        "React", "Node.js", "Express", "MySQL", "JWT",
        "Tailwind CSS", "Vite", "SendGrid", "D3.js",
        "Material UI", "Lodash", "Bcrypt", "Nodemailer",
        "Winston", "Morgan", "Multer", "React Router DOM",
        "Helmet", "CORS", "Country-State-City", "React Phone Number Input"
    ],
    features: [
      "User authentication with role-based access control",
      "Comprehensive loan application management",
      "Payment tracking and transaction history",
      "Interactive dashboard with financial analytics",
      "Automated email notifications",
      "Customer verification system",
      "Multi-currency support",
      "Responsive design for all devices",
      "Batch operations for admin efficiency",
      "Real-time input validation"
    ],
    screenshots: [
      // Admin Role Pages
      {
        cloudinaryId: cloudinaryImageIds[0] || "default_dashboard",
        title: "Admin Dashboard",
        description: "Key performance metrics and visual analytics",
        detailedDescription: "A central overview displaying key performance metrics such as total customers (registered and active), total lending amounts, and visual data through a vertical bar graph and pie chart. It also provides quick-access buttons for adding loans or payments and a transactions table with search, sorting, and pagination options.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[1] || "default_add_user",
        title: "Add User Page",
        description: "Register new customers and admin users",
        detailedDescription: "A modal form to register new users. It includes fields for name, email, role, password, and contact details. The page enforces input validation, displays error messages for incorrect entries, and handles confirmation—via email for customers or explicit confirmation for admin roles.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[2] || "default_edit_user",
        title: "Edit User Page",
        description: "Update existing user information",
        detailedDescription: "A dialog window that lets administrators update existing user details. It pre-fills fields with current data (except email and role, which are fixed) and provides real-time validation. It also shows previous values for comparison and confirms changes upon saving.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[3] || "default_add_loan",
        title: "Add Loan Page",
        description: "Create new loan applications for customers",
        detailedDescription: "A form used to create a new loan for a customer. It starts with a customer lookup and then displays loan-specific fields (amount, period, currency, payment method, duration, interest rate, and start date). The page calculates and displays expiration dates and total interest, with validation and reset options.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[4] || "default_edit_loan",
        title: "Edit Loan Page",
        description: "Modify pending loan details",
        detailedDescription: "A modal dialog that allows editing of a pending loan (editable only if there are no registered payments). It presents pre-populated loan details for review, enables modifications with live validation, and confirms successful updates upon saving.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[5] || "default_add_payment",
        title: "Add Payment Page",
        description: "Register new payments against existing loans",
        detailedDescription: "A form for registering a new payment against an existing loan. It begins with a searchable interface to select a loan, then displays associated customer and loan details. Once selected, the form reveals payment fields with mandatory validations and error handling.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[6] || "default_edit_payment",
        title: "Edit Payment Page",
        description: "Modify recent payment details",
        detailedDescription: "A dialog used to modify details of a recent payment (editable only if no subsequent payments have been made). It pre-populates the payment details, allows adjustments with real-time validation, and confirms the update with a success message.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[7] || "default_customers_page",
        title: "Customers Page",
        description: "List and manage all customer accounts",
        detailedDescription: "A table listing all registered customers. It features a search bar, batch deletion with confirmation, sortable columns (e.g., full name, creation date, status), and pagination. Each customer row offers quick access to editing or detailed view pages.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[8] || "default_admins_page",
        title: "Admins Page",
        description: "List and manage admin user accounts",
        detailedDescription: "A similar table to the Customers Page but for admin users. It provides search and filtering options, batch deletion with confirmation dialogs, inline details expansion, and pagination controls, along with options to edit admin details.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[9] || "default_loans_page",
        title: "Loans Page",
        description: "Comprehensive list of all loans in the system",
        detailedDescription: "A comprehensive table listing all loans. It supports search, filtering (by customer name, issue date, currency, amount, and status), sorting, and batch deletion for pending loans. Navigation options allow quick access to detailed loan information or editing (when eligible), with full pagination controls.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[10] || "default_payments_page",
        title: "Payments Page",
        description: "Track and manage all payment records",
        detailedDescription: "A table listing all payments, similar in functionality to the Loans Page. It enables search, filtering (by customer name, payment date, currency, and amount), sorting, and batch deletion for recent payments. Navigation links provide access to detailed payment information or the editing interface, along with pagination options.",
        category: "Admin"
      },
      {
        cloudinaryId: cloudinaryImageIds[11] || "default_customer_detail_admin",
        title: "Customer Detail (Admin View)",
        description: "Detailed customer profile with loan history",
        detailedDescription: "A detailed view of a specific customer accessed from the Customers Page. It includes sections for Customer Information (name, email with verification status, phone, address), Payment Information (upcoming and total remaining payment details if a loan exists), and Loan Information (a table listing all loans with options to add or view details).",
        category: "Admin"
      },
      
      // Customer Role Pages
      {
        cloudinaryId: cloudinaryImageIds[12] || "default_customer_dashboard",
        title: "Customer Dashboard",
        description: "Customer's personal profile and loan summary",
        detailedDescription: "The landing page for a customer after logging in. It displays personal details such as name, email (with verification status and notification options), phone, and address. Additional sections show Payment Information (upcoming payment details and remaining amounts) and Loan Information (listing all the customer's loans).",
        category: "Customer"
      },
      {
        cloudinaryId: cloudinaryImageIds[13] || "default_loan_detail_customer",
        title: "Loan Detail (Customer View)",
        description: "Customer view of loan details and payment schedule",
        detailedDescription: "A detailed view of a specific loan from the customer's perspective. It provides comprehensive loan details including the principal, issue date, duration, terms, status, total interest, and a breakdown of paid vs. remaining amounts. It also lists payment history and upcoming payment details for that loan.",
        category: "Customer"
      },
      {
        cloudinaryId: cloudinaryImageIds[14] || "default_payment_detail_customer",
        title: "Payment Detail (Customer View)",
        description: "Details of individual payments made by customer",
        detailedDescription: "A detailed view of a specific payment made by the customer. It includes the payment term, amount, date, and status, along with a breakdown of principal versus interest and any penalties. This page also shows associated loan details for full context.",
        category: "Customer"
      },
      
      // Mutual Pages
      {
        cloudinaryId: cloudinaryImageIds[15] || "default_signin_image",
        title: "Sign In Page",
        description: "Secure login for financial services",
        detailedDescription: "A professional sign-in page for financial services, featuring a company logo, email and password input fields, a 'Forgot Password?' option, and a green-themed sign-in button.",
        category: "Mutual",
      },
      {
        cloudinaryId: cloudinaryImageIds[16] || "default_server_error",
        title: "500 Server Error Page",
        description: "User-friendly server error notification",
        detailedDescription: "This page appears when the system encounters an internal server error. It informs the user that a server-side problem has occurred and typically provides a message suggesting to try again later or contact support. Navigation options (like a link to return home) are usually available.",
        category: "Mutual"
      },
      {
        cloudinaryId: cloudinaryImageIds[17] || "default_not_found",
        title: "404 Page Not Found",
        description: "Custom error page for non-existent routes",
        detailedDescription: "A user-friendly 404 error page that displays when a requested page does not exist. It informs the user that the page was not found and typically includes links to navigate back to the home page or other sections of the site.",
        category: "Mutual"
      }
    ],
    githubUrl: "https://github.com/Nardos-Tilahun/Personal_Loan_Management",
    liveDemoUrl: "https://drive.google.com/file/d/12TCHhbN9O247U_YvgtSOUyNYbuyyGHbu/view?usp=sharing"
  }
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isScrolling, setIsScrolling] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showDetailedDescription, setShowDetailedDescription] = useState<boolean>(false)
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const containerRef = useRef<HTMLDivElement>(null)
  const lastWheelTime = useRef<number>(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  // Filter screenshots based on active category
  const filteredScreenshots = activeCategory === "All" 
    ? projectData.screenshots 
    : projectData.screenshots.filter(screenshot => screenshot.category === activeCategory);

  useEffect(() => {
    // Reset current index when changing categories
    setCurrentIndex(0);
  }, [activeCategory]);

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

  // Get the unique categories
  const categories = ["All", ...new Set(projectData.screenshots.map(item => item.category))];

  // Function to get icon for screenshot
  const getIconForScreenshot = (title: string) => {
    if (title.includes("Dashboard")) return <BarChart className="w-5 h-5" />;
    if (title.includes("Add User")) return <Plus className="w-5 h-5" />;
    if (title.includes("Edit User")) return <Edit className="w-5 h-5" />;
    if (title.includes("Add Loan")) return <Plus className="w-5 h-5" />;
    if (title.includes("Edit Loan")) return <Edit className="w-5 h-5" />;
    if (title.includes("Add Payment")) return <Plus className="w-5 h-5" />;
    if (title.includes("Edit Payment")) return <Edit className="w-5 h-5" />;
    if (title.includes("Customers Page")) return <Users className="w-5 h-5" />;
    if (title.includes("Admins Page")) return <Users className="w-5 h-5" />;
    if (title.includes("Loans Page")) return <FileText className="w-5 h-5" />;
    if (title.includes("Payments Page")) return <CreditCard className="w-5 h-5" />;
    if (title.includes("Customer Detail")) return <User className="w-5 h-5" />;
    if (title.includes("Loan Detail")) return <FileText className="w-5 h-5" />;
    if (title.includes("Payment Detail")) return <CreditCard className="w-5 h-5" />;
    if (title.includes("Error")) return <AlertCircle className="w-5 h-5" />;
    if (title.includes("Not Found")) return <AlertCircle className="w-5 h-5" />;
    return <Home className="w-5 h-5" />;
  };

  const toggleDetailedDescription = () => {
    setShowDetailedDescription(!showDetailedDescription);
  };

  // Get badge color based on category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Admin":
        return "bg-indigo-900/50 text-indigo-200 border-indigo-500";
      case "Customer":
        return "bg-emerald-900/50 text-emerald-200 border-emerald-500";
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
        return "bg-indigo-500/70";
      case "Customer":
        return "bg-emerald-500/70";
      case "Error":
        return "bg-rose-500/70";
      default:
        return "bg-gray-500/70";
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section id="overview" className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-center mb-4 font-sans">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600">
            {projectData.title}
          </span>
        </h2>
        <p className="text-center text-xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
          {projectData.description}
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
                  {projectData.type}
                </Badge>
                <p className="text-gray-200 text-lg mb-8 leading-relaxed font-light tracking-wide bg-gradient-to-r from-gray-200 via-indigo-100 to-gray-200 bg-clip-text text-transparent">
                  {projectData.longDescription}
                </p>
              </div>
  
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-purple-400 to-indigo-500 w-6 h-0.5 mr-2"></span>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectData.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700/60 text-gray-200 rounded-full text-sm border border-gray-600/30 backdrop-blur-sm transition-all hover:bg-gray-600/80 cursor-default">
                        {tech}
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
                    {projectData.features.map((feature, index) => (
                      <li key={index} className="flex items-start list-none group">
                        <span className="text-indigo-400 mr-2 text-lg group-hover:text-purple-400 transition-colors">•</span>
                        <span className="font-light text-gray-300 group-hover:text-indigo-200 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
  
              <div className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">
                  {/* Dialog button wrapper to prevent alignment issues */}
                  <div className="inline-block">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <button
                          className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg group"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                          <ExternalLink className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">Watch Demo</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <div className="flex justify-between items-center mb-2">
                            <DialogTitle className="text-xl text-white">{projectData.title} - Demo</DialogTitle>
                           
                          </div>
                        </DialogHeader>
                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                          <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/Uv0tDX2JCDE?autoplay=1&mute=1"
                            title={`${projectData.title} demo video`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className="mt-3 text-gray-300 text-sm">
                          {projectData.description}
                        </div>
                      </DialogContent>
                    </Dialog>
              </div>
    
                  <Link
                    href={projectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-lg border border-gray-700/70 hover:bg-gray-700 transition-all font-medium shadow-lg group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400/10 to-purple-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    <Github className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Repository</span>
                  </Link>
                    
                  <Link
                    href={"https://personal-loan-management.onrender.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-lg group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/20 to-blue-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    <ExternalLink className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Go to Website</span>
                  </Link>
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
                Scroll through to see all pages of the application
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
                  {currentIndex + 1} / {filteredScreenshots.length}
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
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(filteredScreenshots[currentIndex]?.category)}`}>
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
                                    src={`/api/placeholder/1892/855`}
                                    alt={screenshot.title}
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