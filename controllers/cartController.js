const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get user cart
// @route   GET /cart/:userId
// @access  Public
const getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price');

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        res.json(cart);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Add item to cart
// @route   POST /cart
// @access  Public
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check product existence
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        
        // Populate before returning
        const updatedCart = await Cart.findById(cart._id).populate('items.product', 'name price');
        res.json(updatedCart);

    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Remove item from cart
// @route   DELETE /cart/:userId/item/:productId
// @access  Public
const removeFromCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            res.status(404);
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        const updatedCart = await Cart.findById(cart._id).populate('items.product', 'name price');
        res.json(updatedCart);
        
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};
