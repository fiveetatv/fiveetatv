import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req) {
  const tokenUser = await getCurrentUser();
  if (!tokenUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { name, phone } = await req.json();
  if (!name || !phone) {
    return NextResponse.json({ message: "Name and phone are required" }, { status: 400 });
  }

  await connectDB();
  const user = await User.findByIdAndUpdate(
    tokenUser.id,
    { name, phone },
    { returnDocument: "after" }
  ).select("-password");

  return NextResponse.json({ user });
}
