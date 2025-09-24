import { z } from 'zod';

export const jobApplicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  currentRole: z.string().optional(),
  currentCompany: z.string().optional(),
  experience: z.string().min(1, 'Years of experience is required'),
  noticePeriod: z.string().min(1, 'Notice period is required'),
  salaryExpectation: z.string().optional(),
  skills: z.string().min(1, 'Skills are required'),
  motivation: z.string().min(1, 'Motivation is required'),
  availability: z.string().min(1, 'Availability is required'),
  questions: z.string().optional(),
  terms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
  marketing: z.boolean().optional(),
});

export type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;


export const contactFormSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;