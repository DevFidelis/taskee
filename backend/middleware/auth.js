// import models and libraries
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes requiring authorization
const protect = async (req, res, next) => {
  let token;

  // Check for 'Bearer' token in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user associated with decoded token id
      req.user = await User.findByPk(decoded.id);

      // If user found, proceed to next middleware/route
      next();
    } catch (error) {
      // Handle invalid token errors
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token found, send unauthorized response
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
