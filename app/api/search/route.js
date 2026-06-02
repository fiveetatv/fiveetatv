import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const sanitizedQuery = query.replace(/[<>]/g, "").slice(0, 100);

    await connectDB();

    const products = await Product.find({
      isVisible: true,
      $or: [
        { name: { $regex: sanitizedQuery, $options: "i" } },
        { description: { $regex: sanitizedQuery, $options: "i" } },
        { category: { $regex: sanitizedQuery, $options: "i" } },
      ],
    }).limit(20).lean();

    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
