// components/projects/TechStack.tsx
import React from 'react'

interface TechStackProps {
  id: string
}

const TechStack: React.FC<TechStackProps> = ({ id }) => {
  // Example tech stack, replace with your actual data
  const technologies = [
    { name: 'React', category: 'Frontend', description: 'JavaScript library for building user interfaces' },
    { name: 'Next.js', category: 'Framework', description: 'React framework for production' },
    { name: 'TypeScript', category: 'Language', description: 'Typed superset of JavaScript' },
    { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },
    { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime environment' },
    { name: 'MySQL', category: 'Database', description: 'MySQL database' },
  ]
  
  return (
    <section id="tech-stack" className="py-10">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Technology Stack</h2>
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <p className="text-gray-300 mb-6">
          The technologies, frameworks, libraries, and tools used in developing this project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg">
              <h3 className="font-semibold text-green-300 mb-1">{tech.name}</h3>
              <div className="text-sm text-green-500 mb-2">{tech.category}</div>
              <p className="text-gray-400 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack