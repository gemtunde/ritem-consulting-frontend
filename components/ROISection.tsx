'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Heart } from 'lucide-react';

export default function ROISection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ roi: 0, satisfaction: 0, retention: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('roi-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { roi: 6, satisfaction: 30, retention: 78 };
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        roi: Math.floor(targets.roi * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        retention: Math.floor(targets.retention * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  const stats = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      value: `${counters.roi}x`,
      label: 'Return on Investment',
      description: 'Average ROI achieved by our clients within 12 months of implementation'
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      value: `${counters.satisfaction}%`,
      label: 'Higher Employee Satisfaction',
      description: 'Increase in employee satisfaction scores measured through comprehensive surveys'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      value: `${counters.retention}%`,
      label: 'Better Retention Rate',
      description: 'Improvement in employee retention rates reducing costly turnover expenses'
    }
  ];

  return (
    <section id="roi-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your ROI With Work Unlocked
          </h2> */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven methodologies deliver measurable results that directly impact your bottom line 
            and create lasting positive change in your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex justify-center mb-6">
                {stat.icon}
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {stat.label}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}