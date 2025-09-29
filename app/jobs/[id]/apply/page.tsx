'use client';


import JobApplicationClient from '@/components/JobApplicationClient';
//import { jobs } from '../page';
//import JobApplicationClient from './JobApplicationClient';
import { Button } from '@/components/ui/button';
import { useJob } from '@/hooks/useContent';
//import { jobs } from '@/constants/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import React from 'react';

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

// This function is required for static export with dynamic routes
// export async function generateStaticParams() {
//   return jobs.map((job) => ({
//     id: job.id,
//   }));
// }

// Server component for job application
export default function JobApplicationPage({ params }: JobDetailsPageProps) {
  //const job = jobs.find(j => j.id === params.id);
  const [mounted, setMounted] = useState(false);
  
  // Use React.use() to unwrap the params promise
  const unwrappedParams = React.use(params);
  const jobId = unwrappedParams.id;
  
  // Wait for component to mount on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: jobData, isLoading, error } = useJob(jobId);

  console.log("Job data for application page:", jobData);
  
 if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading Job Details...</h1>
          <p className="text-gray-600 mb-6">Please wait while we fetch the job information.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Job</h1>
          <p className="text-gray-600 mb-6">There was an error loading the job details.</p>
          <Button asChild>
            <Link href="/jobs">Back to Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!jobData) {
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

  return <JobApplicationClient job={jobData} />;
}