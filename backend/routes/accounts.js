const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Account Schema
const AccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

// Create Account Model
const Account = mongoose.model("Account", AccountSchema);

// ✅ GET Accounts - Fetch all accounts
router.get("/", async (req, res) => {
    try {
        const accounts = await Account.find().populate("userId", "name email");
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accounts", error });
    }
});

// ✅ POST Account - Create a new account
router.post("/", async (req, res) => {
    const { userId, balance } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const newAccount = new Account({ userId, balance });
        await newAccount.save();
        res.status(201).json({ message: "Account created successfully", account: newAccount });
    } catch (error) {
        res.status(500).json({ message: "Error creating account", error });
    }
});

module.exports = router;

