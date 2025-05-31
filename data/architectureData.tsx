// data/architectureData.ts

import React from 'react';
import {
  FaUserShield, FaUsers, FaCreditCard, FaMoneyBillWave, FaReact,
  FaBoxOpen, FaTruck, FaFileAlt, FaDatabase, FaServer, FaCloud,
  FaShieldAlt, FaChartBar, FaGlobe, FaMobileAlt, FaClock, FaWrench
} from "react-icons/fa";
import {
  SiJsonwebtokens, SiMysql, SiPostgresql, SiKubernetes, SiDocker,
  SiRedis, SiNextdotjs
} from "react-icons/si";
import { MdNotifications } from "react-icons/md";
import { GiCargoShip, GiPapers } from "react-icons/gi"; // For shipment specific icons

// Shared Interfaces
export interface DiagramComponent {
  id: string;
  icon: string; // Changed to string to store icon component name
  label: string;
  x: number; // percentage
  y: number; // percentage
  color: string; // Tailwind color class (e.g., "purple-400")
  description?: string;
}

export interface Connection {
  from: string;
  to: string;
  label: string;
  style?: "solid" | "dashed";
  color?: string; // Tailwind color class (e.g., "purple-300")
}

export interface ArchitectureDetailLayer {
  title: string;
  description: string;
  technologies: string[];
  components: string[];
}

export interface ArchitectureFeature {
  title: string;
  description: string;
  icon: string; // Changed to string to store icon component name
}

// Main Project Architecture Data Interface
export interface ProjectArchitectureData {
  overview: string;
  frontend: ArchitectureDetailLayer;
  backend: ArchitectureDetailLayer;
  database: ArchitectureDetailLayer;
  deployment: ArchitectureDetailLayer;
  keyInteractions: { title: string; description: string; }[];
  keyFeatures: ArchitectureFeature[];
  installationAndSetup: string[]; // Code snippets or text
  developmentEnvironment: string[]; // Code snippets or text
  securityConsiderations: string[]; // List of points
  diagramComponents: DiagramComponent[];
  diagramConnections: Connection[];
}

// Map of string names to React icon components
export const iconMap: { [key: string]: React.ReactNode } = {
  // General Icons
  "FaUserShield": <FaUserShield />,
  "FaUsers": <FaUsers />,
  "FaReact": <FaReact />,
  "SiJsonwebtokens": <SiJsonwebtokens />,
  "FaDatabase": <FaDatabase />,
  "FaServer": <FaServer />,
  "FaCloud": <FaCloud />,
  "FaShieldAlt": <FaShieldAlt />,
  "FaChartBar": <FaChartBar />,
  "MdNotifications": <MdNotifications />,
  "FaFileAlt": <FaFileAlt />,
  "FaWrench": <FaWrench />,
  "GiPapers": <GiPapers />,
  "SiNextdotjs": <SiNextdotjs />,
  "SiMysql": <SiMysql />,
  "SiPostgresql": <SiPostgresql />,
  "GiCargoShip": <GiCargoShip />,
  "FaCreditCard": <FaCreditCard />,
  "FaMoneyBillWave": <FaMoneyBillWave />,

  // Add more icons as needed for other projects or features
};


