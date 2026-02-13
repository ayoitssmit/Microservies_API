const { products } = require('../models');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getProducts = (req, res) => {
    res.json(products);
};

// @desc    Create a product
// @route   POST /products
// @access  Public
const createProduct = (req, res) => {
    const { name, price, description, stock } = req.body;

    const product = {
        id: products.length + 1,
        name,
        price,
        description,
        stock
    };

    products.push(product);
    res.status(201).json(product);
};

// @desc    Get product by ID
// @route   GET /products/:id
// @access  Public
const getProductById = (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById
};
