const models = require('../models');

exports.signup = function(req, res, next){
    
    
    models.User.findAll().then((result) => {
        console.log(result)
        // response.render('user/index', { title: 'User list', users: result } );
    });
    
    res.send({succes:'true'})
}