const mongoose = require('mongoose');
const songSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        validate : {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    musicSheet: {
        type: String,
        required: true,
    }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;