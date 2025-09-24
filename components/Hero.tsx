'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/banner.mp4" type="video/mp4" />
          <source src="/banner.webm" type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className={`max-w-3xl transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Your Gateway{' '}
            <span className="text-orange-400">To Talent</span> {' '}
            <span className="text-purple-400">Solutions And</span>
            <br />
            Career Growth
          </h1>
          <p className="mt-6 text-xl text-gray-200 leading-relaxed">
           Welcome to RITEM, your strategic partner in professional success, where your professional journey begins and thrives. 
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-black hover:text-gray-100 hover:border-black">
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}