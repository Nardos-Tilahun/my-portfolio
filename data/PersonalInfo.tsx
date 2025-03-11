export const personalData = {
  "basic": {
    "name": "Nardos T Dubale",
    "title": "Full Stack Developer",
    "yearsOfExperience": 2,
    "summary": "Pioneering Full Stack Developer with proven expertise in architecting high-performance web applications using React, Next.js, Node.js, and Django. Leveraging a unique background in civil engineering to deliver robust system architectures and innovative solutions. Demonstrated track record of implementing AI-driven features and leading agile development cycles that consistently exceed project KPIs."
  },
  "experience": [
    {
      "company": "Freelancer",
      "title": "Full Stack Developer",
      "period": "2023-present",
      "description": "Working on personal real-world projects, applying expertise in MERN stack, Django, and cloud technologies to deliver scalable and secure solutions."
    },
    {
      "company": "ALX and Evangadi Bootcamp",
      "title": "Full Stack Developer Student",
      "period": "2023-2025",
      "description": "Collaborated with over 20 developers using Git workflow and agile methodologies. Achieved top 5% ranking among 500+ bootcamp participants. Led 3 team projects with 100% on-time delivery and client satisfaction."
    },
    {
      "company": "Nardos Tilahun General Construction and SIS Engineering PLC",
      "title": "Civil Engineer (Contractor & Structural Designer)",
      "period": "2018-2023",
      "description": "Worked as a solo contractor and structural designer, developing software solutions for challenges in construction and design."
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
          "timeline": "Q2 2025",
          "description": "Implement secure payment gateways allowing customers to make loan payments online via credit/debit cards, bank transfers, and digital wallets, eliminating the need for cash transactions.",
          "benefits": ["Increased payment convenience", "Reduced processing time", "Automated reconciliation"],
          "technologies": ["Stripe API", "PayPal", "Plaid"]
        },
        {
          "feature": "Advanced Analytics Dashboard",
          "timeline": "Q3 2025",
          "description": "Implement data visualization tools showing loan performance metrics, customer payment history trends, and predictive analytics for risk assessment.",
          "benefits": ["Data-driven decision making", "Risk mitigation", "Performance tracking"],
          "technologies": ["D3.js", "TensorFlow.js", "React Query"]
        },
        {
          "feature": "Multi-currency Support",
          "timeline": "Q3 2025",
          "description": "Expand beyond USD and Colombian Peso to support additional currencies with real-time exchange rate integration.",
          "benefits": ["Global market expansion", "Currency risk management", "International reach"],
          "technologies": ["Exchange Rate API", "Currency.js", "i18next"]
        },
        {
          "feature": "Mobile Application",
          "timeline": "Q4 2025",
          "description": "Develop a native mobile application to allow customers to manage loans, make payments, and receive notifications on-the-go.",
          "benefits": ["Increased user engagement", "24/7 account access", "Push notifications"],
          "technologies": ["React Native", "Expo", "Firebase"]
        },
        {
          "feature": "Automated Payment Reminders",
          "timeline": "Q2 2025",
          "description": "Implement an automated system to send customizable payment reminders at scheduled intervals before due dates.",
          "benefits": ["Reduced delinquency rates", "Improved communication", "Lower overhead"],
          "technologies": ["Twilio API", "SendGrid", "Node-cron"]
        },
        {
          "feature": "Document Management System",
          "timeline": "Q1 2026",
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
    }
  ],
  "contact": {
    "email": "contactnardos@gmail.com",
    "phone": "+251 949 494319",
    "linkedin": "https://linkedin.com/in/nardos-tilahun-74260213a",
    "github": "https://github.com/Nardos-Tilahun",
    "twitter": "@Nardos_Tilahun",
    "resume": "https://drive.google.com/file/d/1in0RVRK0Q6G5-nOMhFY1_8xIdzWCl9qi/view?usp=sharing"
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