import mongoose from "mongoose";

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  // Log which MongoDB we're connecting to (hide password)
  const safeUri = MONGODB_URI.replace(/:([^@]+)@/, ':****@');

  if (mongoose.connection.readyState === 1) {
    const dbName = mongoose.connection.db?.databaseName || 'unknown';
    console.log(`[DB] Already connected to database: "${dbName}" (${safeUri})`);
    return mongoose.connection;
  }

  console.log(`[DB] Connecting to: ${safeUri}`);
  await mongoose.connect(MONGODB_URI);
  const dbName = mongoose.connection.db?.databaseName || 'unknown';
  console.log(`[DB] ✅ Connected! Database: "${dbName}", Host: ${mongoose.connection.host}`);

  return mongoose.connection;
}
