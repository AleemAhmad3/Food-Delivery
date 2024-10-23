const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, required: false },
});

// Ensure the model is defined correctly
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order; // Export the model, not the schema
