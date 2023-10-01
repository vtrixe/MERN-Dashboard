const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:9000/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Find the user in the database
  const user = await User.findOne({ email: profile.email });

  // If the user doesn't exist, create a new one
  if (!user) {
    const newuser = new User({
      name: profile.displayName,
      email: profile.email,
      role: 'user',
      accessToken,
      refreshToken,
    });

    await newuser.save();
  }

  // Return the user to Passport
  done(null, user);
}));
