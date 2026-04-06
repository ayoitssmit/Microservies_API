const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // We will use a fallback secret if not defined in environment
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_production';
    return jwt.sign({ id }, secret, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
