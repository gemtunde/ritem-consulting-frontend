'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function Testimonials() {
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

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials-section" className="py-20 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Here is What Our Partners Say About Us
          </h2>
        </div>

        <Card className={`bg-white p-8 lg:p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-2xl lg:text-3xl text-gray-900 font-medium leading-relaxed mb-8">
              Working with Work Unlocked has been transformational for our organization. 
              Their expertise in employee engagement helped us achieve a 40% increase in satisfaction 
              scores and significantly reduced our turnover rate. The teams data-driven approach 
              and ongoing support made all the difference.
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <Image
                src="https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Client testimonial"
                className="w-16 h-16 rounded-full"
                width={100}
                height={100}
              />
              <div className="text-left">
                <div className="font-bold text-gray-900">Michael Chen</div>
                <div className="text-gray-600">Chief Human Resources Officer</div>
                <div className="text-gray-500">Fortune 500 Technology Company</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}