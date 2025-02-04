const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create User Model
const User = mongoose.model("User", UserSchema);

// ✅ GET Users - Fetch all users from MongoDB
router.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch users from MongoDB
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// ✅ POST User - Create a new user in MongoDB
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = new User({ name, email, password });
        await newUser.save(); // Save to MongoDB
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

module.exports = router;
