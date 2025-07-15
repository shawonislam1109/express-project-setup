// index.js
const http = require("http");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables first

const config = require("./config");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const main = async () => {
  try {
    // Connect to MongoDB
    await config.db.connectDB();
    // Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

main();
