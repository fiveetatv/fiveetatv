import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export default async function sitemap() {
  await connectDB();
  const products = await Product.find({ isVisible: true }).lean();
  
  const baseUrl = "https://fiveetatv.com";
  
  // Extract unique categories dynamically from products
  const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/collection`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const categoryPages = uniqueCategories.map((category) => ({
    url: `${baseUrl}/collections/${category}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
