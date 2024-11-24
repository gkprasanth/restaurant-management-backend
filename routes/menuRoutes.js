const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

// @route   GET /menu
// @desc    Get all menu items
// @access  Public
router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// @route   POST /menu
// @desc    Add a new menu item
// @access  Admin (for simplicity, assumes access is managed elsewhere)
router.post("/", async (req, res) => {
  const { category, name, price, description, options } = req.body;

  if (!category || !name || !price || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newMenuItem = new Menu({
      category,
      name,
      price,
      description,
      options: options || [], // Default to an empty array
    });

    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to create menu item", error: err.message });
  }
});

// @route   PUT /menu/:id
// @desc    Update a menu item
// @access  Admin
router.put("/:id", async (req, res) => {
  const { category, name, price, description, options } = req.body;

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { category, name, price, description, options },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to update menu item", error: err.message });
  }
});

// @route   DELETE /menu/:id
// @desc    Delete a menu item
// @access  Admin
router.delete("/:id", async (req, res) => {
  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.json({ message: "Menu item deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete menu item", error: err.message });
  }
});

module.exports = router;