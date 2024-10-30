const express = require('express');
const authController = require('../controllers/auth'); // Import only one controller

const router = express.Router();

// Define the register route
router.post('/register', authController.register);

// Define the login route
router.post('/login', authController.login); // Call the correct login function

// // Defining the Landing/Home Page Route
// router.post('../LandingPage/src/App', authController.login);

module.exports = router;
