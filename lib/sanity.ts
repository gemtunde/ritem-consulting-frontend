import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Sanity queries
export const queries = {
  // Hero section
  hero: `*[_type == "hero"][0]{
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    heroImage,
    backgroundShapes[]
  }`,

  // About Us
  aboutUs: `*[_type == "aboutUs"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    description,
    image,
    values[]{
      missionTitle,
      missionDescription,
      visionTitle,
      visionDescription,
      coreValuesTitle,
      coreValuesDescription
    }
  }`,
   // ROI Section
  roiSection: `*[_type == "roiSection"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    metrics[]{
      value,
      label,
      description
    }
  }`,
  // Career Consultancy
  careerConsultancy: `*[_type == "careerConsultancy"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    pageTitle,
    pageSubtitle,
    pageDescription,
    contentTitle,
    contentDescription,
    image,
    services[]{
      title,
      description,
      icon
    },
    benefits
  }`,

  // Corporate Training
  corporateTraining: `*[_type == "corporateTraining"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    pageTitle,
    pageSubtitle,
    pageDescription,
    contentTitle,
    contentDescription,
    image,
    trainingPrograms[]{
      programName,
      description,
      duration,
      audience
    },
    methodologies,
    certification
  }`,

  // Staff Recruitment
  staffRecruitment: `*[_type == "staffRecruitment"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    pageTitle,
    pageSubtitle,
    pageDescription,
    contentTitle,
    contentDescription,
    image,
    recruitmentProcess[]{
      stepNumber,
      title,
      description,
      duration
    },
    industries,
    guaranteePeriod,
    successRate
  }`,


  // Services
  // services: `*[_type == "service"] | order(order asc){
  //   _id,
  //   title,
  //   description,
  //   icon,
  //   features[],
  //   color,
  //   isCTA,
  //   ctaText
  // }`,

  // Team members
  // team: `*[_type == "teamMember"] | order(order asc){
  //   _id,
  //   name,
  //   role,
  //   bio,
  //   image,
  //   socialLinks
  // }`,

  // Testimonials
  testimonials: `*[_type == "testimonial"] | order(order asc){
    _id,
    name,
    role,
    company,
    content,
    rating,
    image
  }`,

  // Articles/Blog posts
  // articles: `*[_type == "article"] | order(publishedAt desc)[0...6]{
  //   _id,
  //   title,
  //   slug,
  //   excerpt,
  //   publishedAt,
  //   readTime,
  //   category,
  //   image,
  //   author->{
  //     name,
  //     image
  //   }
  // }`,

  // Jobs
  jobs: `*[_type == "job"] | order(postedDate desc){
    _id,
    title,
    company,
    location,
    country,
    sector,
    contractType,
    jobType,
    salary,
    description,
    requirements[],
    benefits[],
    responsibilities[],
    postedDate,
    closingDate,
    isUrgent,
    companyDescription,
    teamSize,
    reportingTo
  }`,

  // Single job
  job: `*[_type == "job" && _id == $id][0]{
    _id,
    title,
    company,
    location,
    country,
    sector,
    contractType,
    jobType,
    salary,
    description,
    requirements[],
    benefits[],
    responsibilities[],
    postedDate,
    closingDate,
    isUrgent,
    companyDescription,
    teamSize,
    reportingTo
  }`,

  // Case studies
  // caseStudies: `*[_type == "caseStudy"] | order(order asc){
  //   _id,
  //   title,
  //   company,
  //   industry,
  //   image,
  //   challenge,
  //   solution,
  //   results[],
  //   tags[]
  // }`,

  // Company stats
  // stats: `*[_type == "companyStats"][0]{
  //   companiesTransformed,
  //   employeesImpacted,
  //   satisfactionIncrease,
  //   clientRetention
  // }`,

  // Trust indicators
  // trustIndicators: `*[_type == "trustIndicator"][0]{
  //   companiesCount,
  //   rating,
  //   reviewCount,
  //   partnerLogos[]
  // }`,

   // Contact Us
  contactUs: `*[_type == "contactUs"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    pageTitle,
    pageSubtitle,
    pageDescription,
    contactInfo[]{
      title,
      details
    }
  }`,

    // Carousel Section
  carouselSection: `*[_type == "carouselSection"][0]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    title,
    companies[]{
      name,
      logo
    }
  }`,
};

