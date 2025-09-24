'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Image from 'next/image';

export default function ExpertConsultancy() {
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

    const element = document.getElementById('expert-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const expertise = [
    'Employee engagement and satisfaction surveys',
    'Workplace culture transformation programs',
    'Leadership development and training initiatives',
    'Performance management system optimization',
    'Change management and organizational development'
  ];

  return (
    <section id="expert-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              The Expert HR Consultancy For Employee Engagement & Health
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              With decades of combined experience, our team of certified HR professionals specializes 
              in creating workplace environments where employees thrive and organizations succeed.
            </p>

            <div className="space-y-4 mb-8">
              {expertise.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-3 transform transition-all duration-500 ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Schedule Consultation
            </Button>
          </div>

          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-200 to-purple-200 rounded-full opacity-60"></div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <Image
                    src="/images/hrconsult.webp"
                   alt="HR Expert 1"
                  className="rounded-xl shadow-lg"
                  width={600}
                  height={400}
                />
                  <Image
                        src="/images/career-3.jpg"
                      alt='career ritem'
                      width={600}
                      height={400}
                        className="rounded-xl shadow-lg mt-8"
                     // className="rounded-2xl shadow-2xl w-full relative z-10"
                      sizes="(max-width: 192px) 100vw, 192px"
                    />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}