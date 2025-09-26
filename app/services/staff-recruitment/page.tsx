'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CorporateTrainings() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Staff<span className="text-orange-500"> Recruitment</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Streamlined Hiring. Tailored for Your Needs. Built to Find the Best
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Need Top Talent Fast?
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
               At RITEM, we understand that finding the right talent for your business is crucial for success. Our recruitment services are tailored to help businesses like yours identify and attract top-tier professionals who not only meet the qualifications but also fit seamlessly into your company culture for long-term success
                   </p>
                <p>
              Our approach goes beyond just matching resumes with job descriptions. We aim to understand your company’s values, goals, and team dynamics to ensure a perfect fit. With our extensive network and rigorous screening process, we connect you with candidates who possess not only the necessary skills but also the passion and drive to excel in their roles.        </p>
                <p>
                Whether you’re seeking entry-level talent or seasoned professionals, RITEM is committed to providing you with personalised recruitment solutions that meet your specific needs.   </p>
              </div>
            </div>
            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
             <Image
             src="/images/about_us.webp"
               alt="Our story"
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