// components/projects/CodeSnippetsWrapper.tsx
import React from 'react';
import CodeSnippetsClientWrapper from './CodeSnippetsClientWrapper';

interface CodeSnippetsWrapperProps {
  id: string;
}

const CodeSnippetsWrapper: React.FC<CodeSnippetsWrapperProps> = ({ id }) => {
  // Here you could fetch snippet data based on id
  // For example:
  // const snippetsData = await fetchSnippetsForProject(id);
 
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400">
            Code Implementation Highlights
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Key code examples from this financial software project, showcasing authentication, calculations,
            visualizations, and data management implementations.
          </p>
        </div>
       
        {/* Pass the id to the client wrapper component */}
        <CodeSnippetsClientWrapper id={id} />
      </div>
     
      {/* Background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
    </section>
  );
};

export default CodeSnippetsWrapper;