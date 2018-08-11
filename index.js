const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyparser = require('body-parser')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyparser.json())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

//authRoutes file immediately returns a function and immediately calls the app function.
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

//declare a production environment or local environment
const PORT = process.env.PORT || 5000
app.listen(PORT);
