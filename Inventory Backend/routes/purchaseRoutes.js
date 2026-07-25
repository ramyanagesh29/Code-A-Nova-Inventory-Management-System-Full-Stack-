const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const protect = require("../middleware/authMiddleware");


// GET ALL PURCHASES
router.get("/", protect, async (req, res) => {

    try {

        const purchases = await Purchase.find()
            .populate("product", "name price stock")
            .populate("supplier", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(purchases);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ADD NEW PURCHASE
router.post("/", protect, async (req, res) => {

    try {

        const {
            product,
            supplier,
            quantity,
            purchasePrice
        } = req.body;

        const quantityNumber = Number(quantity);
        const priceNumber = Number(purchasePrice);

        // Validate input
        if (
            !product ||
            !supplier ||
            !quantityNumber ||
            quantityNumber < 1 ||
            Number.isNaN(priceNumber) ||
            priceNumber < 0
        ) {
            return res.status(400).json({
                message: "Please enter valid purchase details"
            });
        }

        // Check product
        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        // Check supplier
        const existingSupplier = await Supplier.findById(supplier);

        if (!existingSupplier) {
            return res.status(404).json({
                message: "Supplier Not Found"
            });
        }

        // Calculate purchase total
        const totalAmount =
            quantityNumber * priceNumber;

        // Create purchase record
        const purchase = await Purchase.create({
            product: existingProduct._id,
            supplier: existingSupplier._id,
            quantity: quantityNumber,
            purchasePrice: priceNumber,
            totalAmount
        });

        // Increase product stock
        existingProduct.stock += quantityNumber;

        await existingProduct.save();

        // Return purchase with product/supplier names
        const populatedPurchase =
            await Purchase.findById(purchase._id)
                .populate("product", "name price stock")
                .populate("supplier", "name");

        res.status(201).json({
            message: "Purchase Recorded Successfully",
            purchase: populatedPurchase
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;