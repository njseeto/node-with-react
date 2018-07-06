if (process.env.NODE_ENV === 'production') {
    //production keys
    module.exports = require('./prod')
} else {
    //use development keys
    module.exports = require('./dev')
}