'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Heart, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function StaffRecruitment() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const caseStudies = [
    {
      title: 'Career Consultancy Services',
      company: 'From Ambition to Achievement.',
      industry: 'RKY Careers',
      image: '/images/staff-recruitment.jpg',
     challenge: 'Feeling stuck in a rut and unsure about career progression.',
      solution: 'Through personalized guidance and assessment, we help you gain valuable insights into your unique skill set and potential career paths. Whether you’re a recent graduate exploring your options or a seasoned professional looking to make a career pivot, our experienced consultants are here to provide you with the support and resources you need to make informed decisions about your future.',
      results: [
        { metric: 'Turnover Reduction', value: '65%', icon: <TrendingUp className="w-5 h-5" /> },
        { metric: 'Satisfaction Increase', value: '40%', icon: <Heart className="w-5 h-5" /> },
        { metric: 'Productivity Boost', value: '30%', icon: <Users className="w-5 h-5" /> }
      ],
      tags: ['Professional Support', 'Strategic Planning', 'Career Growth']
    },
 
  ];

  const stats = [
    { label: 'Companies Transformed', value: '15+' },
    { label: 'Employees Impacted', value: '2K+' },
    { label: 'Average Satisfaction Increase', value: '40%' },
    { label: 'Client Retention Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Career <span className="text-orange-500">Consultancy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From Ambition to Achievement. Professional Support. Strategic Planning. Career Growth
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transform transition-all duration-1000 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
             Unsure about your next steps? See how we have helped others.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
             Our career consultancy services are designed to empower individuals like you to identify your strengths, passions, and career goals.  </p>
          </div>

          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <Card
                key={study.title}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-video lg:aspect-auto overflow-hidden">
                   <Image
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {study.title}
                    </h3>
                    <p className="text-orange-600 font-medium mb-6">
                      {study.company} • {study.industry}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      {study.results.map((result) => (
                        <div key={result.metric} className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-center mb-2 text-orange-500">
                            {result.icon}
                          </div>
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {result.metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
             Together, we’ll map out a path to success that aligns with your aspirations and ambitions. Take the first step towards a fulfilling and rewarding career. Connect with RITEM today and embark on a journey of professional growth and success.
                </p>
            <Link href="/contact" className="inline-block px-6 py-3 text-lg font-semibold text-orange-500 bg-white rounded-lg shadow hover:bg-gray-100">
              Start Your Transformation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}