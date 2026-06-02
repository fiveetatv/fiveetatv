import crypto from "crypto";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartItems, amount, address } = await req.json();
    
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ message: "Razorpay API key secret is missing in environment variables" }, { status: 500 });
    }

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
    }

    await connectDB();
    const order = await Order.create({
      user: user.id,
      items: cartItems,
      amount,
      address,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentMethod: "razorpay",
      status: "placed",
    });
    return NextResponse.json({ message: "Payment verified", order });
  } catch (error) {
    console.error("Error in verify route:", error);
    return NextResponse.json({ message: error.message || String(error) }, { status: 500 });
  }
}
