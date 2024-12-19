import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectShowcase() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Projects</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>LenderTrack - Loan Management System</CardTitle>
              <CardDescription>MERN Stack Application</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="LenderTrack Dashboard"
                width={600}
                height={300}
                className="w-full rounded-lg object-cover"
              />
              <p className="mt-4">
                A comprehensive loan management system for lenders to track borrowers, manage loan portfolios, and automate repayment processes.
              </p>
              <ul className="mt-2 list-disc list-inside">
                <li>Developed full-stack application using MongoDB, Express.js, React, and Node.js</li>
                <li>Implemented real-time updates and notifications using Socket.io</li>
                <li>Integrated secure authentication and authorization with JWT</li>
                <li>Created responsive design for seamless mobile and desktop experience</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild>
                <a href="https://lendertrack.example.com" target="_blank" rel="noopener noreferrer">Live Demo</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/johndoe/lendertrack" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
              </Button>
            </CardFooter>
          </Card>
          {/* Add more project cards here */}
        </div>
      </div>
    </section>
  )
}

