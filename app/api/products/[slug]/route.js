import { revalidateTag } from 'next/cache';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_, { params }) {
  await connectDB();
  const { slug } = await params;
  const product = await Product.findOne({ slug });
  if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PUT(req, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    if (user.role !== "admin") {
      return NextResponse.json({ message: "Not authorized - admin only" }, { status: 403 });
    }
    
    await connectDB();
    const { slug } = await params;
    const update = await req.json();
    
    console.log("Updating product:", slug);
    console.log("Update data:", JSON.stringify(update));
    
    const product = await Product.findOneAndUpdate(
      { slug }, 
      { $set: update }, 
      { returnDocument: "after", new: true }
    );
    
    if (!product) {
      return NextResponse.json({ message: "Product not found", slug }, { status: 404 });
    }
    
    console.log("Updated product:", product.name);
    
    revalidateTag('products');
    return NextResponse.json({ 
      message: "Product updated",
      product: {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        discountPrice: product.discountPrice,
        description: product.description,
        featureImages: product.featureImages,
      }
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { slug } = await params;
  await Product.findOneAndDelete({ slug });
  revalidateTag('products');
  return NextResponse.json({ message: "Deleted" });
}
