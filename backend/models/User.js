const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create & Export User Model
module.exports = mongoose.model("User", UserSchema);
