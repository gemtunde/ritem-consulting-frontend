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

  const testimonials = [
    {
      quote:
        "Working with Work Unlocked has been transformational for our organization.",
      name: "Michael Chen",
      role: "Chief Human Resources Officer",
      company: "Fortune 500 Technology Company",
      image: "/images/culture.jpeg",
    },
    {
      quote:
        "The team’s support has been exceptional. We’ve built a more motivated workforce and productivity has never been higher.",
      name: "Aisha Bello",
      role: "Head of People Operations",
      company: "Fast-Growth Fintech",
      image: "/images/culture.jpeg",
    },
    {
      quote:
        "Thanks to Work Unlocked, our employee retention has improved drastically. They truly care about sustainable growth.",
      name: "David Smith",
      role: "CEO",
      company: "HealthTech Startup",
     image: "/images/culture.jpeg",
    },

  ];

  return (
    <section id="testimonials-section" className="py-20 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={idx}
              className={`bg-white p-8 lg:p-12 rounded-2xl shadow-2xl transform transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-gray-900 font-medium leading-relaxed mb-8">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full"
                    width={100}
                    height={100}
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
