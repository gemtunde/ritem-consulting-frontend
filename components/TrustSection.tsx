'use client';
import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);

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

  const companies = [

    { name: 'Microsoft', logo: '/logos/microsoft.png' },
    { name: 'Buddy', logo: '/logos/buddy.png' },
    { name: 'Bis', logo: '/logos/bis.png' },
    { name: 'myStep', logo: '/logos/mystep.png' },
    { name: 'RKYCareers', logo: '/logos/rky.jpg' },


    { name: 'Google', logo: '/logos/google.png' },
    { name: 'Yahoo', logo: '/logos/yahoo.png' },
    { name: 'Amazon', logo: '/logos/amazon.png' },
    // { name: 'Meta', logo: '/logos/meta.png' },
    { name: 'Netflix', logo: '/logos/netflix.png' },
    { name: 'Spotify', logo: '/logos/spotify.png' },
    // { name: 'Adobe', logo: '/logos/adobe.png' },
    { name: 'Tesla', logo: '/logos/tesla.png' },
    // { name: 'Salesforce', logo: '/logos/salesforce.png' },
  ];

  return (
    <section id="trust-section" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            We Have Proudly Unlocked Over 500 Workplaces
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Trusted by leading organizations worldwide to transform their workplace culture and drive measurable results.
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

        {/* Logo Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {companies.map((company, index) => (
                <div
                  key={`first-${company.name}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company, index) => (
                <div
                  key={`second-${company.name}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 128px) 100vw, 128px"
                    />
                  </div>
                </div>
              ))}
            </div>
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