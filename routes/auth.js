const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate OAuth login
router.get('/login', passport.authenticate('oauth2'));

// Callback route
router.get('/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Route to handle logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;