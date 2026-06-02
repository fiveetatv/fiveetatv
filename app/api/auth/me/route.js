import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const tokenUser = await getCurrentUser();
  if (!tokenUser) return NextResponse.json({ user: null }, { status: 200 });

  await connectDB();
  const user = await User.findById(tokenUser.id).select("-password");
  return NextResponse.json({ user });
}

export async function DELETE() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("token", "", { maxAge: 0, path: "/" });
  return res;
}
