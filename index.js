const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
require('./models/user')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

//authRoutes file immediately returns a function and immediately calls the app function.
require('./routes/authRoutes')(app)

//declare a production environment or local environment
const PORT = process.env.PORT || 5000
app.listen(PORT);
