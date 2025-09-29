'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Target, Award } from 'lucide-react';
import Image from 'next/image';
import { useAboutUs } from '@/hooks/useContent';
//import { urlFor } from '@/sanity/lib/client'; // Import Sanity URL builder
import { urlFor } from '@/lib/sanity';

export default function About() {
  const { data: aboutUs, isLoading, error, isError } = useAboutUs();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to get safe image URL
  const getSafeImageUrl = () => {
    if (aboutUs?.image?.asset?._ref) {
      return urlFor(aboutUs.image).url();
    }
    return "/images/about_us.webp";
  };

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: aboutUs?.values?.[0]?.missionTitle || 'Mission',
      description: aboutUs?.values?.[0]?.missionDescription || 'We believe that people are the heart of every successful organization.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: aboutUs?.values?.[0]?.visionTitle || 'Vision',
      description: aboutUs?.values?.[0]?.visionDescription || 'Our strategies are designed to deliver measurable, sustainable outcomes.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: aboutUs?.values?.[0]?.coreValuesTitle || 'Core Values',
      description: aboutUs?.values?.[0]?.coreValuesDescription || 'We maintain the highest standards in everything we do.'
    },
  ];

  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-r from-orange-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-8"></div>
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-300 rounded"></div>
              <div className="h-12 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-gradient-to-r from-orange-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading hero content</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen">

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About Us
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  {aboutUs?.description || 'RITEM Consulting is a leading HR consultancy firm dedicated to transforming workplaces and empowering organizations to achieve their full potential. Founded in 2020, we have quickly established ourselves as a trusted partner for businesses seeking innovative HR solutions that drive growth and success.'}
                </p>
               
              </div>
            </div>
            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <Image
                src={getSafeImageUrl()}
                alt="Our story"
                className="rounded-2xl shadow-2xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`p-8 text-center hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-orange-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}