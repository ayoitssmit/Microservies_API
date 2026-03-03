const User = require('../models/User');

// @desc    Get all users
// @route   GET /users
// @access  Public
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500);
        throw new Error('Server error');
    }
};

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message || 'Invalid user data');
    }
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Public
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    getUsers,
    registerUser,
    getUserById,
};
