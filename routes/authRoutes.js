const passport = require('passport')

module.exports = (app) => {
    //authenticate the url /auth/google with the google strategy. Google has a list of the scopes.
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            'scope': ['profile', 'email']
        }
        )
    )

    //at this point OAuth has the code to be able to authenticate the chosen email
    app.get(
        '/auth/google/callback', passport.authenticate('google')
    )
}
