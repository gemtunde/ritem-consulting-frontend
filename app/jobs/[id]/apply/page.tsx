import JobApplicationClient from '@/components/JobApplicationClient';
//import { jobs } from '../page';
//import JobApplicationClient from './JobApplicationClient';
import { Button } from '@/components/ui/button';
import { jobs } from '@/constants/data';
import Link from 'next/link';



// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

// Server component for job application
export default function JobApplicationPage({ params }: { params: { id: string } }) {
  const job = jobs.find(j => j.id === params.id);
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <JobApplicationClient job={job} />;
}