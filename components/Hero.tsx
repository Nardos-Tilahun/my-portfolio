"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const DeveloperLabel = ({ className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={`absolute transform ${className}`}
      drag
      dragConstraints={{
        top: -100,
        left: -100,
        right: 100,
        bottom: 100,
      }}
      whileDrag={{ scale: 1.1 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 p-1 rounded-lg backdrop-blur-md shadow-lg cursor-pointer"
        whileHover={{ scale: 1.05 }}
        animate={{
          rotate: [0, 45, 0, -45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="block px-6 py-2 text-sm font-medium text-emerald-100">
          Full Stack Developer
        </span>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="relative min-h-screen max-w-[1500px] w-full overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-6 md:py-24 py-12">
          {/* Desktop Label - Center Position */}
          <div className="hidden lg:block">
            <DeveloperLabel className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center order-1 lg:order-2"
            >
              <div className="relative h-72 w-72 sm:h-96 sm:w-96">
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.div 
                  className="relative rounded-full backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <CldImage
                    alt="Nardos"
                    src="bmz45lpesnklxhbro714"
                    width={384}
                    height={384}
                    className="rounded-full border-4 border-emerald-700/50 object-cover shadow-2xl"
                  />
                </motion.div>

                {/* Mobile Label */}
                <div className="lg:hidden">
                  <DeveloperLabel className="-bottom-16 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-8 order-2 lg:order-1 text-center lg:text-left"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-900 to-gray-600 sm:text-6xl mt-16 lg:mt-0"
                >
                  Nardos Tilahun
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="max-w-xl text-lg text-gray-300 mx-auto lg:mx-0"
                >
                  Crafting innovative web solutions with cutting-edge technologies. 
                  Focused on creating immersive, high-performance applications 
                  that push the boundaries of what&#39;s possible on the web.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start"
              >
                <Link
                    href="#projects"
                  >
                <Button 
                  size="lg" 
                  className="group bg-emerald-500/80 text-black backdrop-blur-sm hover:bg-emerald-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  
                    Explore Projects
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                </Link>
                <Link
                    href="#contact"
                  >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-emerald-600/50 text-emerald-300 backdrop-blur-sm hover:bg-emerald-900/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  
                     Get in Touch
                    <ExternalLink className="ml-2 h-4 w-4" />
                  
                </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;