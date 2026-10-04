import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const MAX_LENGTH = { name: 120, email: 200, phone: 40, service: 120, message: 5000 };

/** Escapes user input before it goes into the HTML email body. */
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strips line breaks and quotes so a value can't inject extra mail headers. */
const headerSafe = (value: string) => value.replace(/[\r\n"<>]/g, " ").trim();

type Payload = { type: "contact" | "newsletter"; name: string; email: string; phone: string; service: string; message: string };

async function readPayload(req: Request): Promise<Payload> {
  const contentType = req.headers.get("content-type") || "";
  let raw: Record<string, unknown> = {};
  if (contentType.includes("application/json")) {
    raw = await req.json().catch(() => ({}));
  } else if (contentType.includes("form")) {
    const formData = await req.formData().catch(() => null);
    if (formData) raw = Object.fromEntries(formData.entries());
  }
  const str = (key: keyof typeof MAX_LENGTH) => (typeof raw[key] === "string" ? (raw[key] as string).trim().slice(0, MAX_LENGTH[key]) : "");
  return {
    type: raw.type === "newsletter" ? "newsletter" : "contact",
    name: str("name"),
    email: str("email"),
    phone: str("phone"),
    service: str("service"),
    message: str("message"),
  };
}

function buildEmail(p: Payload) {
  if (p.type === "newsletter") {
    return {
      subject: `[Newsletter] New subscriber - ${siteConfig.name}`,
      html: `<p>New newsletter subscriber: <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></p>`,
    };
  }
  const service = siteConfig.services.find((s) => s.slug === p.service)?.title || p.service || "General Inquiry";
  return {
    subject: `[New Lead] Inbound Inquiry from ${headerSafe(p.name)} - ${siteConfig.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #1a1817; border-bottom: 2px solid #73eb0d; padding-bottom: 8px;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(p.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(p.email)}">${escapeHtml(p.email)}</a></p>
        ${p.phone ? `<p><strong>Phone:</strong> ${escapeHtml(p.phone)}</p>` : ""}
        <p><strong>Requested Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f6f4f3; padding: 15px; border-radius: 8px; color: #333;">
          ${escapeHtml(p.message).replace(/\n/g, "<br>")}
        </div>
        <p style="font-size: 11px; color: #888; margin-top: 20px;">Delivered via ${siteConfig.name} website contact form</p>
      </div>`,
  };
}

export async function POST(req: Request) {
  const payload = await readPayload(req);

  if (!EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (payload.type === "contact" && (!payload.name || !payload.message)) {
    return NextResponse.json({ error: "Please fill in all required fields (Name, Email, Message)." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  const recipient = process.env.CONTACT_EMAIL || siteConfig.contact.email;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Without SMTP settings nothing can be delivered – fail loudly instead of pretending it was sent.
    console.error("Contact form: SMTP_HOST / SMTP_USER / SMTP_PASS are not set; message not delivered.", {
      type: payload.type,
      email: payload.email,
    });
    return NextResponse.json(
      { error: `Our mail service is temporarily unavailable. Please email us directly at ${siteConfig.contact.email}.` },
      { status: 503 },
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const { subject, html } = buildEmail(payload);
    await transporter.sendMail({
      from: `"${headerSafe(payload.name) || siteConfig.name}" <${SMTP_USER}>`,
      replyTo: payload.email,
      to: recipient,
      subject,
      html,
    });

    return NextResponse.json({ success: true, message: "Your message has been sent successfully! Our team will contact you shortly." });
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return NextResponse.json(
      { error: `Failed to send message. Please try again or reach us directly at ${siteConfig.contact.email}.` },
      { status: 500 },
    );
  }
}
