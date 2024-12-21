const Order = require('../models/Order');

// Create a new order
// Create a new order
exports.createOrder = async (req, res) => {
  console.log('Request body:', req.body);
  
  const { phone, products, shippingDetails, totalPrice } = req.body; // Include phone
  const newOrder = new Order({ phone, products, shippingDetails, totalPrice }); // Add phone to the new order

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error); // Log detailed error
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all orders for a phone number
exports.getOrdersByPhone = async (req, res) => {
  const { phone } = req.params;

  try {
    const orders = await Order.find({ phone });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.json(orders); // Return the list of orders in JSON format
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message }); // Return a 500 status code on error
  }
};

// Update order status (for admin or user actions)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order (optional)
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

