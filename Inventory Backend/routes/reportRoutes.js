const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Sale = require("../models/Sale");
const Purchase = require("../models/Purchase");

const protect = require("../middleware/authMiddleware");


// GET INVENTORY REPORT
router.get("/", protect, async (req, res) => {

    try {

        // Basic counts
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalSuppliers = await Supplier.countDocuments();

        // Products with stock below 10
        const lowStockProducts = await Product.countDocuments({
            stock: { $lt: 10 }
        });

        // Number of sale transactions
        const totalSalesTransactions = await Sale.countDocuments();

        // Number of purchase transactions
        const totalPurchaseTransactions =
            await Purchase.countDocuments();


        // Calculate total sales amount
        const salesResult = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalSalesAmount =
            salesResult.length > 0
                ? salesResult[0].total
                : 0;


        // Calculate total purchase amount
        const purchaseResult = await Purchase.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalPurchaseAmount =
            purchaseResult.length > 0
                ? purchaseResult[0].total
                : 0;


        // Send report
        res.status(200).json({

            totalProducts,
            totalCategories,
            totalSuppliers,
            lowStockProducts,

            totalSalesTransactions,
            totalPurchaseTransactions,

            totalSalesAmount,
            totalPurchaseAmount

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;