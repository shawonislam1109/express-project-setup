// index.js
import http from 'http';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import config from './config';
import app from './app';

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
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

main();
