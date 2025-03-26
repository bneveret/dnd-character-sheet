const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const User = require('../models/User');
require('dotenv').config();


passport.use(new OAuth2Strategy(
  {
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    clientID: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ oauthId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.username || profile.displayName,
          oauthProvider: 'github',
          oauthId: profile.id,
          email: profile.email,
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;