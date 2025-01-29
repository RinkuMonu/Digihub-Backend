const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');

// POST /api/user/save - Register new user
router.post("/signup", function save(req, res) {
    userService.save(req, res)
        .then((response) => {
            // Send success response
            res.status(200).json(response); // Use status 200 for successful requests
        })
        .catch((err) => {
            // Send error response with appropriate status code
            console.error(err); // Log the error for debugging
            res.status(500).json({
                responseCode: -1,
                message: err.message || "Internal Server Error"
            });
        });
});

// POST /api/user/login - User login
router.post("/login", function login(req, res) {
    userService.login(req, res)
        .then((response) => {
            // Send success response
            res.status(200).json(response); // Use status 200 for successful requests
        })
        .catch((err) => {
            // Send error response with appropriate status code
            console.error(err); // Log the error for debugging
            res.status(500).json({
                responseCode: -1,
                message: err.message || "Internal Server Error"
            });
        });
});

// GET /api/user/alluser - Get all users (for admin purposes)
router.get('/alluser', function alluser(req, res) {
    userService.allUser(req, res)
        .then((response) => {
            // Send list of users in response
            res.status(200).json(response); // Use status 200 for successful requests
        })
        .catch((err) => {
            // Send error response with appropriate status code
            console.error(err); // Log the error for debugging
            res.status(500).json({
                responseCode: -1,
                message: err.message || "Internal Server Error"
            });
        });
});



module.exports = router;
