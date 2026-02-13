const express = require('express');
const router = express.Router();
const { getUsers, registerUser, getUserById } = require('../controllers/userController');
const validate = require('../middleware/validate');
const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

router.route('/').get(getUsers).post(validate(registerSchema), registerUser);
router.route('/:id').get(getUserById);

module.exports = router;
