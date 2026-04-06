const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user._id;

        // Calculate total and validate products
        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
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
            await product.save();

            total += product.price * item.quantity;
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const order = new Order({
            user: userId,
            orderItems,
            totalPrice: total
        });

        const createdOrder = await order.save();

        // Clear the user's cart after successful order
        await Cart.findOneAndUpdate({ user: userId }, { items: [] });

        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode);
        throw new Error(error.message || 'Server Error');
    }
};

// @desc    Get all orders
// @route   GET /orders
// @access  Public
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json(orders);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Get user orders
// @route   GET /orders/user/:userId
// @access  Public
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('orderItems.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = {
    createOrder,
    getOrders,
    getUserOrders
};
