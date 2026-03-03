const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500);
        throw new Error('Server error');
    }
};

// @desc    Create a product
// @route   POST /products
// @access  Public
const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        const product = new Product({
            name,
            price,
            description,
            stock
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid product data');
    }
};

// @desc    Get product by ID
// @route   GET /products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        res.status(404);
        throw new Error('Product not found');
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById
};
