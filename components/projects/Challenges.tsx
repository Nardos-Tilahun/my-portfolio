// components/projects/Challenges.tsx - Server Component
import React from 'react';
import ChallengeCards from './ChallengeCards';

interface ChallengesProps {
  id: string;
}

// Function to fetch challenges for a specific project
async function getChallenges(projectId: string) {
  // This would be replaced with your actual data fetching logic
  const allChallenges = {
    'personal-loan-management': [
      {
        title: 'Frontend Design Collaboration',
        description: 'I faced difficulties designing an intuitive and engaging main page that would represent the platform effectively. The UI needed to be professional while remaining user-friendly for various stakeholders.',
        solution: 'I recognized when to seek expertise and collaborated with a designer friend. This partnership allowed me to focus on functionality while ensuring a polished user experience. Through this collaboration, I learned valuable design principles that I have since incorporated into my development process.',
        icon: 'palette'
      },
      {
        title: 'Cash-Based Payment Algorithm',
        description: 'Since this was a cash-based system, payments needed to end in round figures (e.g., $10,000 instead of $10,541.50). I needed to create a system that would divide payments appropriately across terms while ensuring the total amount was covered without overloading customers.',
        solution: 'I developed a custom payment distribution algorithm that intelligently divides the total loan amount into manageable, rounded installments. The algorithm accounts for different term lengths and ensures the final payment adjusts accordingly, making cash transactions practical while maintaining accounting accuracy.',
        icon: 'calculator'
      },
      {
        title: 'Time Constraints & First Real-World Project',
        description: 'As my first full-scale real-world project, I faced significant time pressure to deliver a functioning product while learning new concepts and technologies simultaneously.',
        solution: 'I implemented an agile approach, breaking the project into manageable sprints with clear priorities. This allowed me to deliver core functionality first, then iterate with improvements. I also established a consistent development schedule and leveraged reusable components to accelerate development without sacrificing quality.',
        icon: 'clock'
      },
      {
        title: 'Evolving Requirements',
        description: 'Throughout the development process, customer requirements frequently changed, requiring flexibility and adaptability in the system architecture.',
        solution: 'I built the application with modularity in mind, using a component-based architecture that allowed for easier modifications. I also implemented regular stakeholder check-ins and created a structured change request process to manage evolving requirements systematically, preventing scope creep while accommodating necessary changes.',
        icon: 'refresh-cw'
      }
    ],
    // Add more projects as needed
  };
  
  return allChallenges[projectId as keyof typeof allChallenges] || [];
}

const Challenges: React.FC<ChallengesProps> = async ({ id }) => {
  // Fetch challenges specific to the project
  const challenges = await getChallenges(id);
  
  // If no challenges are found, show a message
  if (challenges.length === 0) {
    return (
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-center">
            Challenges & Solutions
          </h2>
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300 text-lg">No challenges found for this project.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div>
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-center">
            Challenges & Solutions
          </h2>
         
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700">
            <p className="text-gray-300 mb-8 text-lg">
              Building this full-stack loan management system involved several complex challenges that required innovative solutions and professional growth.
            </p>
           
            {/* Pass challenges data to client component */}
            <ChallengeCards challenges={challenges} />
            
            <div className="mt-12 bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Project Outcomes</h3>
              <p className="text-gray-300 mb-6">
                Despite these challenges, I successfully delivered a full-stack MERN application with MySQL that provides a comprehensive loan management platform. The system now efficiently handles all aspects of the lending process while maintaining high standards of security and user experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  <div className="text-pink-400 text-3xl font-bold mb-2">100%</div>
                  <div className="text-gray-400">Core requirements met</div>
                </div>
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  <div className="text-purple-400 text-3xl font-bold mb-2">4</div>
                  <div className="text-gray-400">Major challenges overcome</div>
                </div>
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  <div className="text-indigo-400 text-3xl font-bold mb-2">1</div>
                  <div className="text-gray-400">Custom algorithm developed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
    </section>
  );
};

export default Challenges;