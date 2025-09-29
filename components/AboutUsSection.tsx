'use client';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
//import Image from 'next/image';
import { useAboutUs } from '@/hooks/useContent';

export default function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false);
    const { data: aboutUs, isLoading, error, isError } = useAboutUs();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trust-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

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
    <section id="trust-section" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About us
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          {aboutUs?.description || 'RITEM Consulting is a leading HR consultancy firm dedicated to transforming workplaces and empowering organizations to achieve their full potential. Founded in 2020, we have quickly established ourselves as a trusted partner for businesses seeking innovative HR solutions that drive growth and success.'}
             
           </p>
          
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-600">4.9 from Reviews</span>
          </div>
        </div>
       
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}