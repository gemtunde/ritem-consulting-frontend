import axios from 'axios';
import { client, queries } from './sanity';

// Axios instance for external APIs
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Sanity API functions
export const sanityApi = {
  // Hero section
  getHero: () => client.fetch(queries.hero),

  //  useCareerConsultancy
  getCareerConsultancy: () => client.fetch(queries.careerConsultancy),

  // getStaffRecruitment
  getStaffRecruitment: () => client.fetch(queries.staffRecruitment),

  // getCorporateTraining
  getCorporateTraining: () => client.fetch(queries.corporateTraining),

  // Services
  //getServices: () => client.fetch(queries.services),

  // Team
  //getTeam: () => client.fetch(queries.team),

  //getRoiSection
  getRoiSection: () => client.fetch(queries.roiSection),

  // Testimonials
  getTestimonials: () => client.fetch(queries.testimonials),

  // About Us
  getAboutUs: () => client.fetch(queries.aboutUs),

  // Contact Us
  getContactUs: () => client.fetch(queries.contactUs),

  // Jobs
  getJobs: () => client.fetch(queries.jobs),
  getJob: (id: string) => client.fetch(queries.job, { id }),

  // Case studies
  //getCaseStudies: () => client.fetch(queries.caseStudies),

  // Stats
  //getStats: () => client.fetch(queries.stats),

  // Trust indicators
  //getTrustIndicators: () => client.fetch(queries.trustIndicators),
  // Carousel Section

  // Trust indicators
  getCarouselSection: () => client.fetch(queries.carouselSection),


};

// API response interceptors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);