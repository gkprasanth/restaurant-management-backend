const Order = require('../models/Order');
const mongoose = require('mongoose');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { customer, tableNumber, items, totalPrice, customizations } = req.body;
        
        // Create a new order object
        const newOrder = new Order({
            customer,
            tableNumber,
            items,
            totalPrice,
            status: 'pending',
            customizations,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        res.status(201).json({ success: true, data: savedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
};

// Get all orders (Admin use, can filter by tableNumber, status, etc.)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};

// Get orders for a specific table
exports.getOrdersByTableNumber = async (req, res) => {
    try {
        const { tableNumber } = req.params; // Get table number from URL params
        const orders = await Order.find({ tableNumber }); // Filter orders by tableNumber
        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this table' });
        }
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};





// Update the status of an order (e.g., from 'pending' to 'completed')
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating order status' });
    }
};


// Clear all orders for a specific table
exports.clearTable = async (req, res) => {
    try {
        const { tableNumber } = req.params; // Get table number from URL params
        
        // Delete all orders for the given table
        const result = await Order.deleteMany({ tableNumber });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'No orders found for this table' });
        }

        res.status(200).json({ success: true, message: `Cleared all orders for table ${tableNumber}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error clearing table orders' });
    }
};
