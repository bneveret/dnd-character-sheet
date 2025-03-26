const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { getDb } = require('../config/database');
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
      const db = getDb();
        const usersCollection = db.collection('users');

      let user = await usersCollection.findOne({ oauthId: profile.id });
      if (!user) {
        user = {
          username: profile.username || profile.displayName,
          oauthProvider: 'github',
          oauthId: profile.id,
          email: profile.email,
        };
        await usersCollection.insertOne(user);
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.oauthId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ oauthId: id });
      done(null, user);
    } catch (err) {
      done(err, null);
  }
});

module.exports = passport;