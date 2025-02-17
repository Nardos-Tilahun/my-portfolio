"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  type: string;
  content: string;
  imageUrl: string;
  features: string[];
  githubUrl: string;
  liveDemoUrl: string;
}


const Carousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isLastCard, setIsLastCard] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
      title: "Personal Loan Management System",
      description: "Loan Management System",
      type: "Full Stack Web Application",
      content: "A comprehensive loan management system for lenders to track borrowers, manage loan portfolios, and automate repayment processes.",
      imageUrl: "/api/placeholder/400/320",
      features: [
        "Developed full-stack application using MySQL, Express.js, React, and Node.js",
        "Implemented real-time updates and notifications using sendgrid email",
        "Integrated secure authentication and authorization with JWT",
      ],
      githubUrl: "https://github.com/Nardos-Tilahun/Personal_Loan_Management",
      liveDemoUrl: "https://drive.google.com/file/d/12TCHhbN9O247U_YvgtSOUyNYbuyyGHbu/view?usp=sharing",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsLastCard(currentIndex === (isMobile ? projects.length - 1 : projects.length - 2));
  }, [currentIndex, isMobile, projects.length]);

  const handleNext = useCallback(() => {
    if (isScrolling || currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)) return;
    setIsScrolling(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsScrolling(false), 500);
  }, [isScrolling, currentIndex, projects.length, isMobile]);

  const handlePrev = useCallback(() => {
    if (isScrolling || currentIndex <= 0) return;
    setIsScrolling(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsScrolling(false), 500);
  }, [isScrolling, currentIndex]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const wheelHandler = (e: WheelEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastWheelTime.current < 100) return;
      lastWheelTime.current = currentTime;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (isLastCard) {
        if ((isMobile && e.deltaY > 0) || (!isMobile && e.deltaX > 0)) {
          return;
        }
      }

      if (isMobile) {
        if (absY > 10) {
          e.preventDefault();
          if (e.deltaY > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      } else {
        if (absX > absY && absX > 10) {
          e.preventDefault();
          if (e.deltaX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }

      scrollTimeout.current = setTimeout(() => {
        lastWheelTime.current = 0;
      }, 500);
    };

    element.addEventListener('wheel', wheelHandler, { passive: false });
    return () => element.removeEventListener('wheel', wheelHandler);
  }, [handleNext, handlePrev, isMobile, isLastCard]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    let translateX = 0;
    let translateY = 0;
    let opacity = 1;
    let scale = 1;
    let zIndex = 1;

    if (isMobile) {
      if (diff === 0) {
        translateY = 0;
        zIndex = 2;
      } else {
        opacity = 0;
        scale = 0.8;
        translateY = diff < 0 ? -150 : 150;
      }
    } else {
      if (diff === 0) {
        translateX = -52;
        zIndex = 2;
      } else if (diff === 1) {
        translateX = 52;
        zIndex = 2;
      } else {
        opacity = 0;
        scale = 0.8;
        translateX = diff < 0 ? -150 : 150;
      }
    }

    if ((isMobile && (index < currentIndex || index > currentIndex)) ||
        (!isMobile && (index < currentIndex || index > currentIndex + 1))) {
      opacity = 0;
    }

    return {
      transform: isMobile 
        ? `translateY(${translateY}%) scale(${scale})`
        : `translateX(${translateX}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.5s ease-out'
    };
  };

  return (
    <div 
      id = "projects"
      ref={containerRef}
      className="w-full bg-gray-900 overflow-hidden select-none relative pt-16 pb-16"
    >
       <h2
                    className="text-3xl font-extrabold tracking-tight sm:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        >
           Featured Projects
        </h2>
        <div className=" top-8 mt-6 left-0 right-0 flex justify-center gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className={`p-2 rounded-full transition-colors ${
            currentIndex <= 0 
              ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)}
          className={`p-2 rounded-full transition-colors ${
            currentIndex >= (isMobile ? projects.length - 1 : projects.length - 2)
              ? 'bg-gray-700 opacity-50 cursor-not-allowed' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
       
        <div className="w-full flex justify-center mt-12 items-center min-h-[600px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="absolute w-full max-w-xl px-4"
              style={getCardStyle(index)}
            >
              
              <Card className="bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <Link
                href="https://personal-loan-management.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:underline hover:text-blue-500"
              >
                <CardHeader>
                  <CardTitle className="text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400">{project.type}</CardDescription>
                </CardHeader>
              </Link>

              <CardContent>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CldImage
                    alt={`${project.title} preview`}
                    src="wkdmwgbc87kxy26g2w8y"
                    width={600}
                    height={300}
                    className="w-full rounded-lg object-cover"
                  />
              
                </motion.div>
                <p className="mt-4 text-gray-300">
                {project.content}
                </p>
                <ul className="mt-4 list-disc list-inside text-gray-400">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <a 
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    className="flex items-center gap-2 bg-red-600 text-white bg-black hover:bg-red-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.499 6.203a2.998 2.998 0 0 0-2.11-2.112C19.811 3.5 12 3.5 12 3.5s-7.811 0-9.389.591A2.998 2.998 0 0 0 .501 6.203C0 7.781 0 12 0 12s0 4.219.501 5.797a2.998 2.998 0 0 0 2.11 2.112c1.578.591 9.389.591 9.389.591s7.811 0 9.389-.591a2.998 2.998 0 0 0 2.11-2.112C24 16.219 24 12 24 12s0-4.219-.501-5.797zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
                    </svg>
                    Live Demo
                  </Button>
                </a>

                {/* GitHub Link */}
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.583 0-.287-.012-1.237-.017-2.237-3.338.737-4.043-1.613-4.043-1.613-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.204.087 1.838 1.237 1.838 1.237 1.07 1.837 2.807 1.307 3.493.997.11-.776.418-1.307.762-1.607-2.665-.3-5.466-1.332-5.466-5.93 0-1.312.469-2.387 1.236-3.23-.124-.302-.536-1.517.117-3.163 0 0 1.007-.322 3.3 1.23a11.477 11.477 0 0 1 3-.4c1.02.005 2.047.137 3 .4 2.29-1.552 3.297-1.23 3.297-1.23.655 1.646.243 2.86.118 3.163.77.843 1.233 1.918 1.233 3.23 0 4.61-2.805 5.63-5.475 5.92.429.37.823 1.102.823 2.222 0 1.607-.014 2.9-.014 3.293 0 .322.192.703.8.583C20.565 22.092 24 17.592 24 12.297c0-6.6-5.4-12-12-12z" />
                    </svg>
                    GitHub
                  </Button>
                </a>
              </CardFooter>
            </Card>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Carousel3D;
