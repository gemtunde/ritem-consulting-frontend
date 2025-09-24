'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { jobApplicationSchema } from '@/lib/schemas/validations';

// Zod validation schema
// export const jobApplicationSchema = z.object({
//   //id: z.string().optional(),
//  // title: z.string().min(1, 'Job title is required'),
//   firstName: z.string().min(1, 'First name is required'),
//   lastName: z.string().min(1, 'Last name is required'),
//   email: z.string().email('Please enter a valid email address'),
//   phone: z.string().min(1, 'Phone number is required'),
//   address: z.string().min(1, 'Address is required'),
//   city: z.string().min(1, 'City is required'),
//   country: z.string().min(1, 'Country is required'),
//   currentRole: z.string().optional(),
//   currentCompany: z.string().optional(),
//   experience: z.string().min(1, 'Years of experience is required'),
//   noticePeriod: z.string().min(1, 'Notice period is required'),
//   salaryExpectation: z.string().optional(),
//   skills: z.string().min(1, 'Skills are required'),
//   motivation: z.string().min(1, 'Motivation is required'),
//   availability: z.string().min(1, 'Availability is required'),
//   questions: z.string().optional(),
//   terms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
//   marketing: z.boolean().optional(),
// });

interface Job {
  id: string;
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

interface JobApplicationClientProps {
  job: Job;
}

export default function JobApplicationClient({ job }: JobApplicationClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState<string>('');

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    currentRole: '',
    currentCompany: '',
    experience: '',
    noticePeriod: '',
    salaryExpectation: '',
    skills: '',
    motivation: '',
    availability: '',
    questions: '',
    terms: false,
    marketing: false,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // File validation function
  const validateFile = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PDF, DOC, or DOCX file';
    }
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  // Handle CV upload
  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrors(prev => ({ ...prev, cv: error }));
        return;
      }
      setCvFile(file);
      setErrors(prev => ({ ...prev, cv: '' }));
    }
  };

  // Handle cover letter upload
  const handleCoverLetterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setErrors(prev => ({ ...prev, coverLetter: error }));
        return;
      }
      setCoverLetterFile(file);
      setErrors(prev => ({ ...prev, coverLetter: '' }));
    }
  };

  // Handle form field changes
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//      console.log('Submit button clicked!'); // Add this
//     setIsSubmitting(true);
//     setSubmitError('');

//     try {
//       // Validate form data with Zod
//       const validatedData = jobApplicationSchema.parse(formData);

//       // Check if CV is uploaded (required)
//       if (!cvFile) {
//         setErrors(prev => ({ ...prev, cv: 'CV/Resume is required' }));
//         setIsSubmitting(false);
//         return;
//       }

//       // Create FormData for file upload
//       const formDataToSend = new FormData();
      
//       // Add all form fields
//       Object.entries(validatedData).forEach(([key, value]) => {
//         formDataToSend.append(key, String(value));
//       });

//       // Add job details
//       formDataToSend.append('id', job.id);
//       formDataToSend.append('title', job.title);

//       // Add files
//       formDataToSend.append('cv', cvFile);
//       if (coverLetterFile) {
//         formDataToSend.append('coverLetter', coverLetterFile);
//       }
// //console.log('Submitting form data:', formDataToSend);
// for (const [key, value] of formDataToSend.entries()) {
//   console.log(key, value);
// }
//       // Submit to API
//       const response = await fetch('/api/apply', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       const result = await response.json();

