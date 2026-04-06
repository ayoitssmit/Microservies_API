const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser, getUserById } = require('../controllers/userController');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');
const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Protect getting all users, public for registering
router.route('/').get(protect, getUsers).post(validate(registerSchema), registerUser);

// Login route
router.post('/login', validate(loginSchema), loginUser);

router.route('/:id').get(getUserById);

module.exports = router;
