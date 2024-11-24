const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // For options like "Less Oil", "Spicy", etc.
    default: [],
  },
});

const Menu = mongoose.model("Menu", MenuSchema);

module.exports = Menu;