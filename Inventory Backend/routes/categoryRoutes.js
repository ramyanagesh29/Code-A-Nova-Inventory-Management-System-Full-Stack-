const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const protect = require("../middleware/authMiddleware");

// Get all categories
router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Add category
router.post("/", protect, async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update category
router.put("/:id", protect, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete category
router.delete("/:id", protect, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;