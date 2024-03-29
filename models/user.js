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
    isTestUser: {
        type: Boolean,
        default: false,
    },
    perfectPitchScore: {
        type: Number,
        default: 0,
    },
    rebuildTheSongScore: {
        type: Map,
        of: Number,
        default: {},
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;