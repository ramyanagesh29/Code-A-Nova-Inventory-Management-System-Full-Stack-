const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    purchasePrice: {
        type: Number,
        required: true,
        min: 0
    },

    totalAmount: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Purchase", purchaseSchema);