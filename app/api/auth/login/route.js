import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";
import { seedDefaultAdmin } from "@/lib/seed";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
    await connectDB();
    await seedDefaultAdmin();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email not found" }, { status: 401 });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });
    const res = NextResponse.json({
      message: "Logged in",
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
    res.cookies.set("token", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
    return res;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
