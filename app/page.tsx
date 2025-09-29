import Hero from '@/components/Hero';
import AboutUsSection from '@/components/AboutUsSection';
import JobSection from '@/components/JobSection';
//import ServicesSection from '@/components/ServicesSection';
//mport WhyWorkWithUs from '@/components/WhyWorkWithUs';
//import ExpertConsultancy from '@/components/ExpertConsultancy';
import ROISection from '@/components/ROISection';
import Testimonials from '@/components/Testimonials';
//import RecentArticles from '@/components/RecentArticles';
import CarouselSection from '@/components/CarouselSection';
//import AboutUsSection from '@/components/AboutUsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutUsSection />
      <JobSection />
      {/* <WhyWorkWithUs /> */}
      {/* <ServicesSection /> */}
      {/* <ExpertConsultancy /> */}
      <ROISection />
      <Testimonials />
      {/* <RecentArticles /> */}
      <CarouselSection />
    </div>
  );
}