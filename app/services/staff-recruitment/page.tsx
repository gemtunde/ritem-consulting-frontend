'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStaffRecruitment } from '@/hooks/useContent';
import { urlFor } from '@/lib/sanity';
//import { urlFor } from '@/sanity/lib/client';

// Define types
interface SanityAssetReference {
  _ref: string;
  _type: 'reference';
}

interface SanityImage {
  _type: 'image';
  asset: SanityAssetReference;
}

interface RecruitmentProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
}

interface StaffRecruitmentData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  pageTitle: string;
  pageSubtitle: string;
  pageDescription: string;
  contentTitle: string;
  contentDescription: string;
  image: SanityImage;
  recruitmentProcess: RecruitmentProcessStep[];
  industries: string[];
  guaranteePeriod: string;
  successRate: number;
}

export default function StaffRecruitment() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: staffData, isLoading, error } = useStaffRecruitment();
  
  console.log("staffData", staffData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to get safe image URL
  const getSafeImageUrl = (image: SanityImage): string => {
    if (image?.asset?._ref) {
      return urlFor(image).url();
    }
    return "/images/about_us.webp";
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="animate-pulse">
                <div className="w-full h-64 bg-gray-300 rounded-2xl"></div>
              </div>
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
          <p className="text-red-600">Error loading staff recruitment content</p>
        </div>
      </div>
    );
  }

  const data: StaffRecruitmentData | null = staffData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.pageTitle || 'Staff'}<span className="text-orange-500"> {data?.pageSubtitle || 'Recruitment'}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data?.pageDescription || 'Streamlined Hiring. Tailored for Your Needs. Built to Find the Best'}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {data?.contentTitle || 'Need Top Talent Fast?'}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  {data?.contentDescription || 'At RITEM, we understand that finding the right talent for your business is crucial for success.'}
                </p>
                <p>
                  Our approach goes beyond just matching resumes with job descriptions. We aim to understand your company is values, goals, and team dynamics to ensure a perfect fit. With our extensive network and rigorous screening process, we connect you with candidates who possess not only the necessary skills but also the passion and drive to excel in their roles.
                </p>
                <p>
                  Whether you are seeking entry-level talent or seasoned professionals, RITEM is committed to providing you with personalised recruitment solutions that meet your specific needs.
                </p>
              </div>

              {/* Success Metrics */}
              {(data?.successRate || data?.guaranteePeriod) && (
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {data.successRate && (
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-orange-600">{data.successRate}%</div>
                      <div className="text-gray-600">Success Rate</div>
                    </div>
                  )}
                  {data.guaranteePeriod && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{data.guaranteePeriod}</div>
                      <div className="text-gray-600">Guarantee Period</div>
                    </div>
                  )}
                </div>
              )}

              {/* Recruitment Process */}
              {data?.recruitmentProcess && data.recruitmentProcess.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Recruitment Process</h3>
                  <div className="space-y-4">
                    {data.recruitmentProcess
                      .sort((a: RecruitmentProcessStep, b: RecruitmentProcessStep) => a.stepNumber - b.stepNumber)
                      .map((step: RecruitmentProcessStep, index: number) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                            {step.stepNumber}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                            <p className="text-gray-600 mb-2">{step.description}</p>
                            {step.duration && (
                              <span className="text-sm text-gray-500">Duration: {step.duration}</span>
                            )}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}

              {/* Industries Served */}
              {data?.industries && data.industries.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Industries We Serve</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.industries.map((industry: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <Image
                src={data?.image ? getSafeImageUrl(data.image) : "/images/about_us.webp"}
                alt="Staff recruitment process"
                className="rounded-2xl shadow-2xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}