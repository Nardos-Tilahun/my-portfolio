// components/projects/Challenges.tsx - Server Component
import React from 'react';
import ChallengeCards from './ChallengeCards';
import { getChallengesByProjectId } from '@/data/challenges';

interface ChallengesProps {
  id: string;
}

const Challenges: React.FC<ChallengesProps> = async ({ id }) => {
  
  const challenges = getChallengesByProjectId(id);
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
              {/* You might want to make this description dynamic based on the project or remove it if it's too specific */}
              Building this full-stack system involved several complex challenges that required innovative solutions and professional growth.
            </p>
            
            {/* Pass challenges data to client component */}
            <ChallengeCards challenges={challenges} />
            
            <div className="mt-12 bg-gray-800/30 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Project Outcomes</h3>
              <p className="text-gray-300 mb-6">
                {/* This text is also quite specific. Consider if it should be dynamic or generalized. */}
                Despite these challenges, I successfully delivered a full-stack application that provides a comprehensive platform. The system now efficiently handles all core requirements while maintaining high standards of security and user experience.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  <div className="text-pink-400 text-3xl font-bold mb-2">100%</div>
                  <div className="text-gray-400">Core requirements met</div>
                </div>
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  {/* Dynamically show the number of challenges overcome */}
                  <div className="text-purple-400 text-3xl font-bold mb-2">{challenges.length}</div>
                  <div className="text-gray-400">Major challenges overcome</div>
                </div>
                <div className="bg-gray-900/70 p-4 rounded-lg">
                  {/* This might need to be more dynamic or specific to projects */}
                  <div className="text-indigo-400 text-3xl font-bold mb-2">1+</div>
                  <div className="text-gray-400">Key solutions developed</div>
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