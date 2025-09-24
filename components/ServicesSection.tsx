'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Heart, Target, Shield, MessageCircle, TrendingUp } from 'lucide-react';

export default function ServicesSection() {
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

    const element = document.getElementById('services-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Career Consultancy',
      description: 'Guide professionals at every career stage with personalized coaching, leadership development, and strategic career planning. Our expert consultants help individuals navigate career transitions while ensuring alignment with organizational goals and industry demands.',
      color: 'orange'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Talent Acquisition',
      description: 'Connect top organizations with exceptional talent across technology, healthcare, fintech, oil & gas, agrotech, civil engineering, and logistics sectors. From executive search to specialized technical recruitment, we deliver quality candidates who drive business results.',
      color: 'purple'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Corporate Training & Development',
      description: 'Enhance workforce capabilities through customized training programs, leadership development workshops, and skills enhancement initiatives. Our training solutions address specific organizational needs while building long-term competitive advantages.',
      color: 'blue'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Workplace Happiness Services',
      description: 'Implement evidence-based happiness strategies that create positive work environments and improve overall employee wellbeing.',
      color: 'green'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Employee Counseling (EAP)',
      description: 'Provide confidential counseling and support services to help employees manage personal and work-related challenges effectively.',
      color: 'red'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Get your FREE consultation session',
      description: 'Schedule a complimentary consultation to discuss your specific challenges and discover how we can help transform your workplace.',
      color: 'orange',
      isCTA: true
    }
  ];

  const getColorClasses = (color: string, isCTA?: boolean) => {
    if (isCTA) {
      return {
        icon: 'text-white',
        bg: 'bg-orange-500',
        card: 'bg-orange-500 text-white hover:bg-orange-600'
      };
    }

    const colors = {
      orange: { icon: 'text-orange-500', bg: 'bg-orange-100', card: 'bg-white hover:shadow-lg' },
      purple: { icon: 'text-purple-500', bg: 'bg-purple-100', card: 'bg-white hover:shadow-lg' },
      blue: { icon: 'text-blue-500', bg: 'bg-blue-100', card: 'bg-white hover:shadow-lg' },
      green: { icon: 'text-green-500', bg: 'bg-green-100', card: 'bg-white hover:shadow-lg' },
      red: { icon: 'text-red-500', bg: 'bg-red-100', card: 'bg-white hover:shadow-lg' }
    };

    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How We Supercharge Employee Happiness And Unlock Success With<br />
            Proven (Big-Player) Initiatives
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color, service.isCTA);
            
            return (
              <Card
                key={service.title}
                className={`p-6 transition-all duration-500 hover:-translate-y-2 transform ${colorClasses.card} ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${colorClasses.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <div className={colorClasses.icon}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="mb-6 leading-relaxed opacity-90 line-clamp-3">
                  {service.description}
                </p>
                {service.isCTA ? (
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white text-orange-500 hover:bg-gray-100"
                  >
                    Book Free Session
                  </Button>
                ) : (
                  <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-600">
                    Learn More →
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}