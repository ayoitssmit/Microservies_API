const { users } = require('../models');

// @desc    Get all users
// @route   GET /users
// @access  Public
const getUsers = (req, res) => {
    res.json(users);
};

// @desc    Register a new user
// @route   POST /users
// @access  Public
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    const userExists = users.find(user => user.email === email);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = {
        id: users.length + 1,
        name,
        email,
        password // In a real app, hash this!
    };

    users.push(user);

    res.status(201).json(user);
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Public
const getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    getUsers,
    registerUser,
    getUserById,
};
