import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    console.log("Subscription API route called");

    const formData = await req.formData();
    
    // Extract form data
    const email = formData.get('email') as string;
    const type = formData.get('type') as string || 'newsletter';
    const source = formData.get('source') as string || 'unknown';

    console.log("Received subscription request:", { email, type, source });

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      console.error("Email environment variables not configured");
      
      // For subscription, we might still want to proceed even if email fails
      // In a real app, you'd save to a database here
      
      return NextResponse.json({
        success: true,
        message: "Subscription received successfully",
        email: email,
        note: "Email notifications not configured"
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

    // Prepare email content
    const mailOptions = {
      from: `"Newsletter Subscription" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `📧 New Newsletter Subscription - ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(135deg, #f97316, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .field { margin-bottom: 15px; }
                .field-label { font-weight: bold; color: #f97316; display: block; margin-bottom: 5px; }
                .field-value { color: #555; }
                .subscription-type { background: #e7f3ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
                .timestamp { color: #666; font-size: 14px; text-align: center; margin-top: 20px; }
                .action-button { display: inline-block; background: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📧 New Newsletter Subscription</h1>
                <p>A new user has subscribed to your newsletter</p>
            </div>
            
            <div class="content">
                <div class="info-card">
                    <h2 style="color: #f97316; margin-top: 0;">Subscriber Information</h2>
                    
                    <div class="field">
                        <span class="field-label">Email Address:</span>
                        <span class="field-value">
                            <a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-size: 18px; font-weight: 500;">${email}</a>
                        </span>
                    </div>
                    
                    <div class="field">
                        <span class="field-label">Subscription Type:</span>
                        <span class="field-value">${type}</span>
                    </div>
                    
                    <div class="field">
                        <span class="field-label">Source:</span>
                        <span class="field-value">${source}</span>
                    </div>
                </div>

                <div class="subscription-type">
                    <h3 style="color: #f97316; margin-top: 0;">🎯 Subscription Details</h3>
                    <p><strong>Type:</strong> ${type === 'newsletter' ? 'Newsletter Updates' : type}</p>
                    <p><strong>Source Page:</strong> ${source}</p>
                    <p><strong>Subscription Time:</strong> ${new Date().toLocaleString('en-GB', { 
                        timeZone: 'Europe/London',
                        dateStyle: 'full', 
                        timeStyle: 'medium' 
                    })}</p>
                </div>

                <div style="text-align: center; margin-top: 25px;">
                    <p style="color: #666; font-size: 14px;">
                        This subscriber will receive your newsletter and updates about new resources.<br>
                        Make sure to add them to your mailing list.
                    </p>
                    <a href="mailto:${email}" class="action-button">
                        Send Welcome Email
                    </a>
                </div>

                <div class="timestamp">
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                    <p>Automated subscription notification • ${new Date().getFullYear()}</p>
                </div>
            </div>
        </body>
        </html>
      `,
    };

    console.log("Sending subscription notification email...");
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Subscription email sent successfully");

    // In a real application, you would also:
    // 1. Save to your newsletter database
    // 2. Add to your email marketing service (Mailchimp, etc.)
    // 3. Send welcome email to the subscriber

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter",
      email: email,
      type: type,
      source: source,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Subscription error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to process subscription. Please try again later.",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to handle preflight or provide info
export async function GET() {
  return NextResponse.json({
    message: "Newsletter Subscription API",
    requiredFields: ["email"],
    optionalFields: ["type", "source"]
  });
}