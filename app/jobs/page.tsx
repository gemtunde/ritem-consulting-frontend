'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Briefcase, Filter, ChevronRight } from 'lucide-react';
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
  postedDate: string;
  closingDate: string;
  isUrgent?: boolean;
}

export default function Jobs() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedContractType, setSelectedContractType] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      description: 'Lead strategic HR initiatives and partner with business leaders to drive organizational success.',
      requirements: ['5+ years HR experience', 'CIPD qualification', 'Business partnering experience'],
      benefits: ['Private healthcare', 'Pension scheme', 'Flexible working'],
      postedDate: '2024-03-15',
      closingDate: '2024-04-15',
      isUrgent: true
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
      description: 'Build responsive web applications using React, TypeScript, and modern frontend technologies.',
      requirements: ['React expertise', 'TypeScript proficiency', '3+ years experience'],
      benefits: ['Remote working', 'Professional development', 'Modern tech stack'],
      postedDate: '2024-03-14',
      closingDate: '2024-04-10'
    },
    {
      id: '3',
      title: 'Registered Nurse - ICU',
      company: 'Cardiff University Hospital',
      location: 'Cardiff',
      country: 'Wales',
      sector: 'Healthcare',
      contractType: 'Permanent',
      jobType: 'Nurse',
      salary: '£28,000 - £35,000',
      description: 'Provide critical care nursing in our state-of-the-art intensive care unit.',
      requirements: ['NMC registration', 'ICU experience preferred', 'BLS certification'],
      benefits: ['NHS pension', 'Professional development', 'Flexible shifts'],
      postedDate: '2024-03-13',
      closingDate: '2024-04-05',
      isUrgent: true
    },
    {
      id: '4',
      title: 'Backend Developer',
      company: 'FinTech Innovations',
      location: 'Belfast',
      country: 'Northern Ireland',
      sector: 'Financial Services',
      contractType: 'Permanent',
      jobType: 'Backend Developer',
      salary: '£55,000 - £70,000',
      description: 'Develop scalable backend systems for our financial technology platform.',
      requirements: ['Node.js/Python expertise', 'Database design', 'API development'],
      benefits: ['Stock options', 'Learning budget', 'Hybrid working'],
      postedDate: '2024-03-12',
      closingDate: '2024-04-12'
    },
    {
      id: '5',
      title: 'Consultant Physician',
      company: 'Royal Hospital Trust',
      location: 'Manchester',
      country: 'England',
      sector: 'Healthcare',
      contractType: 'Permanent',
      jobType: 'Doctor',
      salary: '£88,000 - £120,000',
      description: 'Lead clinical services and provide expert medical care in internal medicine.',
      requirements: ['GMC registration', 'CCT in Internal Medicine', 'Leadership experience'],
      benefits: ['Private practice rights', 'Research opportunities', 'Excellent pension'],
      postedDate: '2024-03-11',
      closingDate: '2024-04-20'
    },
    {
      id: '6',
      title: 'Marketing Manager',
      company: 'Creative Agency Plus',
      location: 'Dublin',
      country: 'Ireland',
      sector: 'Marketing',
      contractType: 'Permanent',
      jobType: 'Marketing Specialist',
      salary: '€50,000 - €65,000',
      description: 'Drive marketing strategy and campaigns for our diverse client portfolio.',
      requirements: ['Digital marketing expertise', '5+ years experience', 'Team leadership'],
      benefits: ['Performance bonus', 'Creative environment', 'Career progression'],
      postedDate: '2024-03-10',
      closingDate: '2024-04-08'
    }
  ];

  const sectors = ['Technology', 'Healthcare', 'Financial Services', 'Marketing', 'Education', 'Manufacturing'];
  const countries = ['England', 'Scotland', 'Wales', 'Northern Ireland', 'Ireland'];
  const contractTypes = ['Permanent', 'Contract', 'Temporary', 'Part-time'];
  const jobTypes = ['Frontend Developer', 'Backend Developer', 'HR Specialist', 'Doctor', 'Nurse', 'Marketing Specialist', 'Data Analyst', 'Project Manager'];

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSector !== 'all') {
      filtered = filtered.filter(job => job.sector === selectedSector);
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(job => job.country === selectedCountry);
    }

    if (selectedContractType !== 'all') {
      filtered = filtered.filter(job => job.contractType === selectedContractType);
    }

    if (selectedJobType !== 'all') {
      filtered = filtered.filter(job => job.jobType === selectedJobType);
    }

    setFilteredJobs(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchTerm, selectedSector, selectedCountry, selectedContractType, selectedJobType]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSector('all');
    setSelectedCountry('all');
    setSelectedContractType('all');
    setSelectedJobType('all');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Dream <span className="text-orange-500">Career</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exciting opportunities across the UK and Ireland. Join leading organizations 
              that value talent, growth, and work-life balance.
            </p>
            <div className="mt-8 text-center">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-4 py-2">
                {filteredJobs.length} Jobs Available
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedContractType} onValueChange={setSelectedContractType}>
                <SelectTrigger>
                  <SelectValue placeholder="Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contract Types</SelectItem>
                  {contractTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {jobTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-center">
              <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Clear All Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Briefcase className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <Card
                  key={job.id}
                  className={`p-6 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                            {job.isUrgent && (
                              <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                            )}
                          </div>
                          <p className="text-lg text-gray-700 font-medium">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-500">{job.salary}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
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
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{job.sector}</Badge>
                        <Badge variant="outline">{job.contractType}</Badge>
                        <Badge variant="outline">{job.jobType}</Badge>
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Closes: {new Date(job.closingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-3">
                      <Button asChild className="bg-orange-500 hover:bg-orange-600">
                        <Link href={`/jobs/${job.id}`}>
                          View Details
                          <ChevronRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={`/jobs/${job.id}/apply`}>
                          Quick Apply
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Cannot Find the Right Role?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let us help you find your perfect career opportunity. Upload your CV and we will match you with suitable positions.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
              Upload Your CV
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}