// data/screenshots.ts


export interface Screenshot { // <-- Make sure 'export' is here
  cloudinaryId: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
}

interface ProjectScreenshots {
  [projectId: string]: Screenshot[];
}

const allScreenshots: ProjectScreenshots = {
  'personal-loan-management': [
      // Admin Role Pages
      {
        cloudinaryId:  "dashboard1234",
        title: "Admin Dashboard",
        description: "Key performance metrics and visual analytics",
        detailedDescription: "A central overview displaying key performance metrics such as total customers (registered and active), total lending amounts, and visual data through a vertical bar graph and pie chart. It also provides quick-access buttons for adding loans or payments and a transactions table with search, sorting, and pagination options.",
        category: "Admin"
      },
      {
        cloudinaryId: "addUser123",
        title: "Add User Page",
        description: "Register new customers and admin users",
        detailedDescription: "A modal form to register new users. It includes fields for name, email, role, password, and contact details. The page enforces input validation, displays error messages for incorrect entries, and handles confirmation—via email for customers or explicit confirmation for admin roles.",
        category: "Admin"
      },
      {
        cloudinaryId:  "editLoan123",
        title: "Edit Loan Page",
        description: "Modify pending loan details",
        detailedDescription: "A modal dialog that allows editing of a pending loan (editable only if there are no registered payments). It presents pre-populated loan details for review, enables modifications with live validation, and confirms successful updates upon saving.",
        category: "Admin"
      },
      {
        cloudinaryId: "addPayment123",
        title: "Add Payment Page",
        description: "Register new payments against existing loans",
        detailedDescription: "A form for registering a new payment against an existing loan. It begins with a searchable interface to select a loan, then displays associated customer and loan details. Once selected, the form reveals payment fields with mandatory validations and error handling.",
        category: "Admin"
      },
      {
        cloudinaryId:"customerDetailAdmin123",
        title: "Customer Detail (Admin View)",
        description: "Detailed customer profile with loan history",
        detailedDescription: "A detailed view of a specific customer accessed from the Customers Page. It includes sections for Customer Information (name, email with verification status, phone, address), Payment Information (upcoming and total remaining payment details if a loan exists), and Loan Information (a table listing all loans with options to add or view details).",
        category: "Admin"
      },
      
      // Customer Role Pages
      {
        cloudinaryId:"customerDetailAdmin123",
        title: "Customer Dashboard",
        description: "Customer's personal profile and loan summary",
        detailedDescription: "The landing page for a customer after logging in. It displays personal details such as name, email (with verification status and notification options), phone, and address. Additional sections show Payment Information (upcoming payment details and remaining amounts) and Loan Information (listing all the customer's loans).",
        category: "Customer"
      },
      {
        cloudinaryId: "loanDetailCustomer123",
        title: "Loan Detail (Customer View)",
        description: "Customer view of loan details and payment schedule",
        detailedDescription: "A detailed view of a specific loan from the customer's perspective. It provides comprehensive loan details including the principal, issue date, duration, terms, status, total interest, and a breakdown of paid vs. remaining amounts. It also lists payment history and upcoming payment details for that loan.",
        category: "Customer"
      },
      {
        cloudinaryId:  "paymentDetailCustomer123",
        title: "Payment Detail (Customer View)",
        description: "Details of individual payments made by customer",
        detailedDescription: "A detailed view of a specific payment made by the customer. It includes the payment term, amount, date, and status, along with a breakdown of principal versus interest and any penalties. This page also shows associated loan details for full context.",
        category: "Customer"
      },
      
      // Mutual Pages
      {
        cloudinaryId: "signIn123",
        title: "Sign In Page",
        description: "Secure login for financial services",
        detailedDescription: "A professional sign-in page for financial services, featuring a company logo, email and password input fields, a 'Forgot Password?' option, and a green-themed sign-in button.",
        category: "Mutual",
      },
      {
        cloudinaryId:  "serverErrorPage500",
        title: "500 Server Error Page",
        description: "User-friendly server error notification",
        detailedDescription: "This page appears when the system encounters an internal server error. It informs the user that a server-side problem has occurred and typically provides a message suggesting to try again later or contact support. Navigation options (like a link to return home) are usually available.",
        category: "Mutual"
      }
    
  ],
  'shipment-tracking-system': [
    {
      cloudinaryId: "shipment_dashboard_main", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Dashboard Overview",
      description: "Central dashboard with key statistics, monthly trends, and distribution charts for shipments.",
      detailedDescription: "The main dashboard provides a comprehensive overview of logistics operations. It displays total shipments, pending payments, completed, and in-transit shipment counts. Interactive charts visualize monthly shipment trends, status distribution (e.g., Draft, In-Transit, Released), shipment type (Import vs. Export), and breakdown by office code, container size, payment status, and tax refund status. Recent shipments are listed in a table with quick links to details.",
      category: "Dashboard"
    },
    {
      cloudinaryId: "shipment_list_table", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Shipment List (Table View)",
      description: "Manage all shipments in a paginated, sortable, and filterable table.",
      detailedDescription: "The Shipments page presents all recorded shipments in a responsive data table. Users can search by company name, registration number, or contact person. Filters are available for status, type, and office code. The table supports sorting by various columns (ID, Registration, Company, Date, etc.) and pagination. Each row provides quick action buttons for viewing details, editing, or deleting a shipment.",
      category: "Shipments"
    },
    {
      cloudinaryId: "shipment_list_grid", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Shipment List (Grid View)",
      description: "Alternative card-based view for quick overview of shipments.",
      detailedDescription: "In addition to the table, the Shipments page offers a grid view, displaying each shipment as a card. This view provides a concise overview of key information like registration number, company name, type, status, office, and payment status at a glance. Action buttons for details, edit, and delete are available on each card, making it suitable for quick browsing.",
      category: "Shipments"
    },
    {
      cloudinaryId: "shipment_details", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Shipment Details Page",
      description: "Detailed view of a specific shipment with all relevant information and actions.",
      detailedDescription: "This page provides an exhaustive breakdown of a single shipment. It includes general shipment information (type, date, office, container), company and contact details, processing information (followed by, assessor, agent), and a full timeline of events (transit received, loading, departure, arrival). Status badges for shipment, payment, and tax refund are prominently displayed. Edit and delete actions are available for authorized users.",
      category: "Shipments"
    },
    {
      cloudinaryId: "shipment_form_basic", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Shipment Form (Basic Tab)",
      description: "Multi-tabbed form for creating/editing shipments, starting with basic information.",
      detailedDescription: "The shipment form is structured into three tabs: 'Basic Information', 'Details & Contacts', and 'Timeline & Notes'. The 'Basic Information' tab collects essential data such as shipment status, type, date, office code, registration number, container size, payment status, and tax refund status. It includes real-time validation and a 'Next' button to proceed.",
      category: "Forms"
    },
    {
      cloudinaryId: "shipment_form_details", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Shipment Form (Details Tab)",
      description: "Second tab of the shipment form for company and contact details.",
      detailedDescription: "The 'Details & Contacts' tab of the shipment form is where users input information about the company associated with the shipment, the primary contact person, their phone number, and internal processing details like 'Followed By', 'Assessor Name', and 'Djibouti Agent'. This tab also features client-side validation to ensure all required fields are completed before moving forward.",
      category: "Forms"
    },
    {
      cloudinaryId: "user_login", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "User Login Page",
      description: "Secure login interface for accessing the Shipment Tracking System.",
      detailedDescription: "The login page provides a secure entry point for users. It features fields for email and password, with an option to toggle password visibility. Error messages are displayed for incorrect credentials or failed login attempts. It uses JWT authentication to establish user sessions and supports redirection after successful login.",
      category: "Auth"
    },
    {
      cloudinaryId: "admin_users_list", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Admin User List",
      description: "Administrator view for managing all system users.",
      detailedDescription: "Accessible only to administrators, this page lists all registered users in a table. It provides actions to add new users, edit existing user details, or delete users. The list displays user ID, email, name, role, and creation/update timestamps. This interface is crucial for maintaining user accounts and managing access control within the system.",
      category: "Admin"
    },
    {
      cloudinaryId: "admin_user_new", // <<-- IMPORTANT: Replace with your Cloudinary ID
      title: "Admin Add/Edit User Form",
      description: "Form for administrators to create new users or modify existing user details.",
      detailedDescription: "This form allows administrators to manage user accounts. For new users, it includes fields for email, name, password, and role. For editing, it pre-populates existing data, allowing updates to email, name, password (optional), and role. It incorporates client-side validation and securely handles password hashing and role assignments.",
      category: "Admin"
    },
  ],
};

export const getScreenshotsByProjectId = (projectId: string): Screenshot[] => {
  return allScreenshots[projectId] || [];
};