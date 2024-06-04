// import libraries, controllers and middleware
const express = require('express');
const { registerUser, authUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// User registration and authentication routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Protected route for user profile (requires authorization)
router.get('/profile', protect, getUserProfile);

module.exports = router;
