const { carts, products } = require('../models');

// @desc    Get user cart
// @route   GET /cart/:userId
// @access  Public
const getCart = (req, res) => {
    const userId = parseInt(req.params.userId);
    let cart = carts.find(c => c.userId === userId);

    if (!cart) {
        cart = { userId, items: [] };
        carts.push(cart);
    }

    res.json(cart);
};

// @desc    Add item to cart
// @route   POST /cart
// @access  Public
const addToCart = (req, res) => {
    const { userId, productId, quantity } = req.body;

    // Check product existence
    const product = products.find(p => p.id === productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = carts.find(c => c.userId === userId);
    if (!cart) {
        cart = { userId, items: [] };
        carts.push(cart);
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    res.json(cart);
};

// @desc    Remove item from cart
// @route   DELETE /cart/:userId/item/:productId
// @access  Public
const removeFromCart = (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);

    const cart = carts.find(c => c.userId === userId);
    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    res.json(cart);
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};