//       if (result.success) {
//         setIsSubmitted(true);
//       } else {
//         setSubmitError(result.error || 'Failed to submit application. Please try again.');
//       }
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         // Handle Zod validation errors
//         const validationErrors: { [key: string]: string } = {};
//         error.errors.forEach((err) => {
//           if (err.path.length > 0) {
//             validationErrors[err.path[0]] = err.message;
//           }
//         });
//         setErrors(validationErrors);
//       } else {
//         setSubmitError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  console.log('Submit button clicked!');
  setIsSubmitting(true);
  setSubmitError('');

  try {
    console.log('Starting validation...');
    console.log('Form data state:', formData);
    
    // Validate form data with Zod (without title)
    const validatedData = jobApplicationSchema.parse(formData);
    console.log('Validation passed:', validatedData);

    // Check if CV is uploaded (required)
    if (!cvFile) {
      console.log('CV file missing');
      setErrors(prev => ({ ...prev, cv: 'CV/Resume is required' }));
      setIsSubmitting(false);
      return;
    }
    console.log('CV file check passed');

    // Create FormData for file upload
    const formDataToSend = new FormData();
    
    // Add all form fields
    Object.entries(validatedData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });

    // Add job details (title comes from job prop, not form)
    formDataToSend.append('jobId', job.id);
    formDataToSend.append('jobTitle', job.title);

    // Add files
    formDataToSend.append('cv', cvFile);
    if (coverLetterFile) {
      formDataToSend.append('coverLetter', coverLetterFile);
    }

    console.log('FormData contents:');
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }

    // Submit to API
    console.log('Submitting to API...');
    const response = await fetch('/api/apply', {
      method: 'POST',
      body: formDataToSend,
    });

    console.log('API response status:', response.status);
    const result = await response.json();
    console.log('API response:', result);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'Failed to submit application. Please try again.');
    }
  } catch (error) {
    console.log('Error caught:', error);
    if (error instanceof z.ZodError) {
      console.log('Zod validation errors:', error.errors);
      // Handle Zod validation errors
      const validationErrors: { [key: string]: string } = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          validationErrors[err.path[0]] = err.message;
        }
      });
      setErrors(validationErrors);
    } else {
      console.log('Unexpected error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  } finally {
    console.log('Finally block - setting isSubmitting to false');
    setIsSubmitting(false);
  }
};

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your application. We will review your submission and get back to you within 5-7 business days.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/jobs">Browse More Jobs</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/jobs/${job.id}`}>Back to Job Details</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button asChild variant="ghost" className="mb-4">
              <Link href={`/jobs/${job.id}`}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Job Details
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
            <p className="text-gray-600">
              Fill out the form below to submit your application. All fields marked with * are required.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Error Message */}
            {submitError && (
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{submitError}</p>
                </div>
              </Card>
            )}

            {/* Personal Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`mt-2 ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`mt-2 ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`mt-2 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea 
                    id="address" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`mt-2 ${errors.address ? 'border-red-500' : ''}`}
                    rows={3} 
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input 
                    id="city" 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`mt-2 ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className={`mt-2 ${errors.country ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="england">England</SelectItem>
                      <SelectItem value="scotland">Scotland</SelectItem>
                      <SelectItem value="wales">Wales</SelectItem>
                      <SelectItem value="northern-ireland">Northern Ireland</SelectItem>
                      <SelectItem value="ireland">Ireland</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
              </div>
            </Card>

            {/* Professional Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="currentRole">Current Job Title</Label>
                  <Input 
                    id="currentRole" 
                    value={formData.currentRole}
                    onChange={(e) => handleInputChange('currentRole', e.target.value)}
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input 
                    id="currentCompany" 
                    value={formData.currentCompany}
                    onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                    className="mt-2" 
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className={`mt-2 ${errors.experience ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="noticePeriod">Notice Period *</Label>
                    <Select value={formData.noticePeriod} onValueChange={(value) => handleInputChange('noticePeriod', value)}>
                      <SelectTrigger className={`mt-2 ${errors.noticePeriod ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select notice period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="1-week">1 week</SelectItem>
                        <SelectItem value="2-weeks">2 weeks</SelectItem>
                        <SelectItem value="1-month">1 month</SelectItem>
                        <SelectItem value="2-months">2 months</SelectItem>
                        <SelectItem value="3-months">3 months</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.noticePeriod && <p className="text-red-500 text-sm mt-1">{errors.noticePeriod}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                  <Input 
                    id="salaryExpectation" 
                    placeholder="e.g., £50,000 - £60,000" 
                    value={formData.salaryExpectation}
                    onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                    className="mt-2" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="skills">Key Skills *</Label>
                  <Textarea 
                    id="skills" 
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className={`mt-2 ${errors.skills ? 'border-red-500' : ''}`}
                    rows={3}
                    placeholder="List your key skills relevant to this position..."
                  />
                  {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                </div>
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
              <div className="space-y-6">
                
                {/* CV Upload */}
                <div>
                  <Label htmlFor="cv">CV/Resume *</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="cv" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${errors.cv ? 'border-red-500' : 'border-gray-300'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {cvFile ? (
                            <>
                              <FileText className="w-8 h-8 mb-2 text-green-500" />
                              <p className="text-sm text-gray-700 font-medium">{cvFile.name}</p>
                              <p className="text-xs text-gray-500">Click to change</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> your CV
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                            </>
                          )}
                        </div>
                        <input 
                          id="cv" 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleCvUpload}
                        />
                      </label>
                    </div>
                    {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
                  </div>
                </div>

                {/* Cover Letter Upload */}
                <div>
                  <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="coverLetter" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${errors.coverLetter ? 'border-red-500' : 'border-gray-300'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {coverLetterFile ? (
                            <>
                              <FileText className="w-8 h-8 mb-2 text-green-500" />
                              <p className="text-sm text-gray-700 font-medium">{coverLetterFile.name}</p>
                              <p className="text-xs text-gray-500">Click to change</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-2 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> cover letter
                              </p>
                              <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                            </>
                          )}
                        </div>
                        <input 
                          id="coverLetter" 
                          type="file" 
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleCoverLetterUpload}
                        />
                      </label>
                    </div>
                    {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="motivation">Why are you interested in this position? *</Label>
                  <Textarea 
                    id="motivation" 
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    className={`mt-2 ${errors.motivation ? 'border-red-500' : ''}`}
                    rows={4}
                    placeholder="Tell us what motivates you to apply for this role..."
                  />
                  {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
                </div>
                
                <div>
                  <Label htmlFor="availability">When can you start? *</Label>
                  <Input 
                    id="availability" 
                    placeholder="e.g., Immediately, 2 weeks notice, etc." 
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className={`mt-2 ${errors.availability ? 'border-red-500' : ''}`}
                  />
                  {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
                
                <div>
                  <Label htmlFor="questions">Questions or Additional Comments</Label>
                  <Textarea 
                    id="questions" 
                    value={formData.questions}
                    onChange={(e) => handleInputChange('questions', e.target.value)}
                    className="mt-2"
                    rows={3}
                    placeholder="Any questions about the role or additional information you'd like to share..."
                  />
                </div>
              </div>
            </Card>

            {/* Terms and Submit */}
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={formData.terms}
                    onCheckedChange={(checked) => handleInputChange('terms', checked)}
                    className={`mt-1 ${errors.terms ? 'border-red-500' : ''}`}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the <Link href="/terms" className="text-orange-500 hover:underline">Terms of Service</Link> and{' '}
                    <Link href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</Link>. I consent to the processing of my personal data for recruitment purposes.
                  </Label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="marketing" 
                    checked={formData.marketing}
                    onCheckedChange={(checked) => handleInputChange('marketing', checked)}
                    className="mt-1" 
                  />
                  <Label htmlFor="marketing" className="text-sm leading-relaxed">
                    I would like to receive updates about similar job opportunities and career advice via email.
                  </Label>
                </div>
                
                <div className="pt-4">
          <Button 
  type="submit"
  size="lg" 
  className="w-full bg-orange-500 hover:bg-orange-600"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
</Button>
                  {/* <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </Button> */}
                </div>
              </div>
            </Card>
          </form>
        </div>
      </section>
    </div>
  );
}