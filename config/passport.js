const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('../config/database');
const { ObjectId } = require('mongodb');
require('dotenv').config();

passport.use(new GitHubStrategy({
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: process.env.OAUTH_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const usersCollection = mongodb.getDb().collection('User');
    let user = await usersCollection.findOne({ githubId: profile.id });

    if (!user) {
      const newUser = {
        githubId: profile.id,
        username: profile.username,
        avatar: profile.photos[0].value
      };
      const result = await usersCollection.insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
  const user = await mongodb.getDb().collection('User').findOne({ _id: new ObjectId(id) });
  done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;