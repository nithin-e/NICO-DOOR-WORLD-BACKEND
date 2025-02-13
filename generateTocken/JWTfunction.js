const jwt = require('jsonwebtoken');

const generateToken = (email) => {
    try {
        return jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '7d', 
        });
    } catch (error) {
        console.error("Failed to generate token",error)
    }
};

module.exports = generateToken;
