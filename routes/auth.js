const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Login
router.post('/login',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not an email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    authController.login
);

// Sign Up
router.post('/signup',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not an email').isEmail(),
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    authController.signup
);

// Lost password, send email with a temp password.
router.post('/lost-password', 
    [
        check('email', 'Email is required').not().isEmpty(),
        check('email', 'Email is not an email').isEmail()
    ],
    authController.lostPassword
);

module.exports = router;