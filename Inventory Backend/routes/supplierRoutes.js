const express = require("express");
const router = express.Router();

const Supplier = require("../models/Supplier");
const protect = require("../middleware/authMiddleware");

// Get all suppliers
router.get("/", async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add supplier
router.post("/", protect, async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update supplier
router.put("/:id", protect, async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete supplier
router.delete("/:id", protect, async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);
        res.json({
            message: "Supplier Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;