const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isAdmin: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;