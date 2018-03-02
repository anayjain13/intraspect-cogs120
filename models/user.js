var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var activitySchema = require('./activity');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        tags : { type : [String]},
        activities: {type: [activitySchema]}
        },
    facebook         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);