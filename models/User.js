const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "kitchen", "reception"]},
  tableNumber: { type: Number, default: null }, // Only for customers
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
