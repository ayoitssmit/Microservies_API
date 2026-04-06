const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getUserOrders } = require('../controllers/orderController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');
const Joi = require('joi');

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).required()
        })
    ).required()
});

router.route('/').get(protect, getOrders).post(protect, validate(orderSchema), createOrder);
router.route('/user/:userId').get(protect, getUserOrders);

module.exports = router;
