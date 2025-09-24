'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Download, Play, BookOpen, FileText } from 'lucide-react';
import Image from 'next/image';

export default function Resources() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const resources = [
    {
      type: 'article',
      title: 'The Future of Employee Engagement in Remote Work Environments',
      excerpt: 'Comprehensive guide on maintaining high engagement levels in distributed teams.',
      image: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Leadership',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      type: 'whitepaper',
      title: 'ROI of Employee Engagement: A Data-Driven Analysis',
      excerpt: 'In-depth research study showing the financial impact of engagement initiatives.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'March 10, 2024',
      readTime: '25 pages',
      category: 'Communication',
      icon: <FileText className="w-5 h-5" />
    },
    {
      type: 'webinar',
      title: 'Building Resilient Workplace Cultures: Lessons from Leading Organizations',
      excerpt: 'Interactive session featuring best practices from successful culture transformations.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'March 8, 2024',
      readTime: '60 min',
      category: 'Sales',
      icon: <Play className="w-5 h-5" />
    },
    {
      type: 'article',
      title: 'Mental Health in the Workplace: Creating Supportive Environments',
      excerpt: 'Essential strategies for promoting mental wellness and creating psychologically safe workplaces.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'March 5, 2024',
      readTime: '12 min read',
      category: 'Wellness',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      type: 'whitepaper',
      title: 'The Science of Employee Recognition: What Actually Works',
      excerpt: 'Research-backed insights into effective recognition programs and their impact.',
      image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'March 1, 2024',
      readTime: '18 pages',
      category: 'Recognition',
      icon: <FileText className="w-5 h-5" />
    },
    {
      type: 'webinar',
      title: 'Leadership Communication in Times of Change',
      excerpt: 'Masterclass on effective communication strategies for leaders during organizational transitions.',
      image: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: 'February 28, 2024',
      readTime: '45 min',
      category: 'Operations',
      icon: <Play className="w-5 h-5" />
    }
  ];

  const categories = ['all', 'Leadership', 'Communication', 'Sales', 'Wellness', 'Recognition', 'Operations'];

  const filteredResources = activeFilter === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeFilter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article': return 'bg-blue-100 text-blue-700';
      case 'whitepaper': return 'bg-purple-100 text-purple-700';
      case 'webinar': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Corporate  <span className="text-orange-500">Training</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive range of training modules led by industry experts who are passionate about empowering individuals and organizations to reach their full potential.

            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={`${
                  activeFilter === category 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {category === 'all' ? 'All Resources' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section id="whitepapers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <Card
                key={resource.title}
                className={`overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <Image 
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getTypeColor(resource.type)}>
                      <span className="mr-1">{resource.icon}</span>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </Badge>
                  </div>
                  {resource.type === 'webinar' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-1" />
                    {resource.date}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    {resource.readTime}
                  </div>
                  
                  <Badge variant="outline" className="mb-3">
                    {resource.category}
                  </Badge>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {resource.excerpt}
                  </p>
                  
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    variant={resource.type === 'whitepaper' ? 'default' : 'outline'}
                  >
                    {resource.type === 'whitepaper' && <Download className="w-4 h-4 mr-2" />}
                    {resource.type === 'webinar' && <Play className="w-4 h-4 mr-2" />}
                    {resource.type === 'article' && <BookOpen className="w-4 h-4 mr-2" />}
                    
                    {resource.type === 'whitepaper' ? 'Download' : 
                     resource.type === 'webinar' ? 'Watch Now' : 'Read Article'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="webinars" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get the latest insights, research findings, and best practices delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}