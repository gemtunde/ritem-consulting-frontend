import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    console.log("CV Upload API route called");

    const formData = await req.formData();
    
    // Extract form data
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const cvFile = formData.get('cv') as File;

    console.log("Received CV upload request from:", fullName, email);

    // Validate required fields
    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Full name and email are required" },
        { status: 400 }
      );
    }

    if (!cvFile) {
      return NextResponse.json(
        { success: false, error: "No CV file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(cvFile.type)) {
      return NextResponse.json(
        { success: false, error: "Please upload a PDF, DOC, or DOCX file" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (cvFile.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("Email environment variables not configured");
      
      // Even if email fails, we can still return success for the upload
      // In a real application, you might want to save to database here
      
      return NextResponse.json({
        success: true,
        message: "CV received successfully (email notifications not configured)",
        originalName: cvFile.name,
        size: cvFile.size,
      });
    }

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
      console.log("Email transporter verified successfully");
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      return NextResponse.json(
        { success: false, error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Convert file to buffer for attachment
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    // Prepare email content
    const mailOptions = {
      from: `"CV Upload" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `New CV Uploaded - ${fullName} - ${cvFile.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #f97316, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .field { margin-bottom: 15px; }
                .field-label { font-weight: bold; color: #f97316; display: block; margin-bottom: 5px; }
                .field-value { color: #555; }
                .file-info { background: #e7f3ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
                .timestamp { color: #666; font-size: 14px; text-align: center; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📄 New CV Received</h1>
                <p>A new candidate has uploaded their CV through the website</p>
            </div>
            
            <div class="content">
                <div class="info-card">
                    <h2 style="color: #f97316; margin-top: 0;">Candidate Information</h2>
                    
                    <div class="field">
                        <span class="field-label">Full Name:</span>
                        <span class="field-value">${fullName}</span>
                    </div>
                    
                    <div class="field">
                        <span class="field-label">Email Address:</span>
                        <span class="field-value">
                            <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a>
                        </span>
                    </div>
                    
                    ${phone ? `
                    <div class="field">
                        <span class="field-label">Phone Number:</span>
                        <span class="field-value">
                            <a href="tel:${phone}" style="color: #7c3aed; text-decoration: none;">${phone}</a>
                        </span>
                    </div>
                    ` : ''}
                    
                    ${message ? `
                    <div class="field">
                        <span class="field-label">Additional Message:</span>
                        <div class="field-value" style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 5px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div class="file-info">
                    <h3 style="color: #f97316; margin-top: 0;">📎 CV File Details</h3>
                    <p><strong>File Name:</strong> ${cvFile.name}</p>
                    <p><strong>File Type:</strong> ${cvFile.type}</p>
                    <p><strong>File Size:</strong> ${(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p><strong>Upload Time:</strong> ${new Date().toLocaleString('en-GB', { 
                        timeZone: 'Europe/London',
                        dateStyle: 'full', 
                        timeStyle: 'medium' 
                    })}</p>
                </div>

                <div style="text-align: center; margin-top: 25px;">
                    <p style="color: #666; font-size: 14px;">
                        This CV was automatically uploaded through the career portal.<br>
                        Please review the attached file and contact the candidate if suitable opportunities are available.
                    </p>
                </div>

                <div class="timestamp">
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p>Automated message sent on behalf of ${fullName}</p>
                </div>
            </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `CV_${fullName.replace(/\s+/g, '_')}_${cvFile.name}`,
          content: cvBuffer,
          contentType: cvFile.type,
        },
      ],
    };

    console.log("Sending email notification...");
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // In a real application, you would also:
    // 1. Save to database
    // 2. Upload to cloud storage (AWS S3, etc.)
    // 3. Trigger other workflows

    return NextResponse.json({
      success: true,
      message: "CV uploaded successfully and notification sent",
      originalName: cvFile.name,
      size: cvFile.size,
      candidate: {
        name: fullName,
        email: email,
        phone: phone
      }
    });

  } catch (error) {
    console.error("CV upload error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to upload CV. Please try again later.",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to handle preflight or provide info
export async function GET() {
  return NextResponse.json({
    message: "CV Upload API",
    allowedFormats: ["PDF", "DOC", "DOCX"],
    maxSize: "5MB",
    requiredFields: ["fullName", "email", "cv"]
  });
}