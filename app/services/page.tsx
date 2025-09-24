'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Target, Shield, MessageCircle, TrendingUp, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 'surveys',
      icon: <Users className="w-12 h-12" />,
      title: 'Career Consultancy',
      description: 'Guide professionals at every career stage with personalized coaching, leadership development, and strategic career planning. Our expert consultants help individuals navigate career transitions while ensuring alignment with organizational goals and industry demands.',
      features: [
        'Custom survey design tailored to your organization',
        'Anonymous data collection and analysis',
        'Benchmark comparisons with industry standards',
        'Detailed reporting with actionable recommendations',
        'Ongoing tracking and measurement'
      ],
      color: 'orange'
    },
    {
      id: 'engagement',
      icon: <Heart className="w-12 h-12" />,
      title: 'Staff Recruitment & Talent Acquisition',
      description: 'Connect top organizations with exceptional talent across technology, healthcare, fintech, oil & gas, agrotech, civil engineering, and logistics sectors. From executive search to specialized technical recruitment, we deliver quality candidates who drive business results',
      features: [
        'Engagement strategy development',
        'Team building and collaboration initiatives',
        'Recognition and rewards programs',
        'Communication enhancement strategies',
        'Progress monitoring and optimization'
      ],
      color: 'purple'
    },
    {
      id: 'culture',
      icon: <Target className="w-12 h-12" />,
      title: 'Culture Transformation',
      description: 'Comprehensive culture change management to align values with business objectives.',
      features: [
        'Culture assessment and gap analysis',
        'Values definition and implementation',
        'Change management planning',
        'Leadership alignment coaching',
        'Culture sustainability programs'
      ],
      color: 'blue'
    },
    {
      id: 'leadership',
      icon: <Shield className="w-12 h-12" />,
      title: 'Corporate Training & Development',
      description: 'Enhance workforce capabilities through customized training programs, leadership development workshops, and skills enhancement initiatives. Our training solutions address specific organizational needs while building long-term competitive advantages.',
      features: [
        'Executive coaching and mentoring',
        'Leadership skills assessment',
        'Management training programs',
        'Succession planning strategies',
        '360-degree feedback processes'
      ],
      color: 'green'
    },
    {
      icon: <MessageCircle className="w-12 h-12" />,
      title: 'Employee Counseling (EAP)',
      description: 'Confidential counseling and support services for personal and work-related challenges.',
      features: [
        'Confidential counseling sessions',
        'Crisis intervention support',
        'Work-life balance coaching',
        'Stress management programs',
        'Mental health resources and referrals'
      ],
      color: 'red'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Performance Optimization',
      description: 'Data-driven performance management systems that drive results and growth.',
      features: [
        'Performance management system design',
        'KPI development and tracking',
        'Goal-setting and alignment strategies',
        'Performance review optimization',
        'Continuous improvement processes'
      ],
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: { icon: 'text-orange-500', bg: 'bg-orange-100', accent: 'text-orange-500' },
      purple: { icon: 'text-purple-500', bg: 'bg-purple-100', accent: 'text-purple-500' },
      blue: { icon: 'text-blue-500', bg: 'bg-blue-100', accent: 'text-blue-500' },
      green: { icon: 'text-green-500', bg: 'bg-green-100', accent: 'text-green-500' },
      red: { icon: 'text-red-500', bg: 'bg-red-100', accent: 'text-red-500' },
      indigo: { icon: 'text-indigo-500', bg: 'bg-indigo-100', accent: 'text-indigo-500' }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-orange-500">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive HR solutions designed to transform your workplace culture, 
              boost employee engagement, and drive measurable business results.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color);
              
              return (
                <Card
                  key={service.title}
                  id={service.id}
                  className={`p-8 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-20 h-20 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6`}>
                    <div className={colorClasses.icon}>
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className={`w-5 h-5 ${colorClasses.accent} mt-0.5 flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-orange-500 hover:bg-orange-600">
                    Learn More
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Workplace?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let us discuss how our proven strategies can help you create a thriving workplace culture.
            </p>
            <Link href="/contact"  className="bg-white text-orange-500 px-4 py-4 rounded-md hover:bg-gray-100">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}