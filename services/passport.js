const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users') //one argument means we are trying to fetch something from the collection

passport.serializeUser((user, done) => { // done is a callback
    done(null, user.id) // user.id refers to the user model instance stored in the mongoDB collection
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id }) // this returns a promise
    if (existingUser) { // already have a record with profile id
        return done(null, existingUser)
    } // don't have a record so create an instance of a new user
        const user = await new User({ googleId: profile.id }).save()
        done(null, user)
    })
)