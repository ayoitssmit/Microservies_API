const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById } = require('../controllers/productController');
const validate = require('../middleware/validate');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().optional(),
    stock: Joi.number().integer().min(0).required()
});

router.route('/').get(getProducts).post(validate(productSchema), createProduct);
router.route('/:id').get(getProductById);

module.exports = router;
