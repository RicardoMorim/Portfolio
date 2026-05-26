import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import rateLimit from "@/lib/rate-limit";
import { headers } from "next/headers";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(req: Request) {
  try {
    // Get IP address
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Check rate limit for this IP
    try {
      await limiter.check(5, ip); // 5 requests per minute per IP
    } catch {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const { name, email, subject, message } = await req.json();

    // Basic input validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    let transporter;
    let testAccount: { user?: string; pass?: string } | null = null;

    // If EMAIL_USER/EMAIL_PASS are not set, fall back to an ethereal test account for local testing
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }

    const sender = testAccount?.user ?? process.env.EMAIL_USER;
    const mailOptions = {
      from: sender,
      to: sender,
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    // If we used an ethereal test account, return the preview URL so the developer can inspect the message
    if (testAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      return NextResponse.json({ message: "Email sent (ethereal)", previewUrl });
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
