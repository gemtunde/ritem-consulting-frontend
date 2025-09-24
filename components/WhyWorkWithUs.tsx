'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function WhyWorkWithUs() {
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

    const element = document.getElementById('why-work-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    'Proven track record with 500+ successful transformations',
    'Customized strategies tailored to your unique organizational culture',
    'Data-driven approach with measurable ROI and clear metrics',
    'Expert team with combined 50+ years of HR consulting experience',
    'Comprehensive support from assessment through implementation',
    'Ongoing partnership to ensure sustained success and growth'
  ];

  return (
    <section id="why-work-section" className="py-20 bg-gradient-to-r from-orange-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-200 rounded-full opacity-60"></div>
              {/* <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Professional woman smiling"
                className=""
              /> */}
                <Image
                        src="/images/career-1.jpg"
                      alt='career ritem'
                      width={600}
                      height={400}
                      className="rounded-2xl shadow-2xl w-full relative z-10"
                      sizes="(max-width: 192px) 100vw, 192px"
                    />
            </div>
          </div>

          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Work With Us
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Work Unlocked, we understand that every organization is unique. Our approach combines 
              industry best practices with innovative solutions tailored specifically to your challenges 
              and goals.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-3 transform transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}