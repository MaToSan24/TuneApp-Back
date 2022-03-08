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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    perfectPitchScore: {
        type: Number,
        default: 0,
    },
    rebuildTheSongScore: {
        type: Number,
        default: 0,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;