const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const totalCategories = await Category.countDocuments();

        const totalSuppliers = await Supplier.countDocuments();

        const lowStockProducts = await Product.countDocuments({
            stock: { $lt: 10 }
        });

        res.json({

            totalProducts,
            totalCategories,
            totalSuppliers,
            lowStockProducts

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;