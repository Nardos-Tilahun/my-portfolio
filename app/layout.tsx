// app/layout.tsx
'use client';

import Link from 'next/link';
import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import "./globals.css";
import dynamic from 'next/dynamic';
import ParticlesBackground from '@/components/ParticlesBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

const DynamicFloatingChat = dynamic(() => import('@/components/FloatingChat'), { ssr: false });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeLinkClicked, setActiveLinkClicked] = useState<string | null>(null);
  const [isScrollingProgrammatically, setIsScrollingProgrammatically] = useState(false);

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const handleSmoothScroll = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

    const isHomePage = pathname === '/';

    if (isHomePage) {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        console.warn(`Target element with ID '${targetId}' not found on home page. Skipping smooth scroll.`);
        return;
      }

      const headerHeight = headerRef.current?.offsetHeight || 0;
      const targetScrollPosition = targetElement.offsetTop - headerHeight - 10;

      const startPosition = window.pageYOffset;
      const distance = targetScrollPosition - startPosition;
      const duration = 1200;
      let startTime: number | null = null;

      setIsScrollingProgrammatically(true);
      setActiveSection(targetId);
      setActiveLinkClicked(targetId);
      setTimeout(() => setActiveLinkClicked(null), 500);

      const animateScroll = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (elapsedTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetScrollPosition);
          setIsScrollingProgrammatically(false);
        }
      };

      requestAnimationFrame(animateScroll);
    } else {
      console.log(`Navigating from ${pathname} to /#${targetId}`);
      await router.push(`/#${targetId}`);
      setTimeout(() => {
        const newTargetElement = document.getElementById(targetId);
        if (newTargetElement) {
          const headerHeight = headerRef.current?.offsetHeight || 0;
          const targetScrollPosition = newTargetElement.offsetTop - headerHeight - 10;
          window.scrollTo({ top: targetScrollPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [easeInOutCubic, headerRef, pathname, router]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${(headerRef.current?.offsetHeight || 0) + 10}px 0px -50% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (pathname === '/' && !isScrollingProgrammatically) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, observerOptions);

    if (pathname === '/') {
      const sections = document.querySelectorAll('#home, #projects, #skills, #about, #contact');
      sections.forEach(section => {
        observer.observe(section);
      });
    }

    return () => {
      const sections = document.querySelectorAll('#home, #projects, #skills, #about, #contact');
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, [isScrollingProgrammatically, pathname]);

  const getLinkClasses = (sectionId: string) => `
    relative
    text-gray-900
    font-medium
    hover:scale-105
    transition-all
    duration-200
    transform-gpu
    hover:translate-x-1
    ${activeSection === sectionId ? 'text-teal-600 font-semibold active-link' : 'hover:text-teal-700'}
    ${activeLinkClicked === sectionId ? 'shadow-lg shadow-teal-500/50' : ''}
    ${activeLinkClicked === sectionId ? 'animate-pulse-once' : ''}
  `;

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen text-gray-100 w-full">
          <ParticlesBackground />

          <header
            ref={headerRef}
            className="fixed top-0 z-40 w-full border-b border-green-800 bg-gray-500 bg-opacity-70 backdrop-blur-md shadow-lg transition-all duration-300"
          >
            <div className="container mx-auto flex h-14 items-center md:px-14 px-4 ">
              <Link href="/#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="flex items-center space-x-2">
                <span className="text-2xl text-gray-900 font-extrabold transition-all duration-200
                  hover:scale-110 hover:shadow-2xl hover:shadow-gray-600 transform-gpu
                  hover:translate-x-2 hover:translate-y-1 relative group"
                >
                  NTD
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-500 to-teal-500 opacity-20 rounded-xl blur-md group-hover:scale-125 transition-all duration-300"></span>
                </span>
              </Link>

              <nav className="ml-auto flex gap-4 sm:gap-12">
                <Link
                  className={getLinkClasses('projects')}
                  href="/#projects"
                  onClick={(e) => handleSmoothScroll(e, 'projects')}
                >
                  Projects
                  <AnimatePresence>
                    {activeSection === 'projects' && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 rounded-full shadow-md shadow-teal-400/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
                <Link
                  className={getLinkClasses('skills')}
                  href="/#skills"
                  onClick={(e) => handleSmoothScroll(e, 'skills')}
                >
                  Skills
                  <AnimatePresence>
                    {activeSection === 'skills' && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 rounded-full shadow-md shadow-teal-400/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
                <Link
                  className={getLinkClasses('about')}
                  href="/#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                >
                  About
                  <AnimatePresence>
                    {activeSection === 'about' && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 rounded-full shadow-md shadow-teal-400/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
                <Link
                  className={getLinkClasses('contact')}
                  href="/#contact"
                  onClick={(e) => handleSmoothScroll(e, 'contact')}
                >
                  Contact
                  <AnimatePresence>
                    {activeSection === 'contact' && (
                      <motion.span
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-500 rounded-full shadow-md shadow-teal-400/50"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
                <a
                  href="/api/download-resume"
                  className="ml-2 px-3 py-1 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-md font-medium text-sm flex items-center gap-1 hover:shadow-lg hover:shadow-green-700/30 transform transition-all duration-300 hover:scale-105 relative group"
                  aria-label="Download Resume"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 16l4-4h-3V3h-2v9H8l4 4zm9 4v-2H3v2h18z" />
                  </svg>
                  <span className="hidden sm:inline">Resume</span>

                  {/* Tooltip */}
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-[-28px] sm:left-1/2 sm:-translate-x-1/2  left-[-70px] whitespace-nowrap pointer-events-none z-50">
                    Download CV
                  </div>
                </a>

              </nav>
            </div>
          </header>

          <main
            className="flex-1 md:px-12 px-4 bg-transparent w-full pt-14"
          >
            <div className="container mx-auto">
              {children}
            </div>
          </main>

          <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 space-y-6 md:space-y-0">

              {/* Left Section - Text Color Changed to bright, readable gray, added shadow */}
              <div className="text-center md:text-left order-1 md:order-1">
                {/* Applied Gradient to text */}
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 text-sm leading-loose drop-shadow-sm">
                  Built by{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-500">Nardos Tilahun</span>.
                  Hosted on{" "}
                  <a
                    href="https://render.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-teal-200 transition-colors"
                  >
                    Render
                  </a>
                  .
                </p>
              </div>

              {/* Center Section - Social Links - Icons' colors changed to vibrant defaults and matching hovers */}
              <div className="flex items-center justify-center space-x-4 order-3 md:order-3">
                <a
                  href="https://linkedin.com/in/nardos-tilahun-74260213a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-200 transition-transform transform hover:scale-110 drop-shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.379-.621-2.5-2-2.5-1.206 0-2 .806-2 2.5v5.5h-3v-10h3v1.341c.421-.787 1.635-1.341 3-1.341 2.757 0 4 1.743 4 4.5v5.5z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Nardos-Tilahun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-200 transition-transform transform hover:scale-110 drop-shadow-sm"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.419-1.305.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.311.469-2.382 1.236-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.77.839 1.236 1.91 1.236 3.221 0 4.61-2.804 5.625-5.474 5.922.43.371.823 1.102.823 2.221v3.293c0 .32.192.694.801.576 4.765-1.587 8.201-6.085 8.201-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://res.cloudinary.com/dyayxqlzr/image/upload/v1753021337/Nardos_Tilahun_CV_Resume_djluwf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-200 transition-transform transform hover:scale-110 drop-shadow-sm"
                  aria-label="Resume"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2z" />
                  </svg>
                </a>
              </div>

              {/* Copyright Section - Applied Gradient to text */}
              <div className="flex items-center justify-center order-2 md:order-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-300 to-green-400 py-3 drop-shadow-sm">© {new Date().getFullYear()} All rights reserved.</span>
              </div>

              {/* Right Section - Applied Gradient to text */}
              <div className="text-center md:text-right order-4 md:order-4">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 text-sm leading-loose drop-shadow-sm">
                  Source code available on{" "}
                  <a
                    href="https://github.com/Nardos-Tilahun/my-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-500 "
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>

            </div>
          </footer>

          <DynamicFloatingChat />
        </div>
      </body>
    </html>
  );
}
