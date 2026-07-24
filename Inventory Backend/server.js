const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();
const cors = require("cors");
const protect = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/products", async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const search = req.query.search || "";

        const products = await Product.find({
            name: { $regex: search, $options: "i" }
        })
        .populate("category supplier")
        .skip((page - 1) * limit)
        .limit(limit);

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.post("/products", protect, async (req, res) => { 

    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Product Added Successfully",
            product: product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.put("/products/:id", protect, async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product Updated Successfully",
            product: updatedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});
app.delete("/products/:id", protect, async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product Deleted Successfully",
            product: deletedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.use("/api/auth", authRoutes);

app.listen(3000,()=>{
    console.log("Server Running");
});