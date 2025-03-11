'use client';
// components/projects/CodeSnippetsClientWrapper.tsx
import React from 'react';
import dynamic from 'next/dynamic';

interface CodeSnippetsClientWrapperProps {
  id: string;
}

// Now we can safely use dynamic with ssr: false in a client component
const CodeSnippetsClient = dynamic(
  () => import('./CodeSnippetsClient'),
  { ssr: false }
);

const CodeSnippetsClientWrapper: React.FC<CodeSnippetsClientWrapperProps> = ({ id }) => {
  return <CodeSnippetsClient id={id} />;
};

export default CodeSnippetsClientWrapper;