const allArchitectureData: { [projectId: string]: ProjectArchitectureData } = {
  'personal-loan-management': {
    overview: "The Personal Loan Management System is a full-stack web application designed to streamline loan management processes for both administrators and customers. It features distinct interfaces, robust authentication, detailed analytics, and automated notifications.",
    frontend: {
      title: "Frontend Layer",
      description: "User interfaces for both admin and customer portals, designed for responsiveness and intuitive interaction.",
      technologies: ["React", "Tailwind CSS", "Vite", "Material UI", "React Router DOM", "React Phone Number Input"],
      components: ["Admin Dashboard", "Customer Dashboard", "Loan Forms", "Payment Forms", "Auth Pages"]
    },
    backend: {
      title: "Backend Services",
      description: "Handles business logic, API endpoints, authentication, and data interactions.",
      technologies: ["Node.js", "Express", "JWT", "Bcrypt", "Lodash", "Winston", "Morgan", "Multer", "CORS", "Helmet"],
      components: ["Auth Service", "User Management API", "Loan Management API", "Payment Processing API", "Notification Service"]
    },
    database: {
      title: "Database Layer",
      description: "Relational database for structured storage of all application data.",
      technologies: ["MySQL"],
      components: ["User Data", "Loan Records", "Payment Transactions", "Role Definitions"]
    },
    deployment: {
      title: "Deployment & Tools",
      description: "Tools and practices for development, testing, and deployment.",
      technologies: ["Git", "GitHub", "Vercel (Frontend)", "Heroku (Backend - example)"],
      components: ["Version Control", "CI/CD Pipeline (Conceptual)", "API Documentation (Postman)"]
    },
    keyInteractions: [
      { title: "Authentication Flow", description: "Users authenticate through the frontend using JWT tokens, with role-based access controls distinguishing between admin and customer capabilities." },
      { title: "Loan Management Flow", description: "Admins can create, edit, and manage loans, while customers can view their loan details. Email notifications inform customers of any changes." },
      { title: "Payment Processing", description: "The system tracks payments against loans, with recent payments being editable. Each payment updates the loan status and triggers notifications." },
      { title: "Data Persistence", description: "All transactions are stored in the MySQL database, ensuring data integrity and allowing for comprehensive reporting and analytics." }
    ],
    keyFeatures: [
      { title: "Role-Based Access", description: "Ensures secure and appropriate access levels for administrators and customers.", icon: "FaUserShield" },
      { title: "Financial Analytics", description: "Interactive dashboards provide insights into loan performance and customer payment trends.", icon: "FaChartBar" },
      { title: "Automated Notifications", description: "Email alerts for loan updates, payment reminders, and other critical events.", icon: "MdNotifications" },
      { title: "User & Loan Management", description: "Full CRUD operations for managing users, loan applications, and payment records.", icon: "FaFileAlt" }
    ],
    installationAndSetup: [
      `git clone https://github.com/Nardos-Tilahun/Personal_Loan_Management.git`,
      `cd Personal_Loan_Management`,
      `# For frontend`,
      `cd Client && npm install`,
      `# For backend`,
      `cd ../Server && npm install`
    ],
    developmentEnvironment: [
      `# Start backend`,
      `cd Server && nodemon app.js`,
      `# Start frontend`,
      `cd Client && npm run dev`,
      `The application will be available at http://localhost:3000`
    ],
    securityConsiderations: [
      "JWT-based authentication with secure token handling",
      "Role-based access control for admin vs customer functionality",
      "Environment variables for sensitive configuration",
      "Secure password handling with validation",
      "Email validation for password reset functionality"
    ],
    diagramComponents: [
      { id: "adminUser", icon: "FaUserShield", label: "Admin Users", x: 6, y: 12, color: "purple-400", description: "System administrators who manage the platform" },
      { id: "customerUser", icon: "FaUsers", label: "Customer Users", x: 6, y: 42, color: "blue-400", description: "End users who apply for and manage loans" },
      { id: "frontend", icon: "FaReact", label: "React Frontend", x: 30, y: 27, color: "cyan-400", description: "Responsive UI built with React and Tailwind CSS" },
      { id: "authService", icon: "SiJsonwebtokens", label: "Auth Service", x: 55, y: 12, color: "yellow-400", description: "Handles user authentication and JWT management" },
      { id: "loanService", icon: "FaCreditCard", label: "Loan Service", x: 55, y: 30, color: "green-400", description: "Processes loan applications and manages loan status" },
      { id: "paymentService", icon: "FaMoneyBillWave", label: "Payment Service", x: 55, y: 48, color: "emerald-400", description: "Handles payment processing and transaction history" },
      { id: "notificationService", icon: "MdNotifications", label: "Notification Service", x: 55, y: 66, color: "red-400", description: "Sends email and in-app notifications to users" },
      { id: "database", icon: "SiMysql", label: "MySQL Database", x: 95, y: 30, color: "blue-500", description: "Stores user, loan, and transaction data" },
    ],
    diagramConnections: [
      { from: "adminUser", to: "frontend", label: "Admin UI Access", color: "purple-300" },
      { from: "customerUser", to: "frontend", label: "Customer Portal", color: "blue-300" },

      { from: "frontend", to: "authService", label: "Auth Requests", color: "yellow-300" },
      { from: "frontend", to: "loanService", label: "Loan Management", color: "green-300" },
      { from: "frontend", to: "paymentService", label: "Payment Processing", color: "emerald-300" },

      { from: "authService", to: "database", label: "User Data", color: "yellow-300" },
      { from: "loanService", to: "database", label: "Loan Records", color: "green-300" },
      { from: "paymentService", to: "database", label: "Payment Transactions", color: "emerald-300" },

      { from: "loanService", to: "notificationService", label: "Loan Updates", color: "green-300" },
      { from: "paymentService", to: "notificationService", label: "Payment Alerts", color: "emerald-300" },
      { from: "notificationService", to: "customerUser", label: "Email Notifications", style: "dashed", color: "red-300" }
    ]
  },
  'shipment-tracking-system': {
    overview: "The Shipment Tracking System is a robust full-stack web application designed for logistics management. It provides comprehensive tools for administrators to manage users and track shipments, offering detailed views, analytics, and secure role-based access.",
    frontend: {
      title: "Frontend Layer",
      description: "Built with Next.js, providing server-side rendering for optimal performance and a rich user experience.",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts"],
      components: ["Dashboard", "Shipment List (Table/Grid)", "Shipment Details", "Multi-tabbed Forms", "User Management UI", "Login Page"]
    },
    backend: {
      title: "Backend Services",
      description: "Handles API routes, business logic, authentication, and database interactions, leveraging Next.js API Routes.",
      technologies: ["Node.js", "Next.js API Routes", "Prisma ORM", "JWT (Jose)", "Bcryptjs"],
      components: ["Authentication API", "Shipment CRUD API", "Dashboard Analytics API", "User Management API", "Data Filtering & Pagination"]
    },
    database: {
      title: "Database Layer",
      description: "Scalable relational database for storing all logistics and user data.",
      technologies: ["PostgreSQL", "Prisma ORM"],
      components: ["Shipment Records", "User Accounts", "Status Enums", "Audit Logs"]
    },
    deployment: {
      title: "Deployment & Infrastructure",
      description: "Modern cloud-native deployment strategy ensuring scalability and reliability.",
      technologies: ["Vercel (Frontend/API)", "Cloudinary (Asset Management)", "Docker (Conceptual)"],
      components: ["Serverless Functions (API Routes)", "Managed Database Service", "CDN for Assets"]
    },
    keyInteractions: [
      { title: "Authentication & Authorization", description: "Users log in via JWT. Next.js middleware and API routes enforce role-based access for admins and general users for all data access." },
      { title: "Shipment Lifecycle Management", description: "Admins perform CRUD operations on shipments. The system tracks status changes, container details, and payment/tax refund statuses throughout the shipment journey." },
      { title: "Dashboard Data Aggregation", description: "Backend APIs efficiently query and aggregate shipment data to provide real-time statistics and trends for the interactive dashboard." },
      { title: "Dynamic Data Filtering", description: "The shipment list supports advanced filtering, searching, and pagination, with backend queries optimized for performance and responsiveness." }
    ],
    keyFeatures: [
      { title: "Secure Authentication", description: "JWT-based authentication with Bcrypt for password hashing ensures secure access.", icon: "FaShieldAlt" },
      { title: "Comprehensive CRUD", description: "Full control over shipment records, including creation, viewing, editing, and deletion.", icon: "FaWrench" },
      { title: "Interactive Analytics", description: "Visualize key logistics metrics and trends through dynamic charts on the dashboard.", icon: "FaChartBar" },
      { title: "Advanced Data Management", description: "Robust filtering, searching, and pagination capabilities for efficient data navigation.", icon: "GiPaperStack" }
    ],
    installationAndSetup: [
      `git clone https://github.com/Nardos-Tilahun/shipment-tracking-system.git`, // Placeholder for actual repo link
      `cd shipment-tracking-system`,
      `npm install`,
      `# Configure environment variables (.env.local) for database connection, JWT secret, etc.`,
      `npx prisma db push # To sync database schema`,
      `npx prisma db seed # To seed initial data (optional)`
    ],
    developmentEnvironment: [
      `# Run in development mode`,
      `npm run dev`,
      `The application will be available at http://localhost:3000`
    ],
    securityConsiderations: [
      "JWT for API authentication and authorization (with Jose library)",
      "Bcrypt.js for secure password hashing",
      "Role-Based Access Control (RBAC) enforced on API routes and UI",
      "Environment variables for sensitive API keys and database credentials",
      "Input validation on all forms and API endpoints",
      "HTTPS enforcement in production"
    ],
    diagramComponents: [
      { id: "adminUser", icon: "FaUserShield", label: "Admin Users", x: 6, y: 12, color: "purple-400", description: "System administrators with full management access" },
      { id: "generalUser", icon: "FaUsers", label: "General Users", x: 6, y: 42, color: "blue-400", description: "Standard users with limited access (e.g., view own shipments)" },
      { id: "nextjsFrontend", icon: "SiNextdotjs", label: "Next.js App", x: 30, y: 27, color: "cyan-400", description: "React-based UI with SSR/CSR, built with Next.js" },
      { id: "nextjsApiRoutes", icon: "FaServer", label: "Next.js API Routes", x: 55, y: 12, color: "green-400", description: "Backend API endpoints for data operations and authentication" },
      { id: "prismaOrm", icon: "FaDatabase", label: "Prisma ORM", x: 75, y: 30, color: "red-400", description: "Database toolkit for type-safe queries to PostgreSQL" },
      { id: "postgresqlDb", icon: "SiPostgresql", label: "PostgreSQL DB", x: 95, y: 30, color: "blue-500", description: "Relational database storing all shipment and user data" },
      { id: "cloudinary", icon: "FaCloud", label: "Cloudinary (Assets)", x: 55, y: 48, color: "orange-400", description: "Cloud service for managing images and other static assets" },
      { id: "jwtAuth", icon: "SiJsonwebtokens", label: "JWT Authentication", x: 75, y: 12, color: "yellow-400", description: "Handles token generation, validation, and user session management" },
      { id: "shipmentService", icon: "GiCargoShip", label: "Shipment Service", x: 55, y: 30, color: "emerald-400", description: "Manages shipment CRUD operations and business logic" },
      { id: "dashboardAnalytics", icon: "FaChartBar", label: "Dashboard Analytics", x: 55, y: 66, color: "indigo-400", description: "Aggregates and processes data for dashboard visualizations" },
    ],
    diagramConnections: [
      { from: "adminUser", to: "nextjsFrontend", label: "Admin UI Access", color: "purple-300" },
      { from: "generalUser", to: "nextjsFrontend", label: "User Portal", color: "blue-300" },

      { from: "nextjsFrontend", to: "nextjsApiRoutes", label: "API Requests", color: "cyan-300" },

      { from: "nextjsApiRoutes", to: "jwtAuth", label: "Auth Requests", color: "yellow-300" },
      { from: "nextjsApiRoutes", to: "shipmentService", label: "Shipment Data", color: "emerald-300" },
      { from: "nextjsApiRoutes", to: "dashboardAnalytics", label: "Analytics Requests", color: "indigo-300" },
      { from: "nextjsApiRoutes", to: "cloudinary", label: "Asset Uploads", color: "orange-300" },

      { from: "jwtAuth", to: "prismaOrm", label: "User Auth Data", color: "yellow-300" },
      { from: "shipmentService", to: "prismaOrm", label: "Read/Write Shipment", color: "emerald-300" },
      { from: "dashboardAnalytics", to: "prismaOrm", label: "Aggregated Data", color: "indigo-300" },

      { from: "prismaOrm", to: "postgresqlDb", label: "ORM Queries", color: "red-300" },

      // Additional relevant connections
      { from: "nextjsFrontend", to: "cloudinary", label: "Display Assets", color: "orange-300", style: "dashed" },
    ]
  }
};

export const getArchitectureDataByProjectId = (projectId: string): ProjectArchitectureData | undefined => {
  return allArchitectureData[projectId];
};