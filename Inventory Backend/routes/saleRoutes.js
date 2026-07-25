const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

// GET ALL SALES
router.get("/", protect, async (req, res) => {
    try {
        const sales = await Sale.find()
            .populate("product", "name price")
            .sort({ createdAt: -1 });

        res.status(200).json(sales);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// ADD NEW SALE
router.post("/", protect, async (req, res) => {
    try {
        const { product, quantity } = req.body;

        const quantityNumber = Number(quantity);

        if (!product || !quantityNumber || quantityNumber < 1) {
            return res.status(400).json({
                message: "Product and valid quantity are required"
            });
        }

        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        if (existingProduct.stock < quantityNumber) {
            return res.status(400).json({
                message: "Insufficient Stock"
            });
        }

        const totalAmount =
            existingProduct.price * quantityNumber;

        const sale = await Sale.create({
            product: existingProduct._id,
            quantity: quantityNumber,
            totalAmount
        });

        // Reduce inventory stock
        existingProduct.stock -= quantityNumber;
        await existingProduct.save();

        const populatedSale = await Sale.findById(sale._id)
            .populate("product", "name price");

        res.status(201).json({
            message: "Sale Recorded Successfully",
            sale: populatedSale
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;