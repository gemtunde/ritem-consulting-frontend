'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'People-Centered',
      description: 'We believe that people are the heart of every successful organization.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results-Driven',
      description: 'Our strategies are designed to deliver measurable, sustainable outcomes.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'Our solutions are informed by worldwide best practices and trends.'
    }
  ];

  const team = [
    {
      name: 'Hannah Asibor',
      role: 'Founder & CEO',
      image: '/images/staff-2.webp',
      bio: 'Former Chief People Officer at Fortune 500 company with 15+ years in HR transformation.'
    },
    {
      name: 'Peculiar George Ejire',
      role: 'Director of Employee Engagement',
      image: '/images/staff-4.webp',
      bio: 'Organizational psychology expert specializing in workplace culture and employee satisfaction.'
    },
    {
      name: 'Aduratimileyin',
      role: 'Senior HR Consultant',
      image: '/images/staff-5.webp',
      bio: 'Change management specialist with expertise in leadership development and training programs.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-orange-500">RITEM Consulting</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are on a mission to transform workplace cultures by unlocking the potential 
              of every employee through innovative engagement strategies and proven methodologies.
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
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2025, Ritem consulting emerged from a simple yet powerful observation: 
                  organizations with highly engaged employees consistently outperform their competitors 
                  in every meaningful metric.
                </p>
                <p>
                  We help you achieve professional success.We Offer a range of services to connect employers with skilled professionals. Our goal is to help you find a job that fits your skills and career.
                </p>
                <p>
                  Today, we have helped over 50 organizations transform their workplace cultures, 
                  resulting in higher employee satisfaction, improved retention rates, and 
                  measurable business impact.
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

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className={`p-8 text-center hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-orange-500">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of HR professionals brings decades of combined experience 
              from leading organizations across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="aspect-square overflow-hidden">
                 <Image
                  src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                   width={400}
                    height={400}
                 />
                  {/* <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  /> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}