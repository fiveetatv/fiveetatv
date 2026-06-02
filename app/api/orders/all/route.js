import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const orders = await Order.find().populate("user", "name email phone").sort({ createdAt: -1 });
  return NextResponse.json({ orders });
}

export async function PUT(req) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { orderId, status } = await req.json();
  const updated = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { returnDocument: "after" }
  );
  return NextResponse.json({ order: updated });
}
