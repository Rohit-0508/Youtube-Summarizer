const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');
require('dotenv').config();

const router = express.Router();

const { signup, login } = require('../controllers/authController');

// POST /api/auth/signup
router.post('/signup', signup);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const user = req.user;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
        const safeUser = {
            id: user._id,
            name: user.username,
            email: user.email,
        };
        const encodedUser = encodeURIComponent(JSON.stringify(safeUser));

        res.redirect(`${frontendURL}?token=${token}&user=${encodedUser}`);

    }
);


module.exports = router;
