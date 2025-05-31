import React from 'react';
import { Improvement, getImprovementsByProjectId } from '@/data/futureImprovements'; // Import the interface and function

interface FutureImprovementsProps {
  id: string;
}

const FutureImprovements: React.FC<FutureImprovementsProps> = ({ id }) => {
  // Retrieve improvements based on the projectId using the imported function
  const improvements: Improvement[] = getImprovementsByProjectId(id);

  // If no improvements are found for the given ID, you might want to render a fallback or empty state.
  if (improvements.length === 0) {
    return (
      <section id={id} className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
            Future Improvements
          </h2>
          <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
            No specific future improvements are currently defined for this project.
          </p>
        </div>
      </section>
    );
  }

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