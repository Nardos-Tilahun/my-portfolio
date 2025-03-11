// components/projects/DevelopmentProcess.tsx
import React from 'react'

interface DevelopmentProcessProps {
  id: string
}

const DevelopmentProcess: React.FC<DevelopmentProcessProps> = ({ id }) => {
  // Example process steps, replace with your actual data
  const steps = [
    { phase: 'Planning', description: 'Defined project scope, requirements, and architecture.' },
    { phase: 'Design', description: 'Created wireframes, user flows, and design mockups.' },
    { phase: 'Development', description: 'Implemented the frontend and backend components.' },
    { phase: 'Testing', description: 'Conducted unit tests, integration tests, and user testing.' },
    { phase: 'Deployment', description: 'Set up CI/CD pipeline and deployed to production.' },
  ]
  
  return (
    <section id="development-process" className="py-10">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Development Process</h2>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <p className="text-gray-300 mb-6">
          The workflow and methodologies followed during the project development lifecycle.
        </p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 h-full w-px bg-green-500 transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`flex flex-col md:flex-row items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-green-400 rounded-full transform -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 pl-8 md:pl-0 md:px-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-300 mb-2">{step.phase}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DevelopmentProcess