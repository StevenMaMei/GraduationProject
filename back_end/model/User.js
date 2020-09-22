const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email required"],
    },
    password: {
        type: String,
        required: [true, "Password required"],
    },
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)