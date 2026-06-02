import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, phone, password, marketingConsent } = await req.json();
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json({ message: "Phone must be 10 digits" }, { status: 400 });
    }

    await connectDB();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, phone, password: hashed, marketingConsent: Boolean(marketingConsent) });
    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    const res = NextResponse.json({ message: "Registered", user: { name: user.name, email, phone: user.phone, role: user.role } });
    res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
