"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaServer, FaDatabase, FaReact, FaNodeJs, FaArrowRight, FaUsers, FaCreditCard, FaMoneyBillWave, FaUserShield, FaFileInvoiceDollar } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiRedis, SiFirebase, SiVercel, SiTailwindcss, SiExpress, SiJsonwebtokens, SiMysql, SiNpm } from "react-icons/si";
import { MdNotifications, MdPayment, MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import ArchitectureDiagram from './ArchitectureDiagram';

interface ArchitectureProps {
  id: string;
}

const ProjectArchitecture: React.FC<ArchitectureProps> = ({ id }) => {
  // Architecture data based on readme contents
  const architectureData = {
    overview: "The Personal Loan Management System uses a modern three-tier architecture with React frontend, Node.js backend API, and MySQL database. It provides secure authentication, loan management, payment processing, and customer interfaces for a complete personal financial loan solution.",
    frontend: {
      title: "Frontend Layer",
      description: "React-based UI with Vite for fast development. Features responsive design that works across devices, with secure authentication and role-based access control.",
      technologies: ["React", "Vite", "Tailwind CSS", "MUI (Material UI)", "React Router DOM", "JWT Decode", "Lodash", "D3.js"],
      components: ["User Authentication", "Admin Dashboard", "Loan Application Form", "Payment Management", "Customer Portal"]
    },
    backend: {
      title: "Backend Services",
      description: "Node.js backend with Express.js framework implementing RESTful APIs. Includes JWT authentication with role-based access for admins and customers.",
      technologies: ["Node.js", "Express.js", "JWT Authentication", "Bcrypt", "Nodemailer", "SendGrid", "Winston", "Morgan", "Multer"],
      components: ["User Service", "Loan Processing Service", "Payment Service", "Notification Service"]
    },
    database: {
      title: "Data Layer",
      description: "MySQL database for relational data storage with optimized schema for users, loans, and payments. Ensures data integrity for financial transactions.",
      technologies: ["MySQL", "mysql2"],
      components: ["User Records", "Loan Transactions", "Payment History", "System Logs"]
    },
    deployment: {
      title: "Deployment & Setup",
      description: "Simple installation process for local development with separate frontend and backend servers. Easy configuration with environment variables for secure deployment.",
      technologies: ["Git", "npm/Node.js", "Environment Variables (dotenv)", "Helmet", "CORS"],
      components: ["Installation Scripts", "Configuration Setup", "Development Environment", "Database Initialization"]
    }
  };

  // Key features from the readme
  const keyFeatures = [
    {
      title: "User Authentication",
      description: "Secure login with email/password and role-based access for admins and customers",
      icon: <SiJsonwebtokens className="text-yellow-400" />
    },
    {
      title: "Loan Management",
      description: "Register, edit, and track loans with different statuses and payment schedules",
      icon: <FaCreditCard className="text-green-400" />
    },
    {
      title: "Payment Processing",
      description: "Add, edit, and delete payments with proper validation and transaction history",
      icon: <MdPayment className="text-emerald-400" />
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive overview with charts for lending amounts, interest rates, and customer metrics",
      icon: <MdDashboard className="text-purple-400" />
    },
    {
      title: "Customer Portal",
      description: "Self-service view of personal information, loan details, and payment history",
      icon: <FaUsers className="text-blue-400" />
    },
    {
      title: "Email Notifications",
      description: "Automated alerts for loan registration, payment creation, and important updates",
      icon: <MdNotifications className="text-red-400" />
    }
  ];

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

        {/* Using the separated ArchitectureDiagram component */}
        <ArchitectureDiagram />
        
        <div className="mt-8">
          <h4 className="text-xl font-semibold text-cyan-300 mb-4 text-center">Key System Interactions</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <h5 className="font-medium text-emerald-300 mb-2">Authentication Flow</h5>
              <p className="text-gray-300 text-sm">
                Users authenticate through the frontend using JWT tokens, with role-based access controls distinguishing between admin and customer capabilities.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <h5 className="font-medium text-emerald-300 mb-2">Loan Management Flow</h5>
              <p className="text-gray-300 text-sm">
                Admins can create, edit, and manage loans, while customers can view their loan details. Email notifications inform customers of any changes.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <h5 className="font-medium text-emerald-300 mb-2">Payment Processing</h5>
              <p className="text-gray-300 text-sm">
                The system tracks payments against loans, with recent payments being editable. Each payment updates the loan status and triggers notifications.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
              <h5 className="font-medium text-emerald-300 mb-2">Data Persistence</h5>
              <p className="text-gray-300 text-sm">
                All transactions are stored in the MySQL database, ensuring data integrity and allowing for comprehensive reporting and analytics.
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-center mb-8 mt-16">
          Key Features
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {keyFeatures.map((feature, index) => (
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
                  {feature.icon}
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
                      git clone https://github.com/Nardos-Tilahun/Personal_Loan_Management.git<br />
                      cd Personal_Loan_Management<br />
                      # For frontend<br />
                      cd Client && npm install<br />
                      # For backend<br />
                      cd ../Server && npm install
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-medium text-emerald-300 mb-2">Development Environment</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Running the application requires starting both frontend and backend servers:</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <code className="text-cyan-300 text-sm">
                      # Start backend<br />
                      cd Server && nodemon app.js<br />
                      # Start frontend<br />
                      cd Client && npm run dev
                    </code>
                  </div>
                  <p>The application will be available at <span className="text-cyan-300">http://localhost:3000</span></p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-lg font-medium text-emerald-300 mb-2">Security Considerations</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  <li>JWT-based authentication with secure token handling</li>
                  <li>Role-based access control for admin vs customer functionality</li>
                  <li>Environment variables for sensitive configuration</li>
                  <li>Secure password handling with validation</li>
                  <li>Email validation for password reset functionality</li>
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