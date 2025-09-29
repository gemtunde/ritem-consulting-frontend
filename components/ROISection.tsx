'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Heart } from 'lucide-react';
import { useRoiSection } from '@/hooks/useContent';

// Define types
interface Metric {
  description: string;
  label: string;
  value: string;
}

interface RoiSectionData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title: string;
  metrics: Metric[];
}

interface Stat {
  icon: JSX.Element;
  value: string;
  label: string;
  description: string;
}

export default function ROISection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>([]);
  const { data: roiSection, isLoading, error, isError } = useRoiSection();

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
  }, [roiSection]); // Add roiSection as dependency 

  const animateCounters = () => {
    if (!roiSection?.metrics) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    // Parse target values from metrics
    const targets: number[] = roiSection.metrics.map((metric: Metric) => {
      // Extract numeric value from string (remove non-numeric characters)
      const numericValue = parseInt(metric.value.replace(/[^\d]/g, '')) || 0;
      return numericValue;
    });

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      const newCounters: number[] = targets.map((target: number) => 
        Math.floor(target * progress)
      );
      
      setCounters(newCounters);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, stepTime);
  };

  // Default stats in case no data is available
  const defaultStats: Stat[] = [
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      value: '6x',
      label: 'Return on Investment',
      description: 'Average ROI achieved by our clients within 12 months of implementation'
    },
    {
      icon: <Heart className="w-8 h-8 text-orange-500" />,
      value: '30%',
      label: 'Higher Employee Satisfaction',
      description: 'Increase in employee satisfaction scores measured through comprehensive surveys'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      value: '78%',
      label: 'Better Retention Rate',
      description: 'Improvement in employee retention rates reducing costly turnover expenses'
    }
  ];

  // Map icons to metric labels for dynamic assignment
  const getIconForLabel = (label: string): JSX.Element => {
    const iconMap: { [key: string]: JSX.Element } = {
      'Return on Investment': <TrendingUp className="w-8 h-8 text-green-600" />,
      'Employee Satisfaction': <Heart className="w-8 h-8 text-orange-500" />,
      'Retention Rate': <Users className="w-8 h-8 text-purple-600" />,
      'Higher Employee Satisfaction': <Heart className="w-8 h-8 text-orange-500" />,
      'Better Retention Rate': <Users className="w-8 h-8 text-purple-600" />
    };
    
    return iconMap[label] || <TrendingUp className="w-8 h-8 text-blue-600" />;
  };

  // Create stats from Sanity data or use defaults
  const stats: Stat[] = roiSection?.metrics ? roiSection.metrics.map((metric: Metric, index: number) => ({
    icon: getIconForLabel(metric.label),
    value: counters[index] !== undefined ? 
      (metric.label.includes('Investment') ? `${counters[index]}x` : `${counters[index]}%`) : 
      metric.value,
    label: metric.label,
    description: metric.description
  })) : defaultStats;

  if (isLoading) {
    return (
      <section id="roi-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index: number) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="h-12 bg-gray-300 rounded w-20 mx-auto mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-40 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="roi-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading ROI content</p>
        </div>
      </section>
    );
  }

  return (
    <section id="roi-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {roiSection?.title || 'Your ROI With Work Unlocked'}
          </h2> */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven methodologies deliver measurable results that directly impact your bottom line 
            and create lasting positive change in your organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat: Stat, index: number) => (
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