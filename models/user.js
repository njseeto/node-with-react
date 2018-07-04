const mongoose = require('mongoose')
const { Schema } = mongoose // this is the same as saying const Schema = mongoose.Schema (destructuring)

const userSchema = new Schema({
    googleId: String
})

// Tell mongoose we want to create a new collection called users
mongoose.model('users', userSchema) // two arguments says we are trying to load something into mongoose

