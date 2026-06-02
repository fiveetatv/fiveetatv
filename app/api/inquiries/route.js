import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { NextResponse } from "next/server";
import { validateFormData, sanitizeInput, detectSpam, validatePhone, validateEmail } from "@/lib/validation";

const inquirySession = new Map();

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, phone, email, message, type, productSlug } = body;

    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedEmail = sanitizeInput(email);

    if (!sanitizedName || !phone) {
      return NextResponse.json({ error: "Name and Phone are required" }, { status: 400 });
    }

    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      return NextResponse.json({ error: "Name must be between 2 and 50 characters" }, { status: 400 });
    }

    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    if (sanitizedEmail && !validateEmail(sanitizedEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (sanitizedMessage && detectSpam(sanitizedMessage)) {
      return NextResponse.json({ error: "Invalid message detected" }, { status: 400 });
    }

    if (sanitizedMessage && (sanitizedMessage.length < 10 || sanitizedMessage.length > 2000)) {
      return NextResponse.json({ error: "Message must be between 10 and 2000 characters" }, { status: 400 });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const lastInquiry = inquirySession.get(clientIp);
    if (lastInquiry && Date.now() - lastInquiry < 60000) {
      return NextResponse.json({ error: "Please wait before submitting another inquiry" }, { status: 429 });
    }
    inquirySession.set(clientIp, Date.now());

    const inquiry = await Inquiry.create({
      name: sanitizedName,
      phone,
      email: sanitizedEmail,
      message: sanitizedMessage,
      type: type || "consultation",
      productSlug,
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    console.error("Inquiry Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    // This should ideally be protected by admin middleware
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
