import { jobApplicationSchema } from "@/lib/schemas/validations";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
//import { jobApplicationSchema } from "@/components/JobApplicationClient";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    console.log("API route called - processing job application");
    
    // Parse the form data
    const formData = await req.formData();
    console.log("Form data parsed");
    
    // Extract form fields
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      currentRole: formData.get('currentRole') as string,
      currentCompany: formData.get('currentCompany') as string,
      experience: formData.get('experience') as string,
      noticePeriod: formData.get('noticePeriod') as string,
      salaryExpectation: formData.get('salaryExpectation') as string,
      skills: formData.get('skills') as string,
      motivation: formData.get('motivation') as string,
      availability: formData.get('availability') as string,
      questions: formData.get('questions') as string,
      terms: formData.get('terms') === 'true',
      marketing: formData.get('marketing') === 'true',
      jobId: formData.get('jobId') as string,
      jobTitle: formData.get('jobTitle') as string,
    };

    console.log("Extracted data:", {
      ...data,
      terms: data.terms,
      marketing: data.marketing
    });

    // Extract files
    const cvFile = formData.get('cv') as File | null;
    const coverLetterFile = formData.get('coverLetter') as File | null;
    console.log("Files extracted - CV:", cvFile?.name, "Cover Letter:", coverLetterFile?.name);

    // Validate the data using Zod
    const validatedData = jobApplicationSchema.parse(data);
    console.log("Zod validation passed");

    // Validate that CV file is present
    if (!cvFile) {
      console.log("CV file validation failed");
      return NextResponse.json(
        { success: false, error: "CV/Resume is required" },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("Email environment variables not configured");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    console.log("Creating email transporter");
    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("Email transporter verified");
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      return NextResponse.json(
        { success: false, error: "Email service configuration error" },
        { status: 500 }
      );
    }

    console.log("Converting files to attachments");
    // Convert files to attachments
    const attachments = [];
    
    if (cvFile && cvFile.size > 0) {
      const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: `CV_${validatedData.firstName}_${validatedData.lastName}_${cvFile.name}`,
        content: cvBuffer,
        contentType: cvFile.type,
      });
      console.log("CV attachment created");
    }

    if (coverLetterFile && coverLetterFile.size > 0) {
      const coverLetterBuffer = Buffer.from(await coverLetterFile.arrayBuffer());
      attachments.push({
        filename: `CoverLetter_${validatedData.firstName}_${validatedData.lastName}_${coverLetterFile.name}`,
        content: coverLetterBuffer,
        contentType: coverLetterFile.type,
      });
      console.log("Cover letter attachment created");
    }

    console.log("Preparing email content");
    // Prepare email content
    const mailOptions = {
      from: validatedData.email,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Job Application: ${data.jobTitle} - ${validatedData.firstName} ${validatedData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Job Application Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Job Details</h3>
            <p><strong>Position:</strong> ${data.jobTitle}</p>
            <p><strong>Job ID:</strong> ${data.jobId}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Personal Information</h3>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Address:</strong> ${validatedData.address}</p>
            <p><strong>City:</strong> ${validatedData.city}</p>
            <p><strong>Country:</strong> ${validatedData.country}</p>
          </div>

          <!-- Rest of your email template remains the same -->
        </div>
      `,
      attachments: attachments,
    };

    console.log("Sending email...");
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Job application submission error:", error);
    
    if (error instanceof z.ZodError) {
      console.error("Zod validation errors:", error.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: "Validation failed",
          details: error.errors 
        },
        { status: 400 }
      );
    }

    // More specific error handling
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }

    return NextResponse.json(
      { success: false, error: "Failed to submit application. Please try again later." },
      { status: 500 }
    );
  }
}