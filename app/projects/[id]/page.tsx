import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Challenges from '@/components/projects/Challenges';
import FutureImprovements from '@/components/projects/FutureImprovements';
import ProjectOverview from '@/components/projects/ProjectOverview';
import ProjectArchitecture from '@/components/projects/Architecture';
import CodeSnippetsWrapper from '@/components/projects/CodeSnippetsWrapper';

// Import the getProjectById function from the new data module
import { getProjectById } from '@/data/projects';

// We need to await params and resolve them before using
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params object to resolve the id
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch the project data using the imported function
  const project = getProjectById(id);

  if (!project) {
    notFound(); // Display 404 if project is not found
  }

  return (
    <>
      <Suspense fallback={<div className="py-20 text-center">Loading overview...</div>}>
        {/* Pass the entire project object to ProjectOverview */}
        <ProjectOverview project={project} />
      </Suspense>

      <Suspense fallback={<div className="py-20 text-center">Loading architecture...</div>}>
        <ProjectArchitecture id={project.id} />
      </Suspense>

      <Suspense fallback={<div className="py-20 text-center">Loading challenges...</div>}>
        <Challenges id={project.id} />
      </Suspense>

      <Suspense fallback={<div className="py-20 text-center">Loading code snippets...</div>}>
        <CodeSnippetsWrapper id={project.id} />
      </Suspense>

      <Suspense fallback={<div className="py-20 text-center">Loading future improvements...</div>}>
        <FutureImprovements id={project.id} />
      </Suspense>
    </>
  );
}