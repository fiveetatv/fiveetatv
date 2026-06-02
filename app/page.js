import HomeSections from "@/components/home/HomeSections";
import PageTransition from "@/components/ui/PageTransition";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { seedProductsIfEmpty } from "@/lib/seed";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fiveetatv | Premium Ayurvedic Wellness Products in Delhi, India",
  description: "Fiveetatv - Premium Ayurvedic wellness brand founded by Rahul Gour & Suresh Gaur in Delhi, India. Shop natural Ayurvedic products for sugar balance, digestive health, and overall wellness. 100% natural, lab-tested formulations.",
  keywords: [
    "Fiveetatv",
    "Fiveeta",
    "founders of Fiveetatv",
    "founders of Fiveeta",
    "Ayurvedic products",
    "Ayurveda India",
    "herbal supplements",
    "natural wellness",
    "Ayurvedic medicine",
    "sugar balance",
    "digestive health",
    "Ayurvedic wellness Delhi",
    "Rahul Gour",
    "Suresh Gaur",
    "traditional Ayurveda",
    "herbal remedies",
    "Ayurvedic formulations",
    "natural health products",
    "Ayurvedic store",
    "herbal medicine India",
    "Ayurvedic supplements",
    "wellness products"
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fiveetatv.com",
    title: "Fiveetatv | Premium Ayurvedic Wellness Products",
    description: "Premium Ayurvedic wellness brand founded by Rahul Gour & Suresh Gaur. Natural products for sugar balance, digestive health, and overall wellness.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Fiveetatv - Premium Ayurvedic Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fiveetatv | Premium Ayurvedic Wellness Products",
    description: "Premium Ayurvedic wellness brand founded by Rahul Gour & Suresh Gaur. Natural products for sugar balance, digestive health, and overall wellness.",
    images: ["/assets/logo.png"],
  },
};

async function getProducts() {
  console.log("\n========== [HOME PAGE] getProducts() START ==========");
  
  console.log("[HOME] Step 1: Connecting to DB...");
  await connectDB();
  
  console.log("[HOME] Step 2: Running seed (sync data.js → MongoDB)...");
  await seedProductsIfEmpty();
  
  console.log("[HOME] Step 3: Querying products from MongoDB...");
  const products = await Product.find({ isVisible: true }).lean();
  
  console.log(`[HOME] Step 4: Found ${products.length} products from MongoDB:`);
  for (const p of products) {
    console.log(`[HOME]   📦 ${p.slug}`);
    console.log(`[HOME]      images[0]: ${p.images?.[0]?.substring(0, 80)}...`);
    console.log(`[HOME]      images count: ${p.images?.length || 0}`);
  }
  
  // Reorder products to put MadhuCurex Capsules at the end
  const capsuleProduct = products.find(p => p.name.includes("MadhuCurex Capsules"));
  const otherProducts = products.filter(p => !p.name.includes("MadhuCurex Capsules"));
  const sortedProducts = capsuleProduct ? [...otherProducts, capsuleProduct] : products;
  
  const result = JSON.parse(JSON.stringify(sortedProducts));
  console.log(`[HOME] Step 5: Returning ${result.length} products to component`);
  console.log("========== [HOME PAGE] getProducts() END ==========\n");
  
  return result;
}

export default async function Home() {
  const products = await getProducts();
  return (
    <PageTransition>
      <HomeSections products={products} />
    </PageTransition>
  );
}
