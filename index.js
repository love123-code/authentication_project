// index.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route (IMPORTANT - Cannot GET / fix)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// ✅ Sample API route (check working)
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working ✅" });
});

// ✅ Example auth routes (agar tumhare hain to import karo)
// const authRoutes = require("./src/routes/authRoutes");
// app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
