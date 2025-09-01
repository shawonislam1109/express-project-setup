import http from "http";
import dotenv from "dotenv";
dotenv.config();

import config from "./config/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const main = async () => {
  try {
    await config.db.connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

main();
