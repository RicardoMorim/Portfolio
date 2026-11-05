import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import rateLimit from "@/lib/rate-limit";
import { headers } from "next/headers";
import { CONTACT_EMAIL } from "@/content/site";

const SMTP_HOST = "smtp-relay.brevo.com";
const SMTP_PORT = 587;

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

const MAX_LENGTHS = { name: 120, email: 254, subject: 200, message: 5000 };
type ContactFields = Record<keyof typeof MAX_LENGTHS, string>;

function isValidLength(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

function parseFields(body: unknown): ContactFields | null {
  if (typeof body !== "object" || body === null) return null;
  const { name, email, subject, message } = body as Record<string, unknown>;
  const isComplete =
    isValidLength(name, MAX_LENGTHS.name) &&
    isValidLength(email, MAX_LENGTHS.email) &&
    isValidLength(subject, MAX_LENGTHS.subject) &&
    isValidLength(message, MAX_LENGTHS.message);
  return isComplete ? { name, email, subject, message } : null;
}

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

    const fields = parseFields(await req.json().catch(() => null));
    if (!fields) {
      return NextResponse.json(
        { error: "Missing or invalid fields" },
        { status: 400 }
      );
    }
    const { name, email, subject, message } = fields;

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

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const isGmail = user?.endsWith("@gmail.com") ?? false;

    if (!user || !pass) {
      // A visitor must never see "sent" for a message nobody will receive.
      if (process.env.NODE_ENV === "production") {
        console.error("Contact form: EMAIL_USER or EMAIL_PASS is not configured");
        return NextResponse.json(
          { error: "Contact form is unavailable" },
          { status: 503 }
        );
      }

      // Local development only: an ethereal inbox lets the form be tested end to end.
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
      transporter = isGmail
        ? nodemailer.createTransport({ service: "Gmail", auth: { user, pass } })
        : nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: false,
            requireTLS: true,
            auth: { user, pass },
          });
    }

    // Gmail hides mail a mailbox sends to itself through a forward, so it writes to its own inbox.
    const mailbox = testAccount?.user ?? (isGmail && user ? user : CONTACT_EMAIL);
    const mailOptions = {
      from: { name: "Portfolio contact form", address: mailbox },
      to: mailbox,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Subject: ${subject}`, "", message].join("\n"),
    };

    const info = await transporter.sendMail(mailOptions);

    // If we used an ethereal test account, return the preview URL so the developer can inspect the message
    if (testAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      return NextResponse.json({ message: "Email sent (ethereal)", previewUrl });
    }

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err: unknown) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
