import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import ChallengesSection from '@/components/ChallengesSection';
import ServicesSection from '@/components/ServicesSection';
import WhyWorkWithUs from '@/components/WhyWorkWithUs';
import ExpertConsultancy from '@/components/ExpertConsultancy';
import ROISection from '@/components/ROISection';
import Testimonials from '@/components/Testimonials';
import RecentArticles from '@/components/RecentArticles';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrustSection />
      <ChallengesSection />
      <WhyWorkWithUs />
      <ServicesSection />
      <ExpertConsultancy />
      <ROISection />
      <Testimonials />
      <RecentArticles />
    </div>
  );
}