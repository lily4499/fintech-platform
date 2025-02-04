const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define Transaction Schema
const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["deposit", "withdrawal"], required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create Transaction Model
const Transaction = mongoose.model("Transaction", TransactionSchema);

// ✅ GET Transactions - Fetch all transactions
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("userId", "name email");
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error });
    }
});

// ✅ POST Transaction - Create a new transaction
router.post("/", async (req, res) => {
    const { userId, amount, type } = req.body;

    if (!userId || !amount || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newTransaction = new Transaction({ userId, amount, type });
        await newTransaction.save();
        res.status(201).json({ message: "Transaction recorded", transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: "Error creating transaction", error });
    }
});

module.exports = router;
