import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, projectType, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the email transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this if using another provider (e.g., Yahoo, Outlook)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email 1: Send the lead to yourself
    const mailToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sending to yourself
      subject: `New Portfolio Contact from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    // Email 2: Send auto-reply to the user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email, // Sending back to the user
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for getting in touch! I have received your message regarding <strong>${projectType}</strong>.</p>
        <p>I will get back to you within 24 hours.</p>
        <br/>
        <p>Best regards,<br/>Yash Sharma</p>
        <p><small><em>This is an automated response. Please do not reply directly to this email.</em></small></p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailToYou),
      transporter.sendMail(mailToUser)
    ]);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
