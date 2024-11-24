// const mongoose = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   tableNumber: { type: Number, required: true },
//   customizations: { type: String, default: "" }, // Move customizations here
//   items: [
//     {
//       name: { type: String, required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalPrice: { type: Number, required: true },
//   status: { type: String, enum: ["pending", "preparing", "served"], default: "pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },
    tableNumber: {
        type: Number,
        required: true,
    },
    items: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            customizations: { type: String, default: "" },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    customizations: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

