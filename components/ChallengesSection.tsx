'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function ChallengesSection() {
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

    const element = document.getElementById('challenges-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const challenges = [
    {
      title: 'Healthcare Industry',
      description: 'We address the talent shortage by connecting healthcare institutions with experienced doctors, nurses, medical technicians, and healthcare administrators.',
      image: '/images/nurse.jpg'
    },
    {
      title: 'Oil & Gas Sector',
      description: 'We solve the talent gap by finding petroleum engineers, drilling specialists, environmental consultants, and renewable energy experts. Our recruitment covers upstream, midstream, and downstream professionals who can navigate both conventional energy projects and green energy initiatives.',
      image: '/images/recruiting.jpeg'
    },
    {
      title: 'Fintech & Blockchain',
      description: 'We solve the challenge of finding blockchain developers, digital banking specialists, regulatory compliance experts, and fintech product managers. Our expertise includes sourcing talent for cryptocurrency platforms, digital payment systems, and financial technology startups..',
      image: '/images/wellbeing.jpg'
    },
    {
      title: 'Agricultural Technology Revolution',
      description: 'We address the talent shortage in precision agriculture by finding agricultural engineers, farm management software developers, drone specialists, and sustainable agriculture consultants. Our focus includes professionals who can implement IoT solutions, data analytics, and automation in farming operations.',
      image: '/images/culture.jpeg'
    },
    {
      title: 'Infrastructure Development Expertise',
      description: 'We solve the talent challenge by recruiting structural engineers, transportation planners, environmental engineers, and construction project managers. Our expertise covers professionals skilled in smart city technologies, sustainable construction practices, and large-scale infrastructure development.',
      image: '/images/performance.webp'
    },
    {
      title: 'Logistics & Supply Chain',
      description: 'We address the talent gap by finding supply chain analysts, logistics coordinators, warehouse automation specialists, and transportation managers. Our focus includes professionals experienced in e-commerce fulfillment, last-mile delivery solutions, and supply chain digitization.',
      image: '/images/change.webp'
    }
  ];

  return (
    <section id="challenges-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Companies in Finance, Tech, and Healthcare...<br />
           Trust Us to Solve These{' '}
            <span className="text-orange-500"> Critical Talent Challenges</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <Card
              key={challenge.title}
              className={`p-6 border-0 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <div className="w-full h-48 relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={challenge.image}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 64px) 100vw, 64px"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {challenge.title}
              </h3>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {challenge.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}