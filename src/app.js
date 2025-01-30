// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../src/config/bd");

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Set up server to listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
