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
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }) // this returns a promise
        .then((existingUser) => {
            if (existingUser) { // already have a record with profile id
                done(null, existingUser)
            } else { // don't have a record so create an instance of a new user
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user))
            }
        })
})
)