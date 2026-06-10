import Product from "@/models/Product";
import User from "@/models/User";
import { productsSeed } from "@/lib/data";
import { hashPassword } from "@/lib/auth";

export async function seedProductsIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`[SEED] Database already contains ${count} products. Skipping seed.`);
    return;
  }

  console.log(`[SEED] Database is empty. Starting seed with ${productsSeed.length} products from data.js`);
  
  for (const item of productsSeed) {
    console.log(`[SEED] Syncing: ${item.slug}`);
    console.log(`[SEED]   data.js images[0]: ${item.images?.[0]?.substring(0, 80)}...`);
    
    const result = await Product.findOneAndUpdate(
      { slug: item.slug },
      { $set: item },
      { upsert: true, returnDocument: 'after' }
    );
    
    console.log(`[SEED]   DB result images[0]: ${result?.images?.[0]?.substring(0, 80)}...`);
    console.log(`[SEED]   Match: ${item.images?.[0] === result?.images?.[0] ? '✅ YES' : '❌ NO - MISMATCH!'}`);
  }
  
  console.log(`[SEED] ✅ Seed complete`);
}

export async function seedDefaultAdmin() {
  const email = "admin@fiveetatv.com";
  const existing = await User.findOne({ email });
  if (existing) {
    if (!existing.phone) {
      existing.phone = "9318445297";
      await existing.save();
    }
    return existing;
  }

  const password = await hashPassword("admin123");
  return User.create({
    name: "Fiveetatv Admin",
    email,
    phone: "9318445297",
    password,
    role: "admin",
  });
}
