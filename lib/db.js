import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

export async function connectDB() {
  // 🚨 BUILD TIME GUARD (VERY IMPORTANT)
  if (!MONGO_URI) {
    console.warn("⚠️ MONGO_URI not found, skipping DB connection");
    return null;
  }

  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGO_URI);
  return cached.conn;
}
