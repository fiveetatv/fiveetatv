import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { addressId } = await params;

    await connectDB();

    const userData = await User.findById(user.id);
    if (!userData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    userData.addresses.forEach(addr => addr.isDefault = false);

    const address = userData.addresses.id(addressId);
    if (!address) {
      return NextResponse.json(
        { error: "Address not found" },
        { status: 404 }
      );
    }

    address.isDefault = true;
    await userData.save();

    return NextResponse.json(
      { message: "Default address updated successfully", addresses: userData.addresses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error setting default address:", error);
    return NextResponse.json(
      { error: "Failed to set default address" },
      { status: 500 }
    );
  }
}
