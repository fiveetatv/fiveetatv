import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { revalidateTag } from 'next/cache';
import { validateFormData, sanitizeInput, detectSpam } from "@/lib/validation";

const reviewSession = new Map();

export async function POST(request) {
  try {
    const { productId, rating, comment, name, image } = await request.json();

    const validation = validateFormData(
      { productId, rating, comment, name },
      {
        productId: { required: true },
        rating: { required: true },
        comment: { required: true, minLength: 10, maxLength: 1000, spamCheck: true },
        name: { required: true, minLength: 2, maxLength: 50 },
      }
    );

    if (!validation.isValid) {
      return NextResponse.json(
        { error: Object.values(validation.errors)[0] },
        { status: 400 }
      );
    }

    if (detectSpam(comment) || detectSpam(name)) {
      return NextResponse.json(
        { error: "Invalid submission detected" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const lastReview = reviewSession.get(clientIp);
    if (lastReview && Date.now() - lastReview < 30000) {
      return NextResponse.json(
        { error: "Please wait before submitting another review" },
        { status: 429 }
      );
    }
    reviewSession.set(clientIp, Date.now());

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    await connectDB();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Add new review
    product.reviews.push({
      userId: user.id,
      name,
      image: image || "", // Use provided image URL if any
      rating,
      comment,
      approved: true, // Auto-approve reviews
      createdAt: new Date(),
    });

    await product.save();

    revalidateTag('products');

    return NextResponse.json(
      { message: "Review submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
