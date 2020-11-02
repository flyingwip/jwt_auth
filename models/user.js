'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    comparePasswords(candidatePassword, callback){
      // we need salt from password
      const salt =  this.password.substring(0, 24)
      
      // create new hash on same salt on candidate pwd to compare
      const hash = crypto
      .createHash('RSA-SHA256')
      .update(candidatePassword)
      .update(salt)
      .digest('hex')
      
      // join strings
      const candidateHash = salt + hash
      // is there a match
      const isMatch = (this.password === candidateHash)
      
      callback(null, isMatch)        
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto
      .createHash('RSA-SHA256')
      .update(user.password)
      .update(salt)
      .digest('hex')
      // set hash in pwd and save
      user.password = salt + hash;
  });

  
  return User;
};