import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const orders = await Order.find({ user: user.id }).sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}
