// components/projects/ChallengeCards.tsx - Client Component
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Challenge {
  title: string;
  description: string;
  solution: string;
  icon?: string;
}

interface ChallengeCardsProps {
  challenges: Challenge[];
}

const ChallengeCards: React.FC<ChallengeCardsProps> = ({ challenges }) => {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {challenges.map((challenge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-md border border-gray-700 overflow-hidden relative cursor-pointer ${activeChallenge === index ? 'ring-2 ring-pink-500' : ''}`}
          onClick={() => setActiveChallenge(activeChallenge === index ? null : index)}
        >
          <div className="flex items-start mb-4">
            {challenge.icon && (
              <div className="mr-4 p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {challenge.icon === 'palette' && (
                    <path d="M12 2C6.5 2 2 6.5 2 12c0 5 4.1 9 9 9h.4c4 0 8.7-3.1 8.7-7.1 0-2.2-1.4-4.5-3.4-5.8-.2.4-.4.4-.5.9-.3.9-.7 1.7-1.2 2.5 3 1.8 2.4 5.4-1 5.4-1.7 0-3-1.3-3-3 0-2.7 3-6 3-6s-.7-2-2-2c-2.5 0-4 1.5-4 3 0 .8.3 1.6.9 2.2-.5.4-1.2.7-1.9.8-.6-1-1-2.2-1-3.5 0-3.9 3.1-7 7-7 3.9 0 7 3.1 7 7 0 3.2-2.1 5.8-5 6.7.4-1.5.4-3 0-4.4.9 0 1.7-.4 2.4-1 .4-.4.6-.8.8-1.3.7 1.4 1.4 3 1.4 4.7C19.5 17.1 16.3 21 12 21c-5 0-9-4-9-9s4-10 9-10z" />
                  )}
                  {challenge.icon === 'calculator' && (
                    <>
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                      <line x1="8" y1="6" x2="16" y2="6"></line>
                      <line x1="8" y1="10" x2="16" y2="10"></line>
                      <line x1="8" y1="14" x2="16" y2="14"></line>
                      <line x1="8" y1="18" x2="16" y2="18"></line>
                    </>
                  )}
                  {challenge.icon === 'clock' && (
                    <>
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </>
                  )}
                  {challenge.icon === 'refresh-cw' && (
                    <>
                      <polyline points="23 4 23 10 17 10"></polyline>
                      <polyline points="1 20 1 14 7 14"></polyline>
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </>
                  )}
                </svg>
              </div>
            )}
            <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl">{challenge.title}</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <h4 className="text-pink-400 text-sm font-medium mb-2 flex items-center">
                <span className="w-4 h-4 bg-pink-500 rounded-full opacity-70 mr-2"></span>
                Challenge:
              </h4>
              <p className="text-gray-300">{challenge.description}</p>
            </div>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: activeChallenge === index ? 'auto' : 0,
                opacity: activeChallenge === index ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <h4 className="text-purple-400 text-sm font-medium mb-2 flex items-center">
                <span className="w-4 h-4 bg-purple-500 rounded-full opacity-70 mr-2"></span>
                Solution:
              </h4>
              <p className="text-gray-300">{challenge.solution}</p>
            </motion.div>
            
            {activeChallenge !== index && (
              <div className="text-sm text-purple-400 font-medium mt-2 flex items-center">
                <span>Click to see solution</span>
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-bl-full opacity-20"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChallengeCards;