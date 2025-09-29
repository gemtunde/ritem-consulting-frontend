import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Hero {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  heroImage: any;
  backgroundShapes: any[];
}

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  isCTA?: boolean;
  ctaText?: string;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: any;
  socialLinks?: any;
}

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: any;
}

interface Article {
  _id: string;
  title: string;
  slug: any;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  image: any;
  author: {
    name: string;
    image: any;
  };
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  sector: string;
  contractType: string;
  jobType: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  responsibilities: string[];
  postedDate: string;
  closingDate: string;
  isUrgent?: boolean;
  companyDescription: string;
  teamSize: string;
  reportingTo: string;
}

interface CaseStudy {
  _id: string;
  title: string;
  company: string;
  industry: string;
  image: any;
  challenge: string;
  solution: string;
  results: any[];
  tags: string[];
}

interface CompanyStats {
  companiesTransformed: string;
  employeesImpacted: string;
  satisfactionIncrease: string;
  clientRetention: string;
}

interface TrustIndicators {
  companiesCount: string;
  rating: number;
  reviewCount: string;
  partnerLogos: any[];
}

interface ContentState {
  // Data
  hero: Hero | null;
  aboutUs: AboutUs | null;
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  articles: Article[];
  jobs: Job[];
  caseStudies: CaseStudy[];
  stats: CompanyStats | null;
  trustIndicators: TrustIndicators | null;

  

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  setAboutUs: (aboutUs: AboutUs) => void;
  setHero: (hero: Hero) => void;
  setServices: (services: Service[]) => void;
  setTeam: (team: TeamMember[]) => void;
  setTestimonials: (testimonials: Testimonial[]) => void;
  setArticles: (articles: Article[]) => void;
  setJobs: (jobs: Job[]) => void;
  setCaseStudies: (caseStudies: CaseStudy[]) => void;
  setStats: (stats: CompanyStats) => void;
  setTrustIndicators: (trustIndicators: TrustIndicators) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Sanity image type about us
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface CompanyValues {
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  coreValuesTitle: string;
  coreValuesDescription: string;
}

// Main AboutUs interface
interface AboutUs {
  _id: string;
  _type: 'aboutUs';
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  description: string;
  image: SanityImage;
  values: CompanyValues[];
}

export const useContentStore = create<ContentState>()(
  devtools(
    (set) => ({
      // Initial state
      hero: null,
      services: [],
      team: [],
      testimonials: [],
      articles: [],
      jobs: [],
      caseStudies: [],
      aboutUs: null,
      stats: null,
      trustIndicators: null,
      isLoading: false,
      error: null,

      // Actions
      setAboutUs: (aboutUs: AboutUs) => set({ aboutUs }),
      setHero: (hero) => set({ hero }),
      setServices: (services) => set({ services }),
      setTeam: (team) => set({ team }),
      setTestimonials: (testimonials) => set({ testimonials }),
      setArticles: (articles) => set({ articles }),
      setJobs: (jobs) => set({ jobs }),
      setCaseStudies: (caseStudies) => set({ caseStudies }),
      setStats: (stats) => set({ stats }),
      setTrustIndicators: (trustIndicators) => set({ trustIndicators }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'content-store',
    }
  )
);