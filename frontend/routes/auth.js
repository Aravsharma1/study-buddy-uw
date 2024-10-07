const express = require('express');
const authController = require('../controllers/auth'); // Import only one controller

const router = express.Router();

// Define the register route
router.post('/register', authController.register);

// Define the login route
router.post('/login', authController.login); // Call the correct login function

module.exports = router;
