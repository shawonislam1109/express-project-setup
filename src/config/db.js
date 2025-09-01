import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionUrl = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME;
  const query = process.env.QUERY ? `?${process.env.QUERY}` : "";
  const url = `${connectionUrl}/${dbName}${query}`;

  try {
    await mongoose.connect(url);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
