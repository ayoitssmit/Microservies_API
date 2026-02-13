const { orders, users, products } = require('../models');

// @desc    Create new order
// @route   POST /orders
// @access  Public
const createOrder = (req, res) => {
    const { userId, items } = req.body;

    // Validate user
    const user = users.find(u => u.id === userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Calculate total and validate products
    let total = 0;
    const orderItems = [];

    for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (!product) {
            res.status(404);
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
            res.status(400);
            throw new Error(`Product ${product.name} is out of stock`);
        }

        // Deduct stock
        product.stock -= item.quantity;

        total += product.price * item.quantity;
        orderItems.push({
            product,
            quantity: item.quantity
        });
    }

    const order = {
        id: orders.length + 1,
        user,
        orderItems,
        total,
        status: 'Pending',
        createdAt: new Date()
    };

    orders.push(order);
    res.status(201).json(order);
};

// @desc    Get all orders
// @route   GET /orders
// @access  Public
const getOrders = (req, res) => {
    res.json(orders);
};

// @desc    Get user orders
// @route   GET /orders/user/:userId
// @access  Public
const getUserOrders = (req, res) => {
    const userOrders = orders.filter(o => o.user.id === parseInt(req.params.userId));
    res.json(userOrders);
};

module.exports = {
    createOrder,
    getOrders,
    getUserOrders
};
