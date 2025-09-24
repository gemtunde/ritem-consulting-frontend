'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Briefcase, Calendar, Building, Users, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

interface JobDetailsClientProps {
  job: Job;
}

export default function JobDetailsClient({ job }: JobDetailsClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/jobs">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Jobs
              </Link>
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                  {job.isUrgent && (
                    <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                  )}
                </div>
                <p className="text-xl text-gray-700 font-medium mb-4">{job.company}</p>
                
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}, {job.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{job.contractType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Closes: {new Date(job.closingDate).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="text-right mb-4">
                  <p className="text-2xl font-bold text-orange-500">{job.salary}</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                    <Link href={`/jobs/${job.id}/apply`}>
                      Apply Now
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    Save Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <Card className={`p-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </Card>

              {/* Key Responsibilities */}
              <Card className={`p-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Requirements */}
              <Card className={`p-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Benefits */}
              <Card className={`p-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Summary */}
              <Card className={`p-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Job Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sector</p>
                    <Badge variant="outline">{job.sector}</Badge>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Contract Type</p>
                    <p className="font-medium">{job.contractType}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Team Size</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{job.teamSize}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reporting To</p>
                    <p className="font-medium">{job.reportingTo}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Posted Date</p>
                    <p className="font-medium">{new Date(job.postedDate).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
              </Card>

              {/* Company Info */}
              <Card className={`p-6 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-bold text-gray-900">About {job.company}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{job.companyDescription}</p>
              </Card>

              {/* Apply CTA */}
              <Card className={`p-6 bg-orange-50 border-orange-200 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Ready to Apply?</h3>
                <p className="text-gray-600 mb-4">
                  Do not miss out on this opportunity. Applications close on {new Date(job.closingDate).toLocaleDateString('en-GB')}.
                </p>
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                  <Link href={`/jobs/${job.id}/apply`}>
                    Apply Now
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}