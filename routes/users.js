const axios = require('axios');
const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async(req, res) => {
    try {
        const userDB = await User.find({isAdmin: false, isTestUser: false}).select("-_id username perfectPitchScore rebuildTheSongScore");
        res.json(userDB);
    } catch (error) {
        return res.status(400).json({
        mensaje: 'An error has occurred',
        error
        })
    }
});

// router.get('/:id', async(req, res) => {
// const _id = req.params.id;
//     try {
//         const userDB = await User.findOne({_id});
//         res.json(userDB);
//     } catch (error) {
//         return res.status(400).json({
//         mensaje: 'An error has occurred',
//         error
//         })
//     }
// });

router.post('/', async(req, res) => {
    const body = req.body;  
    try {
    console.log("Posting a new user")
    const userDB = await User.create(body);
    res.status(200).json(userDB); 
    } catch (error) {
    return res.status(500).json({
        mensaje: 'An error has occurred',
        error
    })
    }
});

// router.put('/:id', async(req, res) => {
//     const _id = req.params.id;
//     const body = req.body;  
//     try {
//         console.log("Updating a user")
//         console.log("User ID: ", _id)
//         console.log("Body: ", req.body)

//         const userDB = await User.findByIdAndUpdate(_id, body);

//         res.status(200).json(userDB);
//     } catch (error) {
//         return res.status(500).json({
//             mensaje: 'An error has occurred',
//             error
//         })
//     }
// });

router.put('/updateScore/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;  
    try {
        console.log("Updating user score")
        console.log("User ID: ", _id)

        let user = await User.findById(_id)

        if (body.mode === "perfectPitch") {
            user.perfectPitchScore = user.perfectPitchScore !== undefined ? user.perfectPitchScore + body.earnedPoints : body.earnedPoints
            user.save()
        } else if (body.mode === "rebuildTheSong") {
            user.rebuildTheSongScore = user.rebuildTheSongScore !== undefined ? user.rebuildTheSongScore + body.earnedPoints : body.earnedPoints
            user.save()
        }

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});

router.delete('/test', async(req, res) => {
    try {
        const userDB = await User.findOneAndDelete({isTestUser: true});
        res.status(200).json(userDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has occurred',
            error
        })
    }
});


module.exports = router;