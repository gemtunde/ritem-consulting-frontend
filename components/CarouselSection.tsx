'use client';
import { useCarouselSection } from '@/hooks/useContent';
//import { useEffect, useState } from 'react';
import Image from 'next/image';
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

interface Company {
  name: string;
  logo: SanityImage;
}

// interface CarouselSectionData {
//   _id: string;
//   _type: string;
//   _createdAt: string;
//   _updatedAt: string;
//   _rev: string;
//   title: string;
//   companies: Company[];
// }

interface CompanyDisplay {
  name: string;
  logo: string;
}

export default function CarouselSection() {
  const { data: carouselData, isLoading, error } = useCarouselSection();
 // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       }
  //     },
  //     { threshold: 0.1 }
  //   );

  //   const element = document.getElementById('trust-section');
  //   if (element) {
  //     observer.observe(element);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  // Function to get safe image URL
  const getSafeImageUrl = (image: SanityImage): string => {
    if (image?.asset?._ref) {
      return urlFor(image).url();
    }
    return "/logos/placeholder.png"; // Fallback image
  };

  // Use Sanity data if available, otherwise use default companies
  const companies: CompanyDisplay[] = carouselData?.companies && carouselData.companies.length > 0 
    ? carouselData.companies.map((company: Company) => ({
        name: company.name,
        logo: getSafeImageUrl(company.logo)
      }))
    : [
        { name: 'Microsoft', logo: '/logos/microsoft.png' },
        { name: 'Buddy', logo: '/logos/buddy.png' },
        { name: 'Bis', logo: '/logos/bis.png' },
        { name: 'myStep', logo: '/logos/mystep.png' },
        { name: 'RKYCareers', logo: '/logos/rky.jpg' },
        { name: 'Google', logo: '/logos/google.png' },
        { name: 'Yahoo', logo: '/logos/yahoo.png' },
        { name: 'Amazon', logo: '/logos/amazon.png' },
        { name: 'Netflix', logo: '/logos/netflix.png' },
        { name: 'Spotify', logo: '/logos/spotify.png' },
        { name: 'Tesla', logo: '/logos/tesla.png' },
      ];

  if (isLoading) {
    return (
      <section id="trust-section" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="flex overflow-hidden">
            <div className="flex animate-pulse">
              {[...Array(8)].map((_, index: number) => (
                <div key={index} className="flex-shrink-0 mx-8">
                  <div className="w-32 h-16 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="trust-section" className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading companies</p>
        </div>
      </section>
    );
  }

  if (!companies || companies.length === 0) {
    return null; // Don't render if no companies
  }

  return (
    <section id="trust-section" className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {carouselData?.title || 'Trusted By'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading organizations worldwide to transform their workplace culture and drive measurable results.
          </p>
        </div> */}

        {/* Logo Carousel */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {companies.map((company: CompanyDisplay, index: number) => (
                <div
                  key={`first-${company.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 128px) 100vw, 128px"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = '/logos/placeholder.png';
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companies.map((company: CompanyDisplay, index: number) => (
                <div
                  key={`second-${company.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <div className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 128px) 100vw, 128px"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = '/logos/placeholder.png';
                      }}
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