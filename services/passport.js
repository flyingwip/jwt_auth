const passport = require('passport')
const models = require('../models');
const config = require('../config/jwt-config')
// in passport a strategy is a method for authenticating a user
// passport-jwt is a strategy. See strategy as a sort of a plugin
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// Create local strategy. Local means local database
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy( localOptions, async function(email, password, done){
    // Verify this username and password , call done with user
    // if it is the correct username and password
    //  
    let user = await models.User.findOne( { where: { email: email } } )
        .catch( err => { done(err, false) })

    // compare password - is `password` equal to user.password
    user.comparePasswords(password, (err, isMatch) => {

        if(err){ return done(err) }
        if(!isMatch) { return done(null, false)}

        // use passport done function
        // this assigns the user to req.user property
        return done(null, user)

    })

})

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

// Create JWT Strategy
// the second parameter is a function that is going to be called
// whenever is user is going to be authenticated

/**
 * Returns x raised to the n-th power.
 *
 * @param {object} payload decoded jwt token
 * @param {function} done  callback 
 * @return {number} x raised to the n-th power.
 */
const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done){
    // see if that user ID in the payload exists in our database

    // If it does, call 'done' with that uses

    // otherwise, call done without a user object
    // first check if user already exists 
    let user = await models.User.findOne( { where: { id: payload.sub } } )
        .catch( err => { done(err, false) })    

    if(user){
        done(null, user)
    }  else{
        done(null, false)
    }  
})


// Tell Passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)