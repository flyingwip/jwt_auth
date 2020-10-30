const models = require('../models');

exports.signup = async function(req, res, next){

    const email = req.body.email
    const password = req.body.password
    
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
    user = await models.User.create({ email: email, password: email })
        .catch((error=>{
            return next(error)
        }))

    res.json({user})
}