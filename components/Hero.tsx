'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useHero } from '@/hooks/useContent';
import { urlFor } from '@/lib/sanity';

export interface HeroData {
  heroImage?: any;
  subtitle?: string;
  title?: string;
  description?: string;
  ctaText?: string;
}

export default function Hero() {
   const { data: hero, isLoading, error } = useHero() as { data: HeroData; isLoading: boolean; error: any };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">   {/* 👈 force video to bottom */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={hero?.heroImage ? urlFor(hero.heroImage).width(600).url()  : "/banner.mp4"} type="video/mp4" />
          <source src="/banner.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div
          className={`max-w-3xl transform transition-all duration-1000 ${
            isVisible
              ? 'translate-x-0 opacity-100'
              : '-translate-x-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
       {hero?.title || 'Your Gateway To Talent'}      
       {/* <span className="text-orange-400"></span>{' '} */}
         {' '}   <span className="text-purple-400">
              {hero?.subtitle || ' Solutions And Career Growth'
            }{" "}
             </span>
          </h1>{""}
          <p className="mt-6 text-xl text-gray-200 leading-relaxed">
            {
              hero?.description || '  Welcome to RITEM, your strategic partner in professional success, where your professional journey begins and thrives.'
            }
          
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/contact">{
                hero?.ctaText || 'Apply now'
              } </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
