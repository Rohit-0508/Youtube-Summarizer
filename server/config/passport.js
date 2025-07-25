const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/Users'); // adjust path as needed
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                let baseUsername = profile.displayName;
                let username = baseUsername;
                let suffix = 1;

                while (await User.exists({ username })) {
                    username = `${baseUsername}-${suffix++}`;
                }

                user = await User.create({
                    googleId: profile.id,
                    username,
                    email: profile.emails[0].value
                });

            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));
