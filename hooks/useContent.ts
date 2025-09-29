import { useQuery } from '@tanstack/react-query';
import { sanityApi } from '@/lib/api';

// Hero hook
export const useHero = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: sanityApi.getHero,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Services hook
// export const useServices = () => {
//   return useQuery({
//     queryKey: ['services'],
//     queryFn: sanityApi.getServices,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// About Us hook
export const useAboutUs = () => {
  return useQuery({
    queryKey: ['about-us'],
    queryFn: sanityApi.getAboutUs,
    staleTime: 5 * 60 * 1000,
  });
};
export const useContactUs = () => {
  return useQuery({
    queryKey: ['contact-us'],
    queryFn: sanityApi.getContactUs,
    staleTime: 5 * 60 * 1000,
  });
};

// Testimonials hook
export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: sanityApi.getTestimonials,
    staleTime: 5 * 60 * 1000,
  });
};

// Articles hook
// export const useArticles = () => {
//   return useQuery({
//     queryKey: ['articles'],
//     queryFn: sanityApi.getArticles,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// Jobs hook
export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: sanityApi.getJobs,
    staleTime: 5 * 60 * 1000,
  });
};

// Single job hook
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => sanityApi.getJob(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Case studies hook
// export const useCaseStudies = () => {
//   return useQuery({
//     queryKey: ['caseStudies'],
//     queryFn: sanityApi.getCaseStudies,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// Stats hook
// export const useStats = () => {
//   return useQuery({
//     queryKey: ['stats'],
//     queryFn: sanityApi.getStats,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// Trust indicators hook
// export const useTrustIndicators = () => {
//   return useQuery({
//     queryKey: ['trustIndicators'],
//     queryFn: sanityApi.getTrustIndicators,
//     staleTime: 5 * 60 * 1000,
//   });
// };

// ROI Section hook
export const useRoiSection = () => {
  return useQuery({
    queryKey: ['roiSection'],
    queryFn: sanityApi.getRoiSection,
    staleTime: 5 * 60 * 1000,
  });
};

// ROI Section hook
export const useCarouselSection = () => {
  return useQuery({
    queryKey: ['carouselSection'],
    queryFn: sanityApi.getCarouselSection,
    staleTime: 5 * 60 * 1000,
  });
};

// Career Consultancy hook
export const useCareerConsultancy = () => {
  return useQuery({
    queryKey: ['careerConsultancy'],
    queryFn: sanityApi.getCareerConsultancy,
    staleTime: 5 * 60 * 1000,
  });
};
export const useStaffRecruitment = () => {
  return useQuery({
    queryKey: ['staffRecruitment'],
    queryFn: sanityApi.getStaffRecruitment,
    staleTime: 5 * 60 * 1000,
  });
};
export const useCorporateTraining = () => {
  return useQuery({
    queryKey: ['corporateTraining'],
    queryFn: sanityApi.getCorporateTraining,
    staleTime: 5 * 60 * 1000,
  });
};