'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CareerConsultancy() {
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
              Career<span className="text-orange-500"> Consultancy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
           From Ambition to Achievement
Professional Support. Strategic Planning. Career Growth
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
              Unsure about your next steps?
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                 RITEM is here to help you navigate your professional journey with confidence and clarity.
                </p>
                <p>
                 Our career consultancy services are designed to empower individuals like you to identify your strengths, passions, and career goals.
                      </p>
                <p>
                Through personalized guidance and assessment, we help you gain valuable insights into your unique skill set and potential career paths. Whether you’re a recent graduate exploring your options or a seasoned professional looking to make a career pivot, our experienced consultants are here to provide you with the support and resources you need to make informed decisions about your future.
                </p>
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