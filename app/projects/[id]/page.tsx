import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Challenges from '@/components/projects/Challenges';
import FutureImprovements from '@/components/projects/FutureImprovements';
import ProjectOverview from '@/components/projects/ProjectOverview';
import ProjectArchitecture from '@/components/projects/Architecture';
import CodeSnippetsWrapper from '@/components/projects/CodeSnippetsWrapper';

// You would normally fetch this from an API or data source
async function getProject(id: string) {
  const projects = [
    { 
      id: 'personal-loan-management', 
      title: 'personal-loan-management',
      cloudinaryImageIds: [
        'dashboard1234', 'addUser123', 
        'editLoan123', 'addPayment123',
        'customerDetailAdmin123', 'customerDashboard123', 'loanDetailCustomer123',
        'paymentDetailCustomer123', 'signIn123', 'serverErrorPage500'
      ]
    },
    // Add more projects here
  ];

  return projects.find(p => p.id === id) || null;
}

// We need to await params and resolve them before using
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params object to resolve the id
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<div className="py-20 text-center">Loading overview...</div>}>
        <ProjectOverview id={project.id} cloudinaryImageIds={project.cloudinaryImageIds} />
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
