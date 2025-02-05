const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  
require("dotenv").config();

const app = express();

// Middleware setup
app.use(express.json()); // Allow JSON parsing
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Use env or default URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true
})); 

console.log("Allowed CORS Origin:", process.env.CLIENT_URL || "http://localhost:3000"); // Debugging


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Sample API Route
app.get("/", (req, res) => res.json({ message: "Fintech API Running 🚀" }));

// Route to return JSON
app.get("/api", (req, res) => res.json({ message: "Hello from Fintech API !!!  🚀 New Version Deployed via GitOps!" }));

// Route to return plain text
// app.get("/", (req, res) => {
//   res.send("Fintech API Running 🚀");
// });


// API Routes for Users, Transactions, Accounts
app.use("/api/users", require("./routes/users"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/accounts", require("./routes/accounts"));

// Handle unknown routes (Always JSON format)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
