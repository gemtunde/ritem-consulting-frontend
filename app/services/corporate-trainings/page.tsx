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
              Corporate<span className="text-orange-500"> Training</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Corporate Training That Delivers Customised Programs. Expert Instructors. Real Impact.
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
             RITEM has a solution for you.
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  In today’s evolving business landscape, staying ahead of the curve is essential for success. With RITEM’s corporate training programs, you can equip your workforce with the skills and knowledge they need to thrive in the ever-changing corporate world.
                 </p>
                <p>
                Our training programs are designed to address the specific needs and challenges of your industry, providing practical insights and hands-on learning experiences that drive real results. Whether you’re looking to enhance technical skills, foster leadership development, or promote teamwork and collaboration, RITEM has a solution for you.
                      </p>
                <p>
                  We offer a comprehensive range of training modules led by industry experts who are passionate about empowering individuals and organizations to reach their full potential.
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