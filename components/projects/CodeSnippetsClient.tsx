'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Copy, Check, Code2 } from 'lucide-react';
import { CodeSnippet, getCodeSnippetsByProjectId } from '@/data/codeSnippets'; // Import from the new module

interface CodeSnippetsClientProps {
  id: string;
}

const CodeSnippetsClient: React.FC<CodeSnippetsClientProps> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter snippets based on the projectId using the imported function
  const snippets = getCodeSnippetsByProjectId(id);

  // Organize snippets by category
  const categories = Array.from(new Set(snippets.map(s => s.category)));
  const categorySnippets = categories.map(category => ({
    category,
    snippets: snippets.filter(s => s.category === category)
  }));

  // Update the current snippet index when a category is clicked
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    const newIndex = snippets.findIndex(s => s.category === category);
    if (newIndex !== -1) {
      setCurrentSnippetIndex(newIndex);
    }
  };

  // Handle copy code
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  // Toggle snippet expansion
  const toggleExpand = (id: string) => {
    setExpandedSnippet(expandedSnippet === id ? null : id);
  };

  // Scroll to currently active snippet when the index changes
  useEffect(() => {
    if (snippets.length === 0) return;
    const currentSnippet = snippets[currentSnippetIndex];
    setActiveCategory(currentSnippet.category);
    
    const element = document.getElementById(`snippet-${currentSnippet.id}`);
    if (element && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  }, [currentSnippetIndex, snippets]);

  // Render fallback UI if no snippets exist
  if (snippets.length === 0) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-700 text-center py-12">
        <Code2 className="h-12 w-12 mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No Code Snippets Available</h3>
        <p className="text-gray-400">
          There are no code snippets configured for this project yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-green-500 to-cyan-500 text-white shadow-lg'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Code snippets container */}
      <div 
        ref={scrollRef}
        className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-700 max-h-[600px] overflow-y-auto scroll-smooth"
      >
        {categorySnippets.map(({ category, snippets }) => (
          <div 
            key={category}
            className={`mb-8 transition-all duration-500 ${
              activeCategory && activeCategory !== category ? 'opacity-50' : 'opacity-100'
            }`}
          >
            <h3 className="text-xl font-semibold mb-4 border-l-4 border-cyan-400 pl-3 text-white">
              {category}
            </h3>
            
            <div className="space-y-8">
              {snippets.map((snippet) => (
                <div 
                  key={snippet.id}
                  id={`snippet-${snippet.id}`}
                  className={`transform transition-all duration-500 ${
                    snippets[currentSnippetIndex]?.id === snippet.id 
                      ? 'scale-100 opacity-100 border-l-4 border-green-400 pl-4 shadow-lg' 
                      : 'scale-95 opacity-80'
                  }`}
                  // Remove auto-scroll pause/resume if not needed for manual navigation
                >
                  <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-md">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-green-400 mr-2">●</span>
                          <span className="text-gray-200 font-medium">{snippet.title}</span>
                        </div>
                        <div className="text-gray-400 text-xs mt-1">{snippet.language}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCode(snippet.id, snippet.code)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title="Copy code"
                        >
                          {copied === snippet.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <button
                          onClick={() => toggleExpand(snippet.id)}
                          className="p-1 text-gray-400 hover:text-white transition-colors"
                          title={expandedSnippet === snippet.id ? "Show less" : "Show more"}
                        >
                          {expandedSnippet === snippet.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Code */}
                    <div className="relative">
                      <pre 
                        className={`p-4 overflow-x-auto text-gray-300 text-sm transition-all duration-300 ${
                          expandedSnippet === snippet.id ? 'max-h-[500px]' : 'max-h-[150px]'
                        }`}
                      >
                        <code>{snippet.code}</code>
                      </pre>
                      
                      {/* Gradient overlay for collapsed snippets */}
                      {expandedSnippet !== snippet.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm mt-3 ml-2 border-l-2 border-green-500 pl-3">
                    {snippet.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CodeSnippetsClient;