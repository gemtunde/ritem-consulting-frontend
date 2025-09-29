'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useJobs } from '@/hooks/useContent';
import { MapPin, Calendar, Building, Clock } from 'lucide-react';

// Define types
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  sector: string;
  contractType: string;
  jobType: string;
  salary: string;
  description: string;
  postedDate: string;
  closingDate: string;
  isUrgent: boolean;
  companyDescription: string;
  teamSize: string;
  reportingTo: string;
  requirements: string[];
  benefits: string[];
  responsibilities: string[];
}

interface JobSectionProps {}

interface SectorImageMap {
  [key: string]: string;
}

export default function JobSection() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: jobsData, isLoading, error } = useJobs();

  console.log("jobs data", jobsData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('jobs-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Use only the first 3 jobs for homepage display
  const displayJobs: Job[] = jobsData?.slice(0, 3) || [];

  // Function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get sector image
  const getSectorImage = (sector: string): string => {
    const sectorImages: SectorImageMap = {
      'Technology': '/images/career-1.jpg',
      'Healthcare': '/images/doctor.png',
      'Engineering': '/images/career-3.jpg',
      'Manufacturing': '/images/culture.jpeg',
      'Finance': '/images/recruiting.jpeg',
      'Education': '/images/engagement.jpg'
    };
    return sectorImages[sector] || '/images/staff-recruitment.jpg';
  };

  if (isLoading) {
    return (
      <section id="jobs-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index: number) => (
              <Card key={index} className="p-6 border-0 shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="jobs-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading job listings</p>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting career opportunities across various sectors. Join leading companies and grow your professional journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayJobs.map((job: Job, index: number) => (
            <JobCard 
              key={job._id}
              job={job}
              index={index}
              isVisible={isVisible}
              getSectorImage={getSectorImage}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* View All Jobs Link */}
        {jobsData && jobsData.length > 2 && (
          <div className={`text-center mt-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link 
              href="/jobs" 
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              View All Job Opportunities ({jobsData.length})
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Job Card Component
interface JobCardProps {
  job: Job;
  index: number;
  isVisible: boolean;
  getSectorImage: (sector: string) => string;
  formatDate: (dateString: string) => string;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, isVisible, getSectorImage, formatDate }) => {
  return (
    <Card
      className={`group p-6 border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-10 opacity-0'
      } ${job.isUrgent ? 'border-l-4 border-red-500' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/jobs/${job._id}`} className="block">
        {/* Urgent Badge */}
        {job.isUrgent && (
          <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-4">
            <Clock className="w-3 h-3 mr-1" />
            Urgent Hiring
          </div>
        )}

        {/* Sector Image */}
        <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
          <Image
            src={getSectorImage(job.sector)}
            alt={job.sector}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 400px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
          {job.title}
        </h3>

        {/* Company Info */}
        <div className="flex items-center text-gray-600 mb-3">
          <Building className="w-4 h-4 mr-2" />
          <span className="font-medium">{job.company}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{job.location}, {job.country}</span>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <span className="font-medium text-gray-900">Sector:</span>
            <span className="text-gray-600 ml-1">{job.sector}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">Type:</span>
            <span className="text-gray-600 ml-1">{job.contractType}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">Salary:</span>
            <span className="text-gray-600 ml-1">{job.salary}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium text-gray-900">Role:</span>
            <span className="text-gray-600 ml-1">{job.jobType}</span>
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Posted: {formatDate(job.postedDate)}</span>
        </div>

        {/* Job Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {job.description}
        </p>

        {/* View Details CTA */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-sm text-orange-600 font-medium group-hover:text-orange-700 transition-colors duration-300">
            View Details →
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {job.teamSize} team members
          </span>
        </div>
      </Link>
    </Card>
  );
};