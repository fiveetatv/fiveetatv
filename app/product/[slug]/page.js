import { notFound } from "next/navigation";
import PageTransition from "@/components/ui/PageTransition";
import ProductDetails from "@/components/product/ProductDetails";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  await connectDB();
  const product = await Product.findOne({ slug, isVisible: true }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

async function getRelated(currentSlug) {
  const products = await Product.find({ slug: { $ne: currentSlug }, isVisible: true }).limit(2).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: "Product Not Found | Fiveetatv",
    };
  }

  return {
    title: `${product.name} | Fiveetatv`,
    description: `${product.description} - Natural Ayurvedic product by Fiveetatv. ${product.benefits?.join(', ')}. 100% natural, lab-tested formulation.`,
    keywords: [
      product.name,
      "Fiveetatv",
      "Ayurvedic products",
      "herbal supplements",
      "natural wellness",
      product.category || "Ayurvedic medicine",
      "Ayurvedic wellness Delhi",
      "Rahul Gour",
      "Suraj Gaur",
      ...product.ingredients || [],
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: `https://fiveetatv.com/product/${slug}`,
      title: product.name,
      description: product.description,
      images: product.images?.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: product.name,
      })) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images || [],
    },
    alternates: {
      canonical: `https://fiveetatv.com/product/${slug}`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = await getRelated(product.slug);

  return (
    <PageTransition>
      <ProductDetails product={product} relatedProducts={related} />
    </PageTransition>
  );
}
