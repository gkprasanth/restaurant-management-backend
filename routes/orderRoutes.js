const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/orders', orderController.createOrder); // Fixed route path for creating orders

// Get all orders (for admin, can be filtered)
router.get('/orders', orderController.getOrders); // Route for getting all orders

// Get orders for a specific table by table number (corrected the route)
router.get('/orders/:tableNumber', orderController.getOrdersByTableNumber); // Fetch orders for a specific table

// Update order status (e.g., 'pending', 'confirmed', 'completed', 'cancelled')
router.put('/orders/:id/status', orderController.updateOrderStatus); // Update order status by ID
// app.delete('/orders/clear/:tableNumber', async (req, res) => {
//     const tableNumber = req.params.tableNumber;
//     try {
//       // Logic to clear orders for the table
//       await Orders.deleteMany({ tableNumber });
//       res.status(200).json({ message: `Orders for table ${tableNumber} cleared.` });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to clear orders.' });
//     }
//   });
router.delete("/orders/table/clear/:tableNumber", orderController.clearTable);
router.delete('/orders', orderController.clearAllOrders);
    

module.exports = router;
