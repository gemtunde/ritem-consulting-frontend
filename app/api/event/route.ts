import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: data.email,
    to: process.env.EMAIL_RECEIVER,
    subject: "New Event Registration",
    html: `
      <h2>New Event </h2>
      <p><strong> Event Name:</strong> ${data.name}</p>
      <p><strong> Full Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Nationality:</strong> ${data.nationality}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong> ${data.message || "N/A"}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
