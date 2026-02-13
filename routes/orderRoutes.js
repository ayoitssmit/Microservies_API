const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getUserOrders } = require('../controllers/orderController');
const validate = require('../middleware/validate');
const Joi = require('joi');

const orderSchema = Joi.object({
    userId: Joi.number().required(),
    items: Joi.array().items(
        Joi.object({
            productId: Joi.number().required(),
            quantity: Joi.number().min(1).required()
        })
    ).required()
});

router.route('/').get(getOrders).post(validate(orderSchema), createOrder);
router.route('/user/:userId').get(getUserOrders);

module.exports = router;
