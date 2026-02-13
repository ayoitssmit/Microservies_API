const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const validate = require('../middleware/validate');
const Joi = require('joi');

const cartSchema = Joi.object({
    userId: Joi.number().required(),
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required()
});

router.route('/').post(validate(cartSchema), addToCart);
router.route('/:userId').get(getCart);
router.route('/:userId/item/:productId').delete(removeFromCart);

module.exports = router;
