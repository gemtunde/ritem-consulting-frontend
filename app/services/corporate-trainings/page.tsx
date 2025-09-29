'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCorporateTraining } from '@/hooks/useContent';
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

interface TrainingProgram {
  programName: string;
  description: string;
  duration: string;
  audience: string;
}

interface CorporateTrainingData {
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
  trainingPrograms: TrainingProgram[];
  methodologies: string[];
  certification: boolean;
}

export default function CorporateTraining() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: corporateData, isLoading, error } = useCorporateTraining();
  
  console.log("corporateData", corporateData);

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
          <p className="text-red-600">Error loading corporate training content</p>
        </div>
      </div>
    );
  }

  const data: CorporateTrainingData | null = corporateData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.pageTitle || 'Corporate'}<span className="text-orange-500"> {data?.pageSubtitle || 'Training'}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data?.pageDescription || 'Corporate Training That Delivers Customised Programs. Expert Instructors. Real Impact.'}
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
                {data?.contentTitle || 'RITEM has a solution for you.'}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  {data?.contentDescription || 'In today\'s evolving business landscape, staying ahead of the curve is essential for success.'}
                </p>
                <p>
                  With RITEM corporate training programs, you can equip your workforce with the skills and knowledge they need to thrive in the ever-changing corporate world. Our expert instructors bring real-world experience and industry insights to every session, ensuring your team gains practical knowledge that can be immediately applied.
                </p>
                <p>
                  We believe that investing in your employees development is investing in your company future. Our tailored approach ensures that each training program addresses your specific business challenges and objectives.
                </p>
              </div>

              {/* Certification Badge */}
              {data?.certification && (
                <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certification Provided Upon Completion
                </div>
              )}

              {/* Training Programs */}
              {data?.trainingPrograms && data.trainingPrograms.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Training Programs</h3>
                  <div className="space-y-4">
                    {data.trainingPrograms.map((program: TrainingProgram, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">{program.programName}</h4>
                          {program.duration && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                              {program.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{program.description}</p>
                        {program.audience && (
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Target Audience:</span> {program.audience}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Training Methodologies */}
              {data?.methodologies && data.methodologies.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Training Methodologies</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.methodologies.map((methodology: string, index: number) => (
                      <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        {methodology}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <Image
                src={data?.image ? getSafeImageUrl(data.image) : "/images/about_us.webp"}
                alt="Corporate training"
                className="rounded-2xl shadow-2xl"
                width={600}
                height={400}
              />
              
              {/* Additional Info Box */}
              {/* <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">Why Choose Our Corporate Training?</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Customized programs tailored to your industry
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Experienced industry professionals as instructors
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Practical, hands-on learning approach
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Flexible delivery methods to suit your needs
                  </li>
                  {data?.certification && (
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      Industry-recognized certification
                    </li>
                  )}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}