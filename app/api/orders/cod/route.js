import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { cartItems, amount, address } = await req.json();
    if (!cartItems?.length || !amount) {
      return NextResponse.json({ message: "Missing order details" }, { status: 400 });
    }
    if (!address?.fullName || !address?.phone || !address?.addressLine) {
      return NextResponse.json({ message: "Address details are required" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.create({
      user: user.id,
      items: cartItems,
      amount,
      address,
      paymentMethod: "cod",
      status: "placed",
      orderId: `COD-${Date.now()}`,
    });

    return NextResponse.json({ message: "COD order placed", order });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
