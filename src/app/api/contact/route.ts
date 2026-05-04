import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, service, message } = body as Record<string, string>;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 422 });
  }
  if (!email?.trim() || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 422 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const recipients = process.env.CONTACT_TO ?? "thecyberbite@gmail.com";

  const html = `
    <div style="font-family:monospace;background:#000;color:#fff;padding:32px;border:1px solid #222;">
      <h2 style="margin:0 0 24px;font-size:18px;letter-spacing:0.05em;">NEW CONSULTATION REQUEST</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#666;width:120px;">NAME</td><td style="padding:8px 0;">${name}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">EMAIL</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#fff;">${email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666;">SERVICE</td><td style="padding:8px 0;">${service || "Not specified"}</td></tr>
        <tr><td style="padding:8px 0;color:#666;vertical-align:top;">MESSAGE</td><td style="padding:8px 0;">${message || "—"}</td></tr>
      </table>
      <p style="margin:24px 0 0;color:#444;font-size:11px;">Sent via TheCyberBite.com contact form</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"The Cyber Bite" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `Consultation Request — ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
