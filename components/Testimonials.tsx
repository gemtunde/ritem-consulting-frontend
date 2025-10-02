'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { useTestimonials } from '@/hooks/useContent';
import { urlFor } from '@/lib/sanity';

// Define types
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface Testimonial {
  _id: string;
  company: string;
  content: string;
  image: SanityImage;
  name: string;
  rating: number;
  role: string;
}

interface TestimonialCard {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: SanityImage | string;
  rating: number;
}

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: testimonialsData, isLoading, error, isError } = useTestimonials();

  //console.log('Testimonials Data:', testimonialsData);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Function to get safe image URL
  const getSafeImageUrl = (image: SanityImage | string): string => {
    if (typeof image !== 'string' && image?.asset?._ref) {
      return urlFor(image).url();
    }
    if (typeof image === 'string' && image.trim() !== '') {
      return image;
    }
    return "/images/culture.jpeg"; // Fallback image
  };

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <section id="testimonials-section" className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Testimonials
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <Card key={idx} className="bg-white p-8 lg:p-12 rounded-2xl shadow-2xl">
                <div className="animate-pulse">
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-6 h-6 bg-gray-300 rounded mx-1"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-8"></div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                      <div className="h-3 w-24 bg-gray-300 rounded"></div>
                      <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials-section" className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white">Error loading testimonials</p>
        </div>
      </section>
    );
  }

  // Use actual data from Sanity or fallback to default testimonials
  const testimonials: TestimonialCard[] = testimonialsData && testimonialsData.length > 0 
    ? (testimonialsData as Testimonial[]).map((testimonial: Testimonial) => ({
        id: testimonial._id,
        quote: testimonial.content,
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        image: testimonial.image,
        rating: testimonial.rating || 5
      }))
    : [
        {
          id: "1",
          quote: "Working with Work Unlocked has been transformational for our organization.",
          name: "Michael Chen",
          role: "Chief Human Resources Officer",
          company: "Fortune 500 Technology Company",
          image: "/images/culture.jpeg",
          rating: 5
        },
        {
          id: "2",
          quote: "The team's support has been exceptional. We've built a more motivated workforce and productivity has never been higher.",
          name: "Aisha Bello",
          role: "Head of People Operations",
          company: "Fast-Growth Fintech",
          image: "/images/culture.jpeg",
          rating: 5
        },
        {
          id: "3",
          quote: "Thanks to Work Unlocked, our employee retention has improved drastically. They truly care about sustainable growth.",
          name: "David Smith",
          role: "CEO",
          company: "HealthTech Startup",
          image: "/images/culture.jpeg",
          rating: 5
        },
      ];

  return (
    <section id="testimonials-section" className="py-20 bg-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial: TestimonialCard, idx: number) => (
            <Card
              key={testimonial.id}
              className={`bg-white p-8 lg:p-12 rounded-2xl shadow-2xl transform transition-all duration-1000 delay-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                <blockquote className="text-lg lg:text-xl text-gray-900 font-medium leading-relaxed mb-8">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={getSafeImageUrl(testimonial.image)}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                    width={64}
                    height={64}
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}