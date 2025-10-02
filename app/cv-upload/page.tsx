'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, User, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

interface UploadState {
  isUploading: boolean;
  isSuccess: boolean;
  error: string;
  fileName: string;
}

export default function CVUploadPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    isSuccess: false,
    error: '',
    fileName: ''
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setUploadState(prev => ({
          ...prev,
          error: 'Please upload a PDF, DOC, or DOCX file'
        }));
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadState(prev => ({
          ...prev,
          error: 'File size must be less than 5MB'
        }));
        return;
      }

      setCvFile(file);
      setUploadState(prev => ({
        ...prev,
        error: '',
        fileName: file.name
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!cvFile) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please select your CV file'
      }));
      return;
    }

    if (!formData.fullName || !formData.email) {
      setUploadState(prev => ({
        ...prev,
        error: 'Please fill in required fields (Name and Email)'
      }));
      return;
    }

    setUploadState(prev => ({
      ...prev,
      isUploading: true,
      error: ''
    }));

    try {
      const submitData = new FormData();
      submitData.append('cv', cvFile);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('message', formData.message);

      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          isSuccess: true,
          fileName: result.originalName
        }));
        
        // Reset form after success
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        setCvFile(null);
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setUploadState({
            isUploading: false,
            isSuccess: false,
            error: '',
            fileName: ''
          });
        }, 5000);
      } else {
        setUploadState(prev => ({
          ...prev,
          isUploading: false,
          error: result.error || 'Upload failed. Please try again.'
        }));
      }
    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        isUploading: false,
        error: 'Network error. Please try again.'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/jobs">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Jobs
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your CV</h1>
            <p className="text-gray-600">
              Cannot find the right role? Upload your CV and we will match you with suitable positions.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Success Message */}
            {uploadState.isSuccess && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">CV Uploaded Successfully!</h3>
                    <p className="text-green-700">
                      Thank you {formData.fullName}! We have received your CV and will contact you if we find matching opportunities.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Error Message */}
            {uploadState.error && (
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium">{uploadState.error}</p>
                </div>
              </Card>
            )}

            {/* Personal Information */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4" />
                    <span>Full Name *</span>
                  </Label>
                  <Input 
                    id="fullName" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="flex items-center space-x-2 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center space-x-2 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+44 1234 567890"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2">Additional Message (Optional)</Label>
                  <textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={4}
                    placeholder="Tell us about your career preferences, desired roles, or anything else we should know..."
                  />
                </div>
              </div>
            </Card>

            {/* CV Upload Section */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your CV</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    CV/Resume (PDF, DOC, DOCX) *
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="cv-upload"
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        cvFile 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                        {cvFile ? (
                          <>
                            <FileText className="w-10 h-10 mb-3 text-green-500" />
                            <p className="text-sm font-medium text-gray-700 mb-1">{cvFile.name}</p>
                            <p className="text-xs text-gray-500">Click to change file</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, DOCX (MAX. 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="cv-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                {/* File Requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">File Requirements:</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Supported formats: PDF, DOC, DOCX</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• File should be your current CV/resume</li>
                    <li>• Include your contact information in the file</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Submit Section */}
            <Card className="p-8">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  By submitting your CV, you agree to our{' '}
                  <Link href="/privacy" className="text-orange-500 hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  and consent to being contacted about relevant career opportunities.
                </p>
                
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={uploadState.isUploading || uploadState.isSuccess}
                >
                  {uploadState.isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Uploading CV...
                    </>
                  ) : uploadState.isSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      CV Uploaded Successfully!
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload CV & Submit
                    </>
                  )}
                </Button>

              
              </div>
            </Card>
          </form>
        </div>
      </section>
    </div>
  );
}