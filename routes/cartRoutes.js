const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');
const Joi = require('joi');

const cartSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
});

router.route('/').post(protect, validate(cartSchema), addToCart);
router.route('/:userId').get(protect, getCart);
router.route('/:userId/item/:productId').delete(protect, removeFromCart);

module.exports = router;
