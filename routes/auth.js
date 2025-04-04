const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate OAuth login
router.get('/login', passport.authenticate('github'));

// Callback route
router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('../api-docs');
  }
);

// Route to handle logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;