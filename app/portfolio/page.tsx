'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Heart, Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const caseStudies = [
    {
      title: 'Tech Startup Transformation',
      company: 'InnovateTech Solutions',
      industry: 'Technology',
      image: '/images/culture.jpeg',
     // image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=600',
      challenge: 'High turnover rate (45%) and low employee satisfaction scores affecting product development.',
      solution: 'Implemented comprehensive culture transformation program with focus on work-life balance and career development.',
      results: [
        { metric: 'Turnover Reduction', value: '65%', icon: <TrendingUp className="w-5 h-5" /> },
        { metric: 'Satisfaction Increase', value: '40%', icon: <Heart className="w-5 h-5" /> },
        { metric: 'Productivity Boost', value: '30%', icon: <Users className="w-5 h-5" /> }
      ],
      tags: ['Culture Transformation', 'Employee Engagement', 'Retention']
    },
    {
      title: 'Fortune 500 Engagement Revival',
      company: 'Global Manufacturing Corp',
      industry: 'Manufacturing',
       image: '/images/wellbeing.jpg',
     // image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
      challenge: 'Post-merger integration challenges leading to decreased morale and conflicting cultures.',
      solution: 'Designed unified culture framework with leadership alignment and comprehensive communication strategy.',
      results: [
        { metric: 'Engagement Scores', value: '55%', icon: <Heart className="w-5 h-5" /> },
        { metric: 'Leadership Confidence', value: '70%', icon: <Users className="w-5 h-5" /> },
        { metric: 'Cultural Alignment', value: '80%', icon: <Building className="w-5 h-5" /> }
      ],
      tags: ['Merger Integration', 'Leadership Development', 'Cultural Alignment']
    },
    {
      title: 'Healthcare System Wellness',
      company: 'Regional Medical Center',
      industry: 'Healthcare',
        image: '/images/career-1.jpg',
     // image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      challenge: 'Staff burnout and high stress levels impacting patient care quality and employee wellbeing.',
      solution: 'Implemented comprehensive wellness program with mental health support and workload optimization.',
      results: [
        { metric: 'Burnout Reduction', value: '50%', icon: <Heart className="w-5 h-5" /> },
        { metric: 'Sick Days Decrease', value: '35%', icon: <TrendingUp className="w-5 h-5" /> },
        { metric: 'Patient Satisfaction', value: '25%', icon: <Users className="w-5 h-5" /> }
      ],
      tags: ['Employee Wellness', 'Stress Management', 'Healthcare']
    },
    {
      title: 'Financial Services Modernization',
      company: 'Premier Financial Group',
      industry: 'Financial Services',
      image: '/images/staff-recruitment.jpg',
     // image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
      challenge: 'Traditional work culture not adapting to modern employee expectations and remote work needs.',
      solution: 'Modernized HR practices with flexible work arrangements and digital collaboration tools.',
      results: [
        { metric: 'Employee NPS', value: '+45', icon: <Heart className="w-5 h-5" /> },
        { metric: 'Remote Satisfaction', value: '90%', icon: <Users className="w-5 h-5" /> },
        { metric: 'Innovation Index', value: '60%', icon: <TrendingUp className="w-5 h-5" /> }
      ],
      tags: ['Remote Work', 'Digital Transformation', 'Modern Culture']
    }
  ];

  const stats = [
    { label: 'Companies Transformed', value: '500+' },
    { label: 'Employees Impacted', value: '100K+' },
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
              Success <span className="text-orange-500">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real results from real organizations. See how we have helped companies across industries 
              transform their workplace cultures and achieve measurable success.
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
              Featured Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed insights into how we have helped organizations overcome their biggest challenges.
            </p>
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
                    {/* <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    /> */}
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

                    {/* <Button variant="outline" className="group">
                      Read Full Case Study
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button> */}
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
              Join the hundreds of organizations that have transformed their workplace cultures with our proven strategies.
            </p>
            <Link href="/contact" className="bg-white p-2 rounded-md text-orange-500 hover:bg-gray-100">
              Start Your Transformation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}