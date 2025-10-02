'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Clock, Briefcase, Filter, ChevronRight, Building } from 'lucide-react';
import Link from 'next/link';
import { useJobs } from '@/hooks/useContent';

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
  requirements: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  isUrgent: boolean;
  companyDescription: string;
  teamSize: string;
  reportingTo: string;
  responsibilities: string[];
}

interface FilterState {
  searchTerm: string;
  selectedSector: string;
  selectedCountry: string;
  selectedContractType: string;
  selectedJobType: string;
}

interface JobsPageProps {}

export default function Jobs() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedSector: 'all',
    selectedCountry: 'all',
    selectedContractType: 'all',
    selectedJobType: 'all'
  });

  const { data: jobsData, isLoading, error } = useJobs();

  console.log("jobs data", jobsData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Extract unique values for filters from jobs data
  const filterOptions = useMemo(() => {
    if (!jobsData) {
      return {
        sectors: [],
        countries: [],
        contractTypes: [],
        jobTypes: []
      };
    }

    const sectors = Array.from(new Set(jobsData.map((job: Job) => job.sector))).filter(Boolean);
    const countries = Array.from(new Set(jobsData.map((job: Job) => job.country))).filter(Boolean);
    const contractTypes = Array.from(new Set(jobsData.map((job: Job) => job.contractType))).filter(Boolean);
    const jobTypes = Array.from(new Set(jobsData.map((job: Job) => job.jobType))).filter(Boolean);

    return {
      sectors: sectors as string[],
      countries: countries as string[],
      contractTypes: contractTypes as string[],
      jobTypes: jobTypes as string[]
    };
  }, [jobsData]);

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    if (!jobsData) return [];

    return jobsData.filter((job: Job) => {
      const matchesSearch = filters.searchTerm === '' || 
        job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesSector = filters.selectedSector === 'all' || job.sector === filters.selectedSector;
      const matchesCountry = filters.selectedCountry === 'all' || job.country === filters.selectedCountry;
      const matchesContractType = filters.selectedContractType === 'all' || job.contractType === filters.selectedContractType;
      const matchesJobType = filters.selectedJobType === 'all' || job.jobType === filters.selectedJobType;

      return matchesSearch && matchesSector && matchesCountry && matchesContractType && matchesJobType;
    });
  }, [jobsData, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      selectedSector: 'all',
      selectedCountry: 'all',
      selectedContractType: 'all',
      selectedJobType: 'all'
    });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </section>
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 animate-pulse">
              <div className="h-12 bg-gray-300 rounded max-w-2xl mx-auto"></div>
              <div className="grid md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="h-20 bg-gray-300 rounded mb-4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading job listings</p>
        </div>
      </div>
    );
  }

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
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <Select value={filters.selectedSector} onValueChange={(value) => updateFilter('selectedSector', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {filterOptions.sectors.map((sector: string) => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.selectedCountry} onValueChange={(value) => updateFilter('selectedCountry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {filterOptions.countries.map((country: string) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.selectedContractType} onValueChange={(value) => updateFilter('selectedContractType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contract Types</SelectItem>
                  {filterOptions.contractTypes.map((type: string) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.selectedJobType} onValueChange={(value) => updateFilter('selectedJobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {filterOptions.jobTypes.map((type: string) => (
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

      {/* Jobs Listing - Grid Layout */}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job: Job, index: number) => (
                <JobCard 
                  key={job._id}
                  job={job}
                  index={index}
                  isVisible={isVisible}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Cannot Find the Right Role?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let us help you find your perfect career opportunity. Upload your CV and we will match you with suitable positions.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
             <Link href="/cv-upload">
               Upload Your CV
            </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Job Card Component
interface JobCardProps {
  job: Job;
  index: number;
  isVisible: boolean;
  formatDate: (dateString: string) => string;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, isVisible, formatDate }) => {
  return (
    <Card
      className={`group p-6 border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-10 opacity-0'
      } ${job.isUrgent ? 'border-l-4 border-red-500' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/jobs/${job._id}`} className="block h-full">
        {/* Urgent Badge */}
        {job.isUrgent && (
          <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-4">
            <Clock className="w-3 h-3 mr-1" />
            Urgent Hiring
          </div>
        )}

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

        {/* Job Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
          {job.description}
        </p>

        {/* Posted Date */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>Posted: {formatDate(job.postedDate)}</span>
        </div>

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