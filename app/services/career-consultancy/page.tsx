'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCareerConsultancy } from '@/hooks/useContent';
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

interface Service {
  title: string;
  description: string;
  icon: string | null;
}

interface CareerConsultancyData {
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
  services: Service[];
  benefits: string[];
}

export default function CareerConsultancy() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: careerData, isLoading, error } = useCareerConsultancy();
  
 // console.log("careerData", careerData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to get safe image URL
  const getSafeImageUrl = (image: SanityImage): string => {
    if (image?.asset?._ref) {
      return urlFor(image).url();
    }
    return "/images/about_us.webp"; // Fallback image
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
          <p className="text-red-600">Error loading career consultancy content</p>
        </div>
      </div>
    );
  }

  const data: CareerConsultancyData | null = careerData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.pageTitle || 'Career'}<span className="text-orange-500"> {data?.pageSubtitle || 'Consultancy'}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data?.pageDescription || 'From Ambition to Achievement. Professional Support. Strategic Planning. Career Growth'}
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
                {data?.contentTitle || 'Unsure about your next steps?'}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  {data?.contentDescription || 'RITEM is here to help you navigate your professional journey with confidence and clarity.'}
                </p>
                <p>
                  Our career consultancy services are designed to empower individuals like you to identify your strengths, passions, and career goals.
                </p>
                <p>
                  Through personalized guidance and assessment, we help you gain valuable insights into your unique skill set and potential career paths. Whether you're a recent graduate exploring your options or a seasoned professional looking to make a career pivot, our experienced consultants are here to provide you with the support and resources you need to make informed decisions about your future.
                </p>
              </div>

              {/* Services Section */}
              {data?.services && data.services.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h3>
                  <div className="grid gap-4">
                    {data.services.map((service: Service, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {data?.benefits && data.benefits.filter((benefit: string) => benefit.trim() !== '').length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                  <ul className="grid gap-2">
                    {data.benefits
                      .filter((benefit: string) => benefit.trim() !== '')
                      .map((benefit: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                          {benefit}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )}
            </div>
            
            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <Image
                src={data?.image ? getSafeImageUrl(data.image) : "/images/about_us.webp"}
                alt="Career consultancy"
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