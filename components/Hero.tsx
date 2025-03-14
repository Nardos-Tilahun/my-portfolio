
"use client";
import { useState, useEffect, FC } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import { ChevronRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Define proper TypeScript interfaces
interface CrossBrowserEmeraldNameProps {
  text: string;
  className?: string;
}

interface LetterStyleType {
  color: string;
  textShadow?: string; 
}

// Cross Browser Emerald Name Component - Embedded in same file
const CrossBrowserEmeraldName: FC<CrossBrowserEmeraldNameProps> = ({ 
  text = "Nardos T. Dubale", 
  className = "text-4xl sm:text-6xl font-bold tracking-tight" 
}) => {
  const letters = text.split('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  
  // In the CrossBrowserEmeraldName component, update the useEffect hook:

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentPosition(prev => {
      // When we reach the end, immediately wrap around to start
      return (prev + 1) % letters.length;
    });
  }, 500);
  
  return () => clearInterval(interval);
}, [letters.length]);

// And update the getLetterStyle function to handle the wrap-around case better:
const getLetterStyle = (index: number): LetterStyleType => {
  // Create a continuous highlightable window that wraps around the text
  const textLength = letters.length;
  
  // Calculate relative distance considering wrap-around
  const distanceForward = (index >= currentPosition) 
    ? index - currentPosition 
    : textLength - currentPosition + index;
  
  const distanceBackward = (index <= currentPosition) 
    ? currentPosition - index 
    : currentPosition + textLength - index;
  
  // Use the smaller of the two distances for a more efficient highlight path
  const distance = Math.min(distanceForward, distanceBackward);
  
  // Highlight the current position and the next 2 characters with gradient
  if (distance === 0) {
    return { 
      color: "#00ffaa", // Brightest, almost glowing emerald
      textShadow: '0 0 15px rgba(16, 185, 129, 0.7)' // Add glow effect to current letter
    };
  }
  if (distance === 1) return { color: "#10b981" }; // Very bright emerald
  if (distance === 2) return { color: "#059669" }; // Medium emerald
  if (distance === 3) return { color: "#047857" }; // Darker emerald
  if (distance === 4) return { color: "#065f46" }; // Dim emerald
  return { color: "#064e3b" }; // Background emerald (slightly brighter than before)
};
  
  return (
    <h1 className={className}>
      {letters.map((letter, index) => (
        <span 
          key={index} 
          style={{
            ...getLetterStyle(index),
            transition: 'color 1s ease, text-shadow 3s ease' // Add transition for text-shadow too
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </h1>
  );
};

interface DeveloperLabelProps {
  className?: string;
}

const DeveloperLabel: FC<DeveloperLabelProps> = ({ className = "" }) => {
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

const Hero: FC = () => {
  return (
    <div className="relative h-[1000px] lg:h-[600px] max-w-[1500px] w-full  mx-auto  overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
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
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-16 lg:mt-0"
                >
                  <CrossBrowserEmeraldName text="Nardos T. Dubale" />
                </motion.div>

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
                <Link href="#projects">
                  <Button 
                    size="lg" 
                    className="group bg-emerald-500/80 text-black backdrop-blur-sm hover:bg-emerald-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                  >
                    Explore Projects
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-emerald-600/50 text-gray-600 backdrop-blur-sm hover:bg-emerald-900/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400 hover:shadow-lg hover:shadow-emerald-500/20"
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