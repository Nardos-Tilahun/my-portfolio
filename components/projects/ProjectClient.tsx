// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import ProjectOverview from "./ProjectOverview"
// import TechStack from "./TechStack"
// import Architecture from "./Architecture"
// import CodeSnippets from "./CodeSnippets"
// import DevelopmentProcess from "./DevelopmentProcess"
// import Challenges from "./Challenges"
// import FutureImprovements from "./FutureImprovements"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft } from "lucide-react"
// import Link from "next/link"

// const sectionVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// }

// export default function ProjectClient({ project }: { project: any }) {
//   const [activeSection, setActiveSection] = useState("overview")

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll("section")
//       let current = ""

//       sections.forEach((section) => {
//         const sectionTop = section.offsetTop
//         if (window.pageYOffset >= sectionTop - 60) {
//           current = section.getAttribute("id") || ""
//         }
//       })

//       setActiveSection(current)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 relative overflow-hidden">
//         <div className="container mx-auto px-4 relative z-10">
//           <Link href="/#projects">
//             <Button variant="ghost" className="mb-4 text-white hover:text-gray-200">
//               <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
//             </Button>
//           </Link>
//           <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
//           <p className="text-xl">{project.description}</p>
//         </div>
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
//         <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
//       </header>

//       <nav className="sticky top-14 bg-gray-800/80 backdrop-blur-md z-20 py-4 shadow-md">
//         <div className="container mx-auto px-4">
//           <ul className="flex space-x-4 overflow-x-auto pb-2">
//             {[
//               "overview",
//               "tech-stack",
//               "architecture",
//               "code-snippets",
//               "development-process",
//               "challenges",
//               "future-improvements",
//             ].map((section) => (
//               <li key={section}>
//                 <a
//                   href={`#${section}`}
//                   className={`text-sm font-medium px-3 py-2 rounded-full transition-colors duration-200 ${
//                     activeSection === section
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-300 hover:text-white hover:bg-gray-700"
//                   }`}
//                 >
//                   {section
//                     .split("-")
//                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(" ")}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </nav>

//       <main className="container mx-auto px-4 py-12">
//         <AnimatePresence>
//           <motion.section id="overview" initial="hidden" animate="visible" variants={sectionVariants}>
//             <ProjectOverview overview={project.overview} />
//           </motion.section>

//           <motion.section id="tech-stack" initial="hidden" animate="visible" variants={sectionVariants}>
//             <TechStack techStack={project.techStack} />
//           </motion.section>

//           <motion.section id="architecture" initial="hidden" animate="visible" variants={sectionVariants}>
//             <Architecture />
//           </motion.section>

//           <motion.section id="code-snippets" initial="hidden" animate="visible" variants={sectionVariants}>
//             <CodeSnippets codeSnippets={project.codeSnippets} />
//           </motion.section>

//           <motion.section id="development-process" initial="hidden" animate="visible" variants={sectionVariants}>
//             <DevelopmentProcess process={project.developmentProcess} />
//           </motion.section>

//           <motion.section id="challenges" initial="hidden" animate="visible" variants={sectionVariants}>
//             <Challenges challenges={project.challenges} />
//           </motion.section>

//           <motion.section id="future-improvements" initial="hidden" animate="visible" variants={sectionVariants}>
//             <FutureImprovements improvements={project.futureImprovements} />
//           </motion.section>
//         </AnimatePresence>
//       </main>
//     </div>
//   )
// }

