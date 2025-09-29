'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, contactFormSchema } from '@/lib/schemas/validations';
import { useContactUs } from '@/hooks/useContent';

// Define types
interface SanityAssetReference {
  _ref: string;
  _type: 'reference';
}

interface SanityImage {
  _type: 'image';
  asset: SanityAssetReference;
}

interface ContactInfoItem {
  title: string;
  details: string[];
}

interface ContactUsData {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  pageTitle: string;
  pageSubtitle: string;
  pageDescription: string;
  contactInfo: ContactInfoItem[];
}

interface ContactInfoDisplay {
  icon: JSX.Element;
  title: string;
  details: string[];
}

interface ContactFormProps {
  register: any;
  handleSubmit: any;
  errors: any;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { data: contactData, isLoading, error } = useContactUs();

  console.log('Contact Us Data:', contactData);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Map icon based on title
  const getIconForTitle = (title: string): JSX.Element => {
    const iconMap: Record<string, JSX.Element> = {
      'Office Location': <MapPin className="w-6 h-6" />,
      'Phone Numbers': <Phone className="w-6 h-6" />,
      'Email Addresses': <Mail className="w-6 h-6" />,
      'Business Hours': <Clock className="w-6 h-6" />,
    };
    return iconMap[title] || <MapPin className="w-6 h-6" />;
  };

  // Use Sanity data or fallback to default
  const contactInfo: ContactInfoDisplay[] = contactData?.contactInfo && contactData.contactInfo.length > 0 
    ? contactData.contactInfo.map((item: ContactInfoItem) => ({
        icon: getIconForTitle(item.title),
        title: item.title,
        details: item.details.filter((detail: string) => detail.trim() !== '')
      }))
    : [
        {
          icon: <MapPin className="w-6 h-6" />,
          title: 'Office Location',
          details: ['123 Ritem Avenue, Suite 100', 'New York, NY 10001', 'United Kingdom']
        },
        {
          icon: <Phone className="w-6 h-6" />,
          title: 'Phone Numbers',
          details: ['Main: (555) 123-4567', 'Direct: (555) 123-4568', 'Toll-Free: (800) 123-4567']
        },
        {
          icon: <Mail className="w-6 h-6" />,
          title: 'Email Addresses',
          details: ['General: hello@ritemconsulting.com', 'Sales: sales@ritemconsulting.com', 'Support: support@ritemconsulting.com']
        },
        {
          icon: <Clock className="w-6 h-6" />,
          title: 'Business Hours',
          details: ['Monday - Friday: 9:00 AM - 6:00 PM EST', 'Saturday: 10:00 AM - 2:00 PM EST', 'Sunday: Closed']
        }
      ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-pulse">
              <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </section>
        {/* Loading skeleton for contact section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="p-8 animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </Card>
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-8"></div>
                <div className="space-y-8">
                  {[...Array(4)].map((_, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-gray-300 rounded mb-2 w-32"></div>
                        <div className="space-y-1">
                          <div className="h-4 bg-gray-300 rounded w-full"></div>
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading contact information</p>
        </div>
      </div>
    );
  }

  const data: ContactUsData | null = contactData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data?.pageTitle || 'Get In'} <span className="text-orange-500"> {data?.pageSubtitle || 'Touch'}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data?.pageDescription || 'Ready to transform your workplace culture? Let us discuss how we can help you create an engaged, productive, and thriving organization.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form - UNTOUCHED */}
            <ContactForm 
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              onSubmit={onSubmit}
              isVisible={isVisible}
            />

            {/* Contact Information - UPDATED */}
            <ContactInfo 
              contactInfo={contactInfo}
              isVisible={isVisible}
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <MapSection isVisible={isVisible} /> */}
    </div>
  );
}

// Contact Form Component
interface ContactFormComponentProps extends ContactFormProps {
  isVisible: boolean;
}

const ContactForm: React.FC<ContactFormComponentProps> = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  isSubmitted,
  onSubmit,
  isVisible
}) => {
  return (
    <Card className={`p-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-800 font-medium">
            Thank you for your message! We&apos;ll get back to you soon.
          </p>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <Input placeholder="John" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <Input placeholder="Doe" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <Input type="email" placeholder="john@company.com" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <Input placeholder="+1 (555) 123-4567" {...register("phone")} />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How can we help you? *
          </label>
          <Textarea 
            placeholder="Tell us about your challenges, goals, and how we can assist you..."
            rows={5}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
};

// Contact Info Component
interface ContactInfoProps {
  contactInfo: ContactInfoDisplay[];
  isVisible: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactInfo, isVisible }) => {
  return (
    <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Contact Information
      </h2>
      
      <div className="space-y-8">
        {contactInfo.map((info: ContactInfoDisplay, index: number) => (
          <div
            key={info.title}
            className={`transform transition-all duration-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
            style={{ transitionDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-orange-500">
                  {info.icon}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail: string, detailIndex: number) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Map Section Component
// interface MapSectionProps {
//   isVisible: boolean;
// }

// const MapSection: React.FC<MapSectionProps> = ({ isVisible }) => {
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//             Visit Our Office
//           </h2>
//           <p className="text-xl text-gray-600">
//             Located in the heart of London City, we are easily accessible by public transportation.
//           </p>
//         </div>
        
//         <div className="bg-gray-300 h-96 rounded-2xl flex items-center justify-center">
//           <div className="text-center">
//             <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-4" />
//             <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
//             <p className="text-sm text-gray-500 mt-2">123 Trump Towers Avenue, Suite 100, London, UK</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };