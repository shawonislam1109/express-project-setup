// config/db.js
const mongoose = require("mongoose");

/**
 * Generate connection string  for the 
 * @returns 
 */ 
const generateConnectionString = () => {
  const connectionUrl = process.env.MONGO_URI;
  const name = process.env.BDNAME;
  const query = process.env.QUERY;

  return `${connectionUrl}/${name}?${query}`;
};

// -> connection bd
const connectDB = async () => {
  const url = generateConnectionString();
  const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(url, options);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
