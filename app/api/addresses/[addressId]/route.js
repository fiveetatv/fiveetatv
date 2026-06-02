import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(request, { params }) {
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

    const addressToDelete = userData.addresses.find(addr => addr._id.toString() === addressId);
    if (!addressToDelete) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    const wasDefault = addressToDelete.isDefault;

    userData.addresses = userData.addresses.filter(
      addr => addr._id.toString() !== addressId
    );

    if (wasDefault && userData.addresses.length > 0) {
      userData.addresses[0].isDefault = true;
    }

    await userData.save();

    return NextResponse.json(
      { message: "Address deleted successfully", addresses: userData.addresses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting address:", error);
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    );
  }
}
