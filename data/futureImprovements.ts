// data/futureImprovements.ts

export interface Improvement {
  title: string;
  description: string;
  benefits: string;
  technologies: string;
  iconClass: string; // Tailwind bg-color class
}

interface ProjectImprovements {
  [projectId: string]: Improvement[];
}

const allImprovements: ProjectImprovements = {
  'personal-loan-management': [
    {
      title: 'Online Payment Integration',
      description: 'Implement secure payment gateways allowing customers to make loan payments online via credit/debit cards, bank transfers, and digital wallets, eliminating the need for cash transactions.',
      benefits: 'Increased payment convenience, reduced processing time, automated reconciliation',
      technologies: 'Stripe API, PayPal, Plaid',
      iconClass: 'bg-blue-500'
    },
    {
      title: 'Advanced Analytics Dashboard',
      description: 'Implement data visualization tools showing loan performance metrics, customer payment history trends, and predictive analytics for risk assessment.',
      benefits: 'Data-driven decision making, risk mitigation, performance tracking',
      technologies: 'D3.js, TensorFlow.js, React Query',
      iconClass: 'bg-indigo-500'
    },
    {
      title: 'Multi-currency Support',
      description: 'Expand beyond USD and Colombian Peso to support additional currencies with real-time exchange rate integration.',
      benefits: 'Global market expansion, currency risk management, international reach',
      technologies: 'Exchange Rate API, Currency.js, i18next',
      iconClass: 'bg-cyan-500'
    },
    {
      title: 'Mobile Application',
      description: 'Develop a native mobile application to allow customers to manage loans, make payments, and receive notifications on-the-go.',
      benefits: 'Increased user engagement, 24/7 account access, push notifications',
      technologies: 'React Native, Expo, Firebase',
      iconClass: 'bg-green-500'
    },
    {
      title: 'Automated Payment Reminders',
      description: 'Implement an automated system to send customizable payment reminders at scheduled intervals before due dates.',
      benefits: 'Reduced delinquency rates, improved communication, lower overhead',
      technologies: 'Twilio API, SendGrid, Node-cron',
      iconClass: 'bg-yellow-500'
    },
    {
      title: 'Document Management System',
      description: 'Add functionality for secure uploading, storing, and managing loan-related documents with OCR capabilities.',
      benefits: 'Centralized document storage, reduced paperwork, enhanced security',
      technologies: 'AWS S3, Tesseract.js, PDF.js',
      iconClass: 'bg-red-500'
    }
    ],
  'shipment-tracking-system': [
    {
      title: 'Real-time Tracking & GPS Integration',
      description: 'Integrate with third-party GPS tracking services and carrier APIs to provide real-time location updates of shipments on a map interface, accessible to both admins and potentially customers.',
      benefits: 'Enhanced visibility, proactive issue resolution, improved customer satisfaction, reduced manual tracking efforts.',
      technologies: 'Google Maps API, OpenStreetMap, WebSockets, MQTT, Carrier APIs (e.g., FedEx, DHL)',
      iconClass: 'bg-red-500' // Example color
    },
    {
      title: 'Automated Notifications & Alerts',
      description: 'Implement an automated notification system to send email/SMS alerts for key shipment milestones (e.g., departure, arrival, delays, status changes) to relevant stakeholders (customers, agents).',
      benefits: 'Timely communication, reduced customer inquiries, proactive issue alerts, improved operational efficiency.',
      technologies: 'Twilio, SendGrid, Cron jobs, Event-driven architecture (Kafka/RabbitMQ)',
      iconClass: 'bg-orange-500'
    },
    {
      title: 'Customer & Agent Portals',
      description: 'Develop dedicated, restricted-access portals for customers to view their shipment statuses and for external agents (e.g., Djibouti Agent) to update shipment milestones directly.',
      benefits: 'Self-service capabilities, reduced administrative burden, improved collaboration with partners, enhanced transparency.',
      technologies: 'NextAuth.js (for external users), dedicated React components, API access controls',
      iconClass: 'bg-yellow-500'
    },
    {
      title: 'Advanced Reporting & Export',
      description: 'Expand dashboard capabilities with custom report generation (e.g., monthly volume reports, performance metrics by office/agent) and export options (PDF, Excel).',
      benefits: 'Deeper business insights, easier compliance reporting, enhanced data analysis capabilities, improved data sharing.',
      technologies: 'React-PDF, SheetJS (for Excel), Chart.js (for new chart types), Data warehousing (if data volume grows)',
      iconClass: 'bg-green-500'
    },
    {
      title: 'Document Management',
      description: 'Add functionality to upload, store, and manage shipment-related documents (e.g., invoices, customs declarations) securely, with versioning and search capabilities.',
      benefits: 'Centralized document repository, reduced manual paperwork, improved compliance, quicker document retrieval.',
      technologies: 'AWS S3, Google Cloud Storage, OCR (Optical Character Recognition) libraries, Elasticsearch (for document search)',
      iconClass: 'bg-teal-500'
    },
    {
      title: 'Mobile Application',
      description: 'Develop a native mobile application (iOS/Android) for administrators and field agents to manage and update shipment statuses on the go, including offline capabilities.',
      benefits: 'Increased operational flexibility, faster updates from field, improved agent efficiency, better accessibility.',
      technologies: 'React Native, Expo, Firebase (for push notifications/offline data), SQLite (for local storage)',
      iconClass: 'bg-blue-500'
    },
  ],
};

export const getImprovementsByProjectId = (projectId: string): Improvement[] => {
  return allImprovements[projectId] || [];
};