const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} is not a valid role'
}

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Mail is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: validRoles,
    },
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

const User = mongoose.model('User', userSchema);

module.exports = User;