"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import ArchitectureDiagram from './ArchitectureDiagram';
// Import the ProjectArchitectureData interface and the data fetching function, and iconMap
import { ProjectArchitectureData, getArchitectureDataByProjectId, iconMap } from '@/data/architectureData';


interface ArchitectureProps {
  id: string;
}

const ProjectArchitecture: React.FC<ArchitectureProps> = ({ id }) => {

  const architectureData: ProjectArchitectureData | undefined = getArchitectureDataByProjectId(id);

  if (!architectureData) {
    return (
      <section id="architecture" className="relative w-full py-24 overflow-hidden">
        <div className="relative container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-300 text-center mb-12">
            Error
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            Architecture data not found for project ID: {id}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="architecture" className="relative w-full py-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

      <div className="relative container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-center mb-12">
           System Architecture
        </h2>

        <Card className="group backdrop-blur-lg bg-white/10 border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 mb-12">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">
              {architectureData.overview}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {Object.values([
            architectureData.frontend,
            architectureData.backend,
            architectureData.database,
            architectureData.deployment
          ]).map((layer) => (
            <Card
              key={layer.title}
              className="group relative overflow-hidden backdrop-blur-lg bg-white/10 border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  {layer.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-300 mb-4">{layer.description}</p>

                <h4 className="text-sm uppercase text-gray-400 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {layer.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 text-cyan-300 text-xs rounded-full border border-cyan-800/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-sm uppercase text-gray-400 mb-2">Components</h4>
                <ul className="space-y-2">
                  {layer.components.map((component, index) => (
                    <li
                      key={index}
                      className="text-gray-300 hover:text-emerald-300 transition-colors pl-3 border-l border-gray-700 hover:border-emerald-500"
                    >
                      {component}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center mb-8">
          System Architecture Diagram
        </h3>

        {/* Using the separated ArchitectureDiagram component, passing data */}
        <ArchitectureDiagram
          diagramComponents={architectureData.diagramComponents}
          diagramConnections={architectureData.diagramConnections}
        />

        <div className="mt-8">
          <h4 className="text-xl font-semibold text-cyan-300 mb-4 text-center">Key System Interactions</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {architectureData.keyInteractions.map((interaction, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                <h5 className="font-medium text-emerald-300 mb-2">{interaction.title}</h5>
                <p className="text-gray-300 text-sm">
                  {interaction.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center mb-8 mt-16">
          Key Features
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {architectureData.keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors border border-gray-700 hover:border-cyan-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 text-3xl">
                  {iconMap[feature.icon]} {/* Render icon from map */}
                </div>
                <h5 className="font-medium text-emerald-300">{feature.title}</h5>
              </div>
              <p className="text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Card className="group backdrop-blur-lg bg-white/10 border-0 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Implementation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-medium text-emerald-300 mb-2">Installation & Setup</h4>
                <div className="space-y-2 text-gray-300">
                  <p>The system is divided into client (frontend) and server (backend) components, each with its own installation process:</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <code className="text-cyan-300 text-sm">
                      {architectureData.installationAndSetup.map((line, idx) => (
                        <React.Fragment key={idx}>{line}<br /></React.Fragment>
                      ))}
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-medium text-emerald-300 mb-2">Development Environment</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Running the application requires starting the necessary services:</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <code className="text-cyan-300 text-sm">
                      {architectureData.developmentEnvironment.map((line, idx) => (
                        <React.Fragment key={idx}>{line}<br /></React.Fragment>
                      ))}
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-medium text-emerald-300 mb-2">Security Considerations</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {architectureData.securityConsiderations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional floating elements for depth */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
}

export default ProjectArchitecture;