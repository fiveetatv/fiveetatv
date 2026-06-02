import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

// Import productsSeed
import { productsSeed } from "../lib/data.js";

async function forceSync() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!\n");

    const db = mongoose.connection.db;
    const collection = db.collection("products");

    // First, let's see what's currently in the DB
    const existing = await collection.find({}).toArray();
    console.log(`📦 Found ${existing.length} products in MongoDB:\n`);
    for (const p of existing) {
      console.log(`  - ${p.slug}`);
      console.log(`    images[0]: ${p.images?.[0]?.substring(0, 80)}...`);
    }

    console.log("\n🔄 Force updating from data.js...\n");

    for (const item of productsSeed) {
      const result = await collection.updateOne(
        { slug: item.slug },
        { $set: item },
        { upsert: true }
      );

      if (result.matchedCount > 0) {
        console.log(`  ✅ Updated: ${item.slug} (modified: ${result.modifiedCount})`);
      } else {
        console.log(`  🆕 Created: ${item.slug}`);
      }
      console.log(`     images[0]: ${item.images?.[0]?.substring(0, 80)}...`);
    }

    // Verify
    console.log("\n📋 Verifying after update:\n");
    const updated = await collection.find({}).toArray();
    for (const p of updated) {
      console.log(`  - ${p.slug}`);
      console.log(`    images[0]: ${p.images?.[0]?.substring(0, 80)}...`);
    }

    console.log("\n✅ Done! Products synced successfully.");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

forceSync();
