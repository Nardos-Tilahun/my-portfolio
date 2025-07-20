// personalData.ts (or wherever your personal info is stored)

export const personalData = {
  "basic": {
    "name": "Nardos T Dubale",
    "title": "Full Stack Developer",
    "yearsOfExperience": 2,
    "summary": "Pioneering Full Stack Developer with extensive expertise in architecting high-performance web applications, including sophisticated logistics and financial systems, using React, Next.js, Node.js, and Django. He leverages his unique background in civil engineering to deliver robust system architectures and innovative solutions. Nardos has a demonstrated track record of implementing AI-driven features, including Agents and MCP server integration, and leading agile development cycles that consistently exceed project KPIs."
  },
  "experience": [
    {
      "company": "Freelancer",
      "title": "Full Stack Developer",
      "period": "2023-present",
      "description": "Actively developing and deploying diverse full-stack applications, including a Personal Financial Loan Management System and a comprehensive Shipment Tracking System for Logistics. Applying expertise in MERN stack, Django, and modern cloud technologies, including AI tools like Agents and MCP server, to deliver scalable, secure, and intelligent solutions for real-world challenges."
    },
    {
      "company": "ALX and Evangadi Bootcamp",
      "title": "Full Stack Developer Student",
      "period": "2023-2025",
      "description": "Collaborated with over 20 developers using Git workflow and agile methodologies. Achieved top 5% ranking among 500+ bootcamp participants. Led 3 team projects with 100% on-time delivery and client satisfaction. Gained foundational knowledge in AI tools through the ALX AI Start Kit program."
    },
    {
      "company": "Nardos Tilahun General Construction and SIS Engineering PLC",
      "title": "Civil Engineer (Contractor & Structural Designer)",
      "period": "2018-2023",
      "description": "Worked as a solo contractor and structural designer, developing software solutions for challenges in construction and design. This experience honed analytical thinking, complex problem-solving, and meticulous project management skills, which are directly transferable to full-stack development."
    }
  ],
  "education": {
    "degree": "Master in Computer Science",
    "institution": "HiLCoE School of Computer Science and Technology",
    "graduationYear": "2025",
    "achievements": "Maintained a great GPA while completing advanced coursework in Distributed Systems & Cloud Computing, Advanced Algorithms & Data Structures, Machine Learning & AI Applications, Cybersecurity & Network Protocol Design."
  },
  "skills": [
    "Frontend Development: React.js, Next.js, TypeScript, Redux, Material-UI, Tailwind CSS",
    "Backend Development: Node.js, Express.js, Django, RESTful APIs, GraphQL",
    "Database & Cloud: MongoDB, MySQL, PostgreSQL, AWS, Docker, Kubernetes",
    "DevOps & Tools: CI/CD, Git, Jenkins, Terraform, Microservices Architecture",
    "Security & Testing: JWT, OAuth2.0, Jest, Cypress, End to End Testing",
    "Methodologies: Agile/Scrum, TDD, DDD, Microservices Architecture",
    "AI & Machine Learning: Agents, MCP Server, AI Toolkits (from ALX AI Start Kit)", // Added AI specific skills
    "HTML5",
    "CSS3",
    "JavaScript (ES6+)",
    "Git/GitHub",
    "Redis",
    "Authentication/Authorization"
  ],
  "projects": [
    {
      "name": "Personal Financial Loan Management System",
      "description": "A comprehensive platform for managing personal loans online with separate interfaces for administrators and customers.",
      "longDescription": "This full-stack web application enables secure loan management for both administrators and customers. Administrators can manage users, loans, and payments, while customers can track their loan statuses and payment history. The application streamlines the entire lending process with features like authentication, payment tracking, email notifications, and detailed analytics.",
      "technologies": [
        "React", "Node.js", "Express", "MySQL", "JWT", "Tailwind CSS",
        "Vite", "SendGrid", "D3.js", "Material UI", "Lodash", "Bcrypt",
        "Nodemailer", "Winston", "Morgan", "Multer", "React Router DOM",
        "Helmet", "CORS", "Country-State-City", "React Phone Number Input"
      ],
      "keyFeatures": [
        "User authentication with role-based access control",
        "Comprehensive loan application management",
        "Payment tracking and transaction history",
        "Interactive dashboard with financial analytics",
        "Automated email notifications",
        "Customer verification system",
        "Multi-currency support",
        "Responsive design for all devices",
        "Batch operations for admin efficiency",
        "Real-time input validation"
      ],
      "architecture": {
        "overview": "The system uses a modern three-tier architecture with React frontend, Node.js backend API, and MySQL database.",
        "frontend": {
          "description": "React-based UI with Vite for fast development. Features responsive design that works across devices, with secure authentication and role-based access control.",
          "technologies": ["React", "Vite", "Tailwind CSS", "MUI (Material UI)", "React Router DOM", "JWT Decode", "Lodash", "D3.js"],
          "components": ["User Authentication", "Admin Dashboard", "Loan Application Form", "Payment Management", "Customer Portal"]
        },
        "backend": {
          "description": "Node.js backend with Express.js framework implementing RESTful APIs. Includes JWT authentication with role-based access for admins and customers.",
          "technologies": ["Node.js", "Express.js", "JWT Authentication", "Bcrypt", "Nodemailer", "SendGrid", "Winston", "Morgan", "Multer"],
          "components": ["User Service", "Loan Processing Service", "Payment Service", "Notification Service"]
        },
        "dataLayer": {
          "description": "MySQL database for relational data storage with optimized schema for users, loans, and payments. Ensures data integrity for financial transactions.",
          "technologies": ["MySQL", "mysql2"],
          "components": ["User Records", "Loan Transactions", "Payment History", "System Logs"]
        }
      },
      "systemInteractions": {
        "authFlow": "Users authenticate through the frontend using JWT tokens, with role-based access controls distinguishing between admin and customer capabilities.",
        "loanManagementFlow": "Admins can create, edit, and manage loans, while customers can view their loan details. Email notifications inform customers of any changes.",
        "paymentProcessing": "The system tracks payments against loans, with recent payments being editable. Each payment updates the loan status and triggers notifications.",
        "dataPersistence": "All transactions are stored in the MySQL database, ensuring data integrity and allowing for comprehensive reporting and analytics."
      },
      "challenges": [
        {
          "title": "Frontend Design Collaboration",
          "description": "Faced difficulties designing an intuitive and engaging main page that would represent the platform effectively. The UI needed to be professional while remaining user-friendly for various stakeholders.",
          "solution": "Collaborated with UI/UX designer to create wireframes and prototypes before implementation, resulting in a clean, modern interface that met all user requirements."
        },
        {
          "title": "Cash-Based Payment Algorithm",
          "description": "Since this was a cash-based system, payments needed to end in round figures. Created a system that would divide payments appropriately across terms while ensuring the total amount was covered.",
          "solution": "Developed a custom algorithm that distributes payments optimally while maintaining rounded payment amounts."
        },
        {
          "title": "Time Constraints & First Real-World Project",
          "description": "As my first full-scale real-world project, I faced significant time pressure to deliver a functioning product while learning new concepts and technologies simultaneously.",
          "solution": "Implemented agile methodology with weekly sprints and prioritized core features first, allowing for iterative improvements while meeting deadlines."
        },
        {
          "title": "Evolving Requirements",
          "description": "Throughout the development process, customer requirements frequently changed, requiring flexibility and adaptability in the system architecture.",
          "solution": "Built the system with modular components and clean separation of concerns, allowing for easier adaptation to changing requirements."
        }
      ],
      "futureImprovements": [
        {
          "feature": "Online Payment Integration",
          "description": "Implement secure payment gateways allowing customers to make loan payments online via credit/debit cards, bank transfers, and digital wallets, eliminating the need for cash transactions.",
          "benefits": ["Increased payment convenience", "Reduced processing time", "Automated reconciliation"],
          "technologies": ["Stripe API", "PayPal", "Plaid"]
        },
        {
          "feature": "Advanced Analytics Dashboard",
          "description": "Implement data visualization tools showing loan performance metrics, customer payment history trends, and predictive analytics for risk assessment.",
          "benefits": ["Data-driven decision making", "Risk mitigation", "Performance tracking"],
          "technologies": ["D3.js", "TensorFlow.js", "React Query"]
        },
        {
          "feature": "Multi-currency Support",
          "description": "Expand beyond USD and Colombian Peso to support additional currencies with real-time exchange rate integration.",
          "benefits": ["Global market expansion", "Currency risk management", "International reach"],
          "technologies": ["Exchange Rate API", "Currency.js", "i18next"]
        },
        {
          "feature": "Mobile Application",
          "description": "Develop a native mobile application to allow customers to manage loans, make payments, and receive notifications on-the-go.",
          "benefits": ["Increased user engagement", "24/7 account access", "Push notifications"],
          "technologies": ["React Native", "Expo", "Firebase"]
        },
        {
          "feature": "Automated Payment Reminders",
          "description": "Implement an automated system to send customizable payment reminders at scheduled intervals before due dates.",
          "benefits": ["Reduced delinquency rates", "Improved communication", "Lower overhead"],
          "technologies": ["Twilio API", "SendGrid", "Node-cron"]
        },
        {
          "feature": "Document Management System",
          "description": "Add functionality for secure uploading, storing, and managing loan-related documents with OCR capabilities.",
          "benefits": ["Centralized document storage", "Reduced paperwork", "Enhanced security"],
          "technologies": ["AWS S3", "Tesseract.js", "PDF.js"]
        }
      ],
      "links": {
        "github": "https://github.com/Nardos-Tilahun/Personal_Loan_Management",
        "demoVideo": "https://drive.google.com/file/d/12TCHhbN9O247U_YvgtSOUyNYbuyyGHbu/view?usp=sharing",
        "liveSite": "https://personal-loan-management.onrender.com"
      },
      "role": "Full Stack Developer",
      "outcome": "Successfully delivered a full-stack application with MySQL that provides a comprehensive loan management platform. The system now efficiently handles all aspects of the lending process while maintaining high standards of security and user experience."
    },
    {
      "name": "Shipment Tracking System for Logistics",
      "description": "A robust full-stack web application for managing and tracking logistics shipments, with user management and dashboard analytics.",
      "longDescription": "This comprehensive system streamlines logistics operations by allowing administrators to manage users and track shipments from creation to delivery. It provides a user-friendly interface for creating, viewing, editing, and deleting shipment records. The system features a powerful dashboard with real-time statistics, charts for various metrics (status, type, office, payment), and recent activity. Secure JWT authentication and role-based access control ensure data integrity and user permissions. Furthermore, Nardos integrated advanced AI tools like Agents and MCP server APIs into the system to enhance predictive capabilities and optimize logistical workflows.",
      "technologies": [
        "Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts", "Sonner",
        "Node.js", "Prisma ORM", "PostgreSQL", "JWT (Jose)", "Bcryptjs", "Cloudinary",
        "Agents (AI)", "MCP Server (AI)", "AI Toolkits" // Added AI specific technologies
      ],
      "keyFeatures": [
        "Secure User Authentication (JWT)",
        "Role-Based Access Control (Admin/User)",
        "Comprehensive Shipment CRUD (Create, Read, Update, Delete)",
        "Interactive Dashboard with Analytics and Charts",
        "Shipment Filtering, Search, Pagination, and Sorting",
        "Detailed Shipment Views",
        "User Management (Admin-only)",
        "Responsive Design",
        "AI-driven Predictive Analytics for Delivery Times", // Added AI-driven feature
        "Optimized Logistics Workflows via Agents" // Another AI-driven feature
      ],
      "architecture": {
        "overview": "The Shipment Tracking System uses a modern Next.js framework for a full-stack approach, with robust backend services and a PostgreSQL database. It's designed for high performance and scalability, incorporating advanced AI components.",
        "frontend": {
          "description": "Next.js frontend providing SSR/CSR for optimal performance. Features a rich UI for managing shipments and users, with interactive dashboards and multi-tabbed forms.",
          "technologies": ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts", "Sonner"],
          "components": ["Dashboard", "Shipment List (Table/Grid)", "Shipment Details", "Multi-tabbed Forms", "User Management UI", "Login Page"]
        },
        "backend": {
          "description": "Next.js API Routes serving as a robust backend. Handles API endpoints for data operations, authentication, and integrates with AI services (Agents, MCP server) for enhanced capabilities.",
          "technologies": ["Node.js", "Next.js API Routes", "Prisma ORM", "JWT (Jose)", "Bcryptjs", "Agents (AI)", "MCP Server (AI)"],
          "components": ["Authentication API", "Shipment CRUD API", "Dashboard Analytics API", "User Management API", "AI Integration Layer"]
        },
        "dataLayer": {
          "description": "PostgreSQL database managed via Prisma ORM for efficient, type-safe data access. Stores all logistics, user, and historical data.",
          "technologies": ["PostgreSQL", "Prisma ORM"],
          "components": ["Shipment Records", "User Accounts", "Status Enums", "Audit Logs"]
        }
      },
      "systemInteractions": {
        "authFlow": "Secure user authentication with JWT. Role-based access ensures admins have full control while general users can view specific data.",
        "shipmentLifecycle": "Admins manage shipments from creation to delivery. The system tracks status changes, container details, and integrates AI for optimized routing and predictions.",
        "dashboardAnalytics": "Backend APIs efficiently aggregate shipment data, enhanced by AI insights, to power real-time statistics and predictive trends on the dashboard.",
        "aiIntegration": "Leverages Agents and MCP server to process shipment data, provide predictive analytics (e.g., estimated delivery times), and suggest optimized logistics workflows."
      },
      "challenges": [
        {
          "title": "Integrating Advanced AI APIs",
          "description": "The challenge was effectively incorporating complex AI APIs like Agents and MCP server to provide meaningful predictive and optimization features without overcomplicating the system architecture or user experience.",
          "solution": "Developed a dedicated AI integration layer within the backend services, using modular design patterns to ensure seamless communication and data flow between the core logic and AI services. Focused on clear API contracts and robust error handling."
        },
        {
          "title": "Optimizing Data Queries for Large Datasets",
          "description": "As the shipment data grew, ensuring fast and efficient retrieval for dashboard analytics and filtered lists became critical.",
          "solution": "Utilized Prisma's advanced querying capabilities, including `groupBy` and `select` optimizations. Implemented database indexing and pagination strategies to maintain high performance."
        },
        {
          "title": "Implementing Robust Authentication & Authorization",
          "description": "Ensuring secure and fine-grained access control (RBAC) across both Next.js API routes and client-side components.",
          "solution": "Leveraged Next.js middleware and JWT (with Jose library) for token verification and user context propagation. Designed a custom `AuthContext` for global client-side auth state and secure route protection."
        }
      ],
      "futureImprovements": [
        {
          "feature": "Real-time Tracking & GPS Integration",
          "description": "Integrate with third-party GPS tracking services and carrier APIs to provide real-time location updates of shipments on a map interface.",
          "benefits": ["Enhanced visibility", "Proactive issue resolution", "Improved customer satisfaction"],
          "technologies": ["Google Maps API", "WebSockets", "Carrier APIs"]
        },
        {
          "feature": "Automated Notifications & Alerts",
          "description": "Implement automated email/SMS alerts for key shipment milestones (e.g., departure, arrival, delays) to stakeholders.",
          "benefits": ["Timely communication", "Reduced customer inquiries", "Proactive issue alerts"],
          "technologies": ["Twilio", "SendGrid", "Cron jobs"]
        },
        {
          "feature": "Customer & Agent Portals",
          "description": "Develop dedicated, restricted-access portals for customers to view statuses and for external agents to update milestones.",
          "benefits": ["Self-service capabilities", "Reduced administrative burden", "Improved collaboration"],
          "technologies": ["NextAuth.js", "Dedicated React Components"]
        },
        {
          "feature": "Advanced Reporting & Export",
          "description": "Expand dashboard capabilities with custom report generation (e.g., monthly volume, performance metrics) and export options (PDF, Excel).",
          "benefits": ["Deeper business insights", "Easier compliance reporting", "Enhanced data analysis"],
          "technologies": ["React-PDF", "SheetJS", "Chart.js"]
        },
        {
          "feature": "Predictive Maintenance for Vehicles (AI-Enhanced)",
          "description": "Utilize AI and sensor data to predict potential vehicle breakdowns, optimizing maintenance schedules and minimizing downtime in logistics.",
          "benefits": ["Reduced operational costs", "Increased fleet uptime", "Proactive problem solving"],
          "technologies": ["Machine Learning (TensorFlow/PyTorch)", "IoT sensor data", "Azure IoT Hub/AWS IoT Core", "Predictive models"]
        }
      ],
      "links": {
        "github": "https://github.com/Nardos-Tilahun/Shipment-Tracking-System", // Placeholder
        "demoVideo": "https://drive.google.com/file/d/your-shipment-demo-video-link/view", // Placeholder
        "liveSite": "https://shipment-tracking-system.vercel.app/" // Placeholder
      },
      "role": "Full Stack Developer (Lead)",
      "outcome": "Successfully built and deployed a scalable logistics tracking system. This project significantly enhanced Nardos's expertise in Next.js, PostgreSQL, Prisma, and the practical application of AI through Agents and MCP server, delivering a solution that provides real-time insights and operational efficiency."
    }
  ],
  "contact": {
    "email": "contactnardos@gmail.com",
    "phone": "+251 949 494319",
    "linkedin": "www.linkedin.com/in/nardosdubale",
    "github": "https://github.com/Nardos-Tilahun",
    "twitter": "@Nardos_Tilahun",
    "resume": "https://res.cloudinary.com/dyayxqlzr/image/upload/v1753021337/Nardos_Tilahun_CV_Resume_djluwf.pdf"
  },
  "interests": [
    "Web development",
    "Cloud technologies",
    "AI-powered tools",
    "Machine Learning & Data Science",
    "Low-level programming (C & Assembly)",
    "Data structures & algorithms"
  ]
}
