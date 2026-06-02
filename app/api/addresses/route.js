import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();

    const userData = await User.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ addresses: userData.addresses || [] });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { fullName, phone, addressLine, city, state, pincode, isDefault } = await request.json();

    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const userData = await User.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (isDefault) {
      userData.addresses.forEach(addr => addr.isDefault = false);
    }

    userData.addresses.push({
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      isDefault: isDefault || userData.addresses.length === 0,
    });

    await userData.save();

    return NextResponse.json(
      { message: "Address added successfully", addresses: userData.addresses },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding address:", error);
    return NextResponse.json(
      { error: "Failed to add address" },
      { status: 500 }
    );
  }
}
