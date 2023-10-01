const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth callback route
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

// Google OAuth sign in route
router.get('/login/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

module.exports = router;
