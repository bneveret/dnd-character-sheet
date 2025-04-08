const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate OAuth login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// Callback route
router.get('/callback',
  passport.authenticate('github', { failureRedirect: '../../api-docs', successRedirect: '../../api-docs' })
);

// Route to handle logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('../../api-docs');
  });
});

module.exports = router;