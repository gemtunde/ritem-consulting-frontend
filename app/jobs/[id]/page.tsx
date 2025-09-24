// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { Badge } from '@/components/ui/badge';
//import { Separator } from '@/components/ui/separator';
//import { MapPin, Clock, Briefcase, Calendar, Building, Users, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import JobDetailsClient from '@/components/JobDetailsClient';
//import JobDetailsClient from './JobDetailsClient';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  sector: string;
  contractType: string;
  jobType: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  responsibilities: string[];
  postedDate: string;
  closingDate: string;
  isUrgent?: boolean;
  companyDescription: string;
  teamSize: string;
  reportingTo: string;
}

// Static data for jobs
const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior HR Business Partner',
    company: 'TechCorp Solutions',
    location: 'London',
    country: 'England',
    sector: 'Technology',
    contractType: 'Permanent',
    jobType: 'HR Specialist',
    salary: '£65,000 - £80,000',
    description: 'We are seeking an experienced Senior HR Business Partner to join our dynamic team and drive strategic HR initiatives across our organization. This role offers the opportunity to work closely with senior leadership and make a significant impact on our company culture and employee experience.',
    requirements: [
      '5+ years of HR Business Partner experience',
      'CIPD Level 5 qualification or equivalent',
      'Strong business acumen and commercial awareness',
      'Experience in change management and organizational development',
      'Excellent communication and stakeholder management skills',
      'Knowledge of employment law and HR best practices'
    ],
    benefits: [
      'Competitive salary with annual reviews',
      'Private healthcare for you and your family',
      'Company pension scheme with 8% employer contribution',
      'Flexible working arrangements including hybrid options',
      '25 days annual leave plus bank holidays',
      'Professional development budget of £2,000 per year',
      'Employee assistance program',
      'Cycle to work scheme'
    ],
    responsibilities: [
      'Partner with business leaders to develop and implement HR strategies',
      'Provide expert advice on employee relations, performance management, and organizational development',
      'Lead talent acquisition and retention initiatives',
      'Drive culture change and employee engagement programs',
      'Manage complex employee relations cases and investigations',
      'Support leadership development and succession planning',
      'Analyze HR metrics and provide insights to drive business decisions'
    ],
    postedDate: '2024-03-15',
    closingDate: '2024-04-15',
    isUrgent: true,
    companyDescription: 'TechCorp Solutions is a leading technology company specializing in innovative software solutions for enterprise clients. With over 500 employees across multiple locations, we pride ourselves on our collaborative culture and commitment to employee development.',
    teamSize: '8-person HR team',
    reportingTo: 'Head of People & Culture'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Digital Innovations Ltd',
    location: 'Edinburgh',
    country: 'Scotland',
    sector: 'Technology',
    contractType: 'Contract',
    jobType: 'Frontend Developer',
    salary: '£450 - £550 per day',
    description: 'Join our innovative development team to build cutting-edge web applications using the latest frontend technologies. This contract position offers the opportunity to work on exciting projects with a modern tech stack.',
    requirements: [
      'Expert knowledge of React and TypeScript',
      'Experience with Next.js and modern build tools',
      'Strong understanding of responsive design principles',
      'Knowledge of state management (Redux, Zustand)',
      'Experience with testing frameworks (Jest, Cypress)',
      '3+ years of commercial frontend development experience'
    ],
    benefits: [
      'Competitive daily rate',
      'Remote working with flexible hours',
      'Access to latest development tools and technologies',
      'Professional development opportunities',
      'Collaborative and innovative work environment'
    ],
    responsibilities: [
      'Develop responsive web applications using React and TypeScript',
      'Collaborate with UX/UI designers to implement pixel-perfect designs',
      'Write clean, maintainable, and well-tested code',
      'Optimize applications for maximum speed and scalability',
      'Participate in code reviews and technical discussions',
      'Stay up-to-date with latest frontend technologies and best practices'
    ],
    postedDate: '2024-03-14',
    closingDate: '2024-04-10',
    companyDescription: 'Digital Innovations Ltd is a fast-growing digital agency that creates exceptional web and mobile experiences for clients across various industries. We work with cutting-edge technologies and maintain a culture of continuous learning.',
    teamSize: '12-person development team',
    reportingTo: 'Lead Frontend Developer'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech Systems',
    location: 'Manchester',
    country: 'England',
    sector: 'Technology',
    contractType: 'Permanent',
    jobType: 'DevOps Engineer',
    salary: '£55,000 - £70,000',
    description: 'We are looking for a skilled DevOps Engineer to join our infrastructure team and help us scale our cloud-native applications.',
    requirements: [
      'Experience with AWS/Azure cloud platforms',
      'Knowledge of containerization (Docker, Kubernetes)',
      'CI/CD pipeline experience',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Monitoring and logging tools experience'
    ],
    benefits: [
      'Competitive salary package',
      'Remote-first working culture',
      'Professional certification sponsorship',
      'Equity options',
      'Health and wellness allowance'
    ],
    responsibilities: [
      'Design and maintain CI/CD pipelines',
      'Manage cloud infrastructure and deployments',
      'Monitor system performance and reliability',
      'Implement security best practices',
      'Collaborate with development teams'
    ],
    postedDate: '2024-03-12',
    closingDate: '2024-04-12',
    companyDescription: 'CloudTech Systems provides enterprise cloud solutions to businesses worldwide.',
    teamSize: '6-person DevOps team',
    reportingTo: 'Infrastructure Manager'
  }
];

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

// Server component that passes data to client component
export default function JobDetailsPage({ params }: { params: { id: string } }) {
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

  return <JobDetailsClient job={job} />;
}