const jwt = require('jwt-simple')
const models = require('../models');
const config = require('../config/jwt-config')

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub:user.id, iat:timestamp }, config.secret)
}

exports.signin = function (req, res, next){
    // user has already had their email and password auth'd

    // we can give them a token

    // return token . user is assigned to req by passport
    res.send( {token: tokenForUser(req.user)})

}

exports.signup = async function(req, res, next){

    const email = req.body.email
    const password = req.body.password

    // check if all parameters are there
    if(!email || !password){
        return res.status(422).send({error:'You must provide both email and password.'})
    }
    
    // first check if user already exists 
    let user = await models.User.findOne( { where: { email: email } } )
        .catch((error)=>{
            console.log( '=========> ', error)
        })
    
    // if user exist return an error    
    if(user){
        // unprocessable entity
        return res.status(422).send({error: 'Email in use'})
    }    
    
    // create a new user 
    user = await models.User.create({ email: email, password: password })
        .catch((error=>{
            return next(error)
        }))

    res.json({ token:tokenForUser(user)  })
    
}