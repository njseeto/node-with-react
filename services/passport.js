const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users') //one argument means we are trying to fetch something from the collection

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }) // this returns a promise
        .then((existingUser) => {
            if (existingUser) {
                // already have record with the given profile ID
            } else {
                // don't have a record so create an instance of a new user
                new User({ googleId: profile.id }).save() //creates a new instance of a user
            }
        })
})
)