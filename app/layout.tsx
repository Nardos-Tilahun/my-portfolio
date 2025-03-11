// app/layout.tsx
import Link from 'next/link'
import { ReactNode } from 'react';
import "./globals.css";
import FloatingChat from '@/components/FloatingChat';
export const metadata = {
  title: 'Nardos Tilahun - Portfolio',
  description: 'Web developer portfolio for Nardos Tilahun',
}
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children } : RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen text-gray-900 w-full">
          <header className="sticky top-0 z-40 w-full border-b border-green-800 bg-gray-500 bg-opacity-70 backdrop-blur-md shadow-lg transition-all duration-300">
            <div className="container mx-auto flex h-14 items-center md:px-14 px-4 ">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl text-gray-900 font-extrabold transition-all duration-200 
                  hover:scale-110 hover:shadow-2xl hover:shadow-gray-600 transform-gpu 
                  hover:translate-x-2 hover:translate-y-1 relative">
                  NTD
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-500 to-teal-500 opacity-20 rounded-xl blur-md"></span>
                </span>
              </Link>

              <nav className="ml-auto flex gap-4 sm:gap-12">
                <Link
                  className="text-gray-900 hover:text-underline hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500 transform-gpu hover:translate-x-1"
                  href="/#projects"
                >
                  Projects
                </Link>
                <Link
                  className="text-gray-900 hover:text-underline hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500 transform-gpu hover:translate-x-1"
                  href="/#skills"
                >
                  Skills
                </Link>
                <Link
                  className="text-gray-900 hover:text-underline hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500 transform-gpu hover:translate-x-1"
                  href="/#about"
                >
                  About
                </Link>
                <Link
                  className="text-gray-900 hover:text-underline hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray-500 transform-gpu hover:translate-x-1"
                  href="/#contact"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          
          <main className="flex-1 md:px-12 px-4 bg-gray-900 w-full">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
          
          <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 space-y-6 md:space-y-0">
              
              {/* Left Section */}
              <div className="text-center md:text-left order-1 md:order-1">
                <p className="text-sm leading-loose text-green-400/80">
                  Built by{" "}
                  <span className="font-semibold text-green-300">Nardos Tilahun</span>. 
                  Hosted on{" "}
                  <a
                    href="https://render.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-green-400 transition-colors"
                  >
                    Render
                  </a>
                  .
                </p>
              </div>

              {/* Center Section - Social Links */}
              <div className="flex items-center justify-center space-x-4 order-3 md:order-3">
                <a
                  href="https://linkedin.com/in/nardos-tilahun-74260213a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-transform transform hover:scale-110"
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
                  className="text-green-400 hover:text-green-300 transition-transform transform hover:scale-110"
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
                  href="https://drive.google.com/file/d/1in0RVRK0Q6G5-nOMhFY1_8xIdzWCl9qi/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-transform transform hover:scale-110"
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

              {/* Copyright Section */}
              <div className="flex items-center justify-center order-2 md:order-2">
                <span className="text-gradient py-3">© {new Date().getFullYear()} All rights reserved.</span>
              </div>

              {/* Right Section */}
              <div className="text-center md:text-right order-4 md:order-4">
                <p className="text-sm leading-loose text-green-400/80">
                  Source code available on{" "}
                  <a
                    href="https://github.com/Nardos-Tilahun/my-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 hover:text-green-400 transition-colors"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>

            </div>
          </footer>


          <FloatingChat />
        </div>
      </body>
    </html>
  )
}