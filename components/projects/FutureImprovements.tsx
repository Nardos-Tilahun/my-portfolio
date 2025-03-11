import React from 'react';

interface FutureImprovementsProps {
  id: string;
}

const FutureImprovements: React.FC<FutureImprovementsProps> = ({ id }) => {
  // Future improvements structured for server-side rendering
  const improvements = [
    {
      title: 'Online Payment Integration',
      description: 'Implement secure payment gateways allowing customers to make loan payments online via credit/debit cards, bank transfers, and digital wallets, eliminating the need for cash transactions.',
      timeline: 'Q2 2025',
      benefits: 'Increased payment convenience, reduced processing time, automated reconciliation',
      technologies: 'Stripe API, PayPal, Plaid',
      iconClass: 'bg-blue-500'
    },
    {
      title: 'Advanced Analytics Dashboard',
      description: 'Implement data visualization tools showing loan performance metrics, customer payment history trends, and predictive analytics for risk assessment.',
      timeline: 'Q3 2025',
      benefits: 'Data-driven decision making, risk mitigation, performance tracking',
      technologies: 'D3.js, TensorFlow.js, React Query',
      iconClass: 'bg-indigo-500'
    },
    {
      title: 'Multi-currency Support',
      description: 'Expand beyond USD and Colombian Peso to support additional currencies with real-time exchange rate integration.',
      timeline: 'Q3 2025',
      benefits: 'Global market expansion, currency risk management, international reach',
      technologies: 'Exchange Rate API, Currency.js, i18next',
      iconClass: 'bg-cyan-500'
    },
    {
      title: 'Mobile Application',
      description: 'Develop a native mobile application to allow customers to manage loans, make payments, and receive notifications on-the-go.',
      timeline: 'Q4 2025',
      benefits: 'Increased user engagement, 24/7 account access, push notifications',
      technologies: 'React Native, Expo, Firebase',
      iconClass: 'bg-green-500'
    },
    {
      title: 'Automated Payment Reminders',
      description: 'Implement an automated system to send customizable payment reminders at scheduled intervals before due dates.',
      timeline: 'Q2 2025',
      benefits: 'Reduced delinquency rates, improved communication, lower overhead',
      technologies: 'Twilio API, SendGrid, Node-cron',
      iconClass: 'bg-yellow-500'
    },
    {
      title: 'Document Management System',
      description: 'Add functionality for secure uploading, storing, and managing loan-related documents with OCR capabilities.',
      timeline: 'Q1 2026',
      benefits: 'Centralized document storage, reduced paperwork, enhanced security',
      technologies: 'AWS S3, Tesseract.js, PDF.js',
      iconClass: 'bg-red-500'
    }
  ];

  return (
    <section id={id} className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-center">
            Future Improvements
          </h2>
          <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            Strategic enhancements planned for the Personal Loan Management System,
            designed to extend functionality and improve user experience.
          </p>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {improvements.map((improvement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-2xl hover:border-gray-600 transition-all duration-300"
              >
                {/* Colorful top border */}
                <div className={`h-2 ${improvement.iconClass}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-blue-300">
                      {improvement.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 bg-gray-800/70 px-2 py-1 rounded-full">
                      {improvement.timeline}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    {improvement.description}
                  </p>
                  
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-400 mb-1">BENEFITS</h4>
                      <p className="text-indigo-300 text-sm">{improvement.benefits}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-gray-400 mb-1">TECHNOLOGIES</h4>
                      <p className="text-cyan-300 text-sm">{improvement.technologies}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureImprovements;