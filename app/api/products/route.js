import { revalidateTag } from 'next/cache';
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { seedProductsIfEmpty } from "@/lib/seed";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req) {
  await connectDB();
  await seedProductsIfEmpty();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const includeAll = searchParams.get("includeAll") === "true";
  
  if (slug) {
    const product = await Product.findOne({ slug });
    return NextResponse.json({ product });
  }
  
  const query = includeAll ? {} : { isVisible: true };
  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  
  // No cache for admin
  return NextResponse.json({ products });
}

export async function POST(req) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const payload = await req.json();
  if (!payload.name || !payload.slug) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }
  const product = await Product.create(payload);
  revalidateTag('products');
  return NextResponse.json({ product }, { status: 201 });
}
