import { NextResponse } from "next/server";
import { comparePassword, getCurrentUser, hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req) {
  try {
    const tokenUser = await getCurrentUser();
    if (!tokenUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return NextResponse.json({ message: "Invalid password input" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(tokenUser.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const valid = await comparePassword(currentPassword, user.password);
    if (!valid) return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 });

    const hashedPassword = await hashPassword(newPassword);
    await User.updateOne({ _id: tokenUser.id }, { $set: { password: hashedPassword } });

    return NextResponse.json({ message: "Password updated" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ message: error.message || "Failed to update password" }, { status: 500 });
  }
}
