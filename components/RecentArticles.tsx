'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentArticles() {
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

    const element = document.getElementById('articles-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const articles = [
    {
      image: '/images/engagement.jpg',
      title: 'How to Build a Culture of Employee Recognition That Drives Results',
      excerpt: 'Learn proven strategies to create meaningful recognition programs that boost morale and productivity.',
      date: 'March 15, 2024',
      readTime: '8 min read'
    },
    {
      image: '/images/culture.jpeg',
      title: 'The Future of Remote Work: Maintaining Connection and Engagement',
      excerpt: 'Discover best practices for keeping remote teams engaged and productive in the evolving workplace.',
      date: 'March 12, 2024',
      readTime: '6 min read'
    },
    {
      image: '/images/nurse.jpg',
      title: 'Mental Health in the Workplace: Creating Supportive Environments',
      excerpt: 'Essential strategies for promoting mental wellness and creating psychologically safe workplaces.',
      date: 'March 10, 2024',
      readTime: '10 min read'
    }
  ];

  return (
    <section id="articles-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest insights on employee engagement and workplace culture.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6 lg:mt-0">
            <Link href="/resources">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.title}
              className={`overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  width={600}
                  height={400}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {article.date}
                  <span className="mx-2">•</span>
                  {article.readTime}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <Button variant="link" className="p-0 h-auto text-orange-500 hover:text-orange-600">
                  Read More →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}