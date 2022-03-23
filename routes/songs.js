const axios = require('axios');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Song = require('../models/song');
const User = require('../models/user');

router.get('/', async(req, res) => {
    try {
        let songsDB = null;
        let user = await User.findById(req.query.userId)
        if (user.isAdmin === true) {
            songsDB = await Song.find()
        } else {
            songsDB = await Song.find().select("name difficulty")
        }
        res.json(songsDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

router.get('/:id', async(req, res) => {
const _id = req.params.id;
    try {
        let songDB = null;
        let user = await User.findById(req.query.userId)
        console.log("User id: ", req.query.userId)
        console.log("User: ", user)
        if (user.isAdmin === true) {
            songDB = await Song.findOne({_id})
        } else {
            songDB = await Song.findOne({_id}).select("name difficulty")
        }
        res.json(songDB);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

router.post('/', async(req, res) => {
    let body = req.body;
    body._id = new mongoose.Types.ObjectId()
    errors = []
    try {
        console.log("Creating a new song")

        let user = await User.findById(req.query.userId)

        if (user.isAdmin === true) {

            if (body.name == null || body.name == undefined || body.name.trim() == '') {
                errors.push({field: "name", message: 'Song name cannot be blank'})
            } else {
                const duplicatedSong = await Song.findOne({"name": body.name});
                
                if (duplicatedSong)
                    errors.push({field: "name", message: 'Duplicated song name'})
            }
    
            if (!body.musicSheet || body.musicSheet == null || body.musicSheet == undefined || body.musicSheet.trim() === '')
                errors.push({field: "musicSheet", message: 'The music sheet cannot be blank'})

            if (errors.length > 0) {
                console.log("Error: ", errors)
                res.status(400).json(errors)
            } else {
                const songDB = await Song.create(body);
                res.status(200).json(songDB); 
            }
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

router.put('/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    errors = []
    try {
        console.log("Updating a song")
        console.log("Song ID: ", _id)
        console.log("Body: ", req.body)

        let user = await User.findById(req.query.userId)

        if (user.isAdmin === true) {

            if (body.name == null || body.name == undefined || body.name.trim() == '') {
                errors.push({field: "name", message: 'Song name cannot be blank'})
            } else {
                const duplicatedSong = await Song.findOne({_id: {$ne: body._id}, "name": body.name});
                
                if (duplicatedSong)
                    errors.push({field: "name", message: 'Duplicated song name'})
            }
    
            if (!body.musicSheet || body.musicSheet == null || body.musicSheet == undefined || body.musicSheet.trim() === '')
                errors.push({field: "musicSheet", message: 'The music sheet cannot be blank'})

            if (errors.length > 0) {
                console.log("Error: ", errors)
                res.status(400).json(errors)
            } else {
                const songDB = await Song.findByIdAndUpdate(_id, body);
                res.status(200).json(songDB);
            }
        } else {
            res.status(403).json("You don't have permission to perform this operation")
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

// router.put('/updateScore/:id', async(req, res) => {
//     const _id = req.params.id;
//     const body = req.body;  
//     try {
//         console.log("Updating song score")
//         console.log("Song ID: ", _id)

//         let song = await Song.findById(_id)

//         if (body.mode === "perfectPitch") {
//             song.perfectPitchScore = song.perfectPitchScore !== undefined ? song.perfectPitchScore + body.earnedPoints : body.earnedPoints
//             song.save()
//         } else if (body.mode === "rebuildTheSong") {
//             song.rebuildTheSongScore = song.rebuildTheSongScore !== undefined ? song.rebuildTheSongScore + body.earnedPoints : body.earnedPoints
//             song.save()
//         }

//         res.status(200).json(song);
//     } catch (error) {
//         return res.status(500).json({
//             mensaje: 'An error has occurred',
//             error
//         })
//     }
// });

router.delete('/:id', async(req, res) => {
    try {
        let user = await User.findById(req.query.userId)

        if (user.isAdmin === true) {
            const songDB = await Song.findOneAndDelete(req.params.id);
            res.status(200).json(songDB);
        } else {
            res.status(403).json("You don't have permission to perform this operation")
        }
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});


module.exports = router;