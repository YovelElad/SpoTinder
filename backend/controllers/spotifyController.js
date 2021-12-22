const api = require('../modules/spotifyAPI');
const User = require("../models/userModel");
const Match = require("../models/matchModel");
const matchEngine = require('../modules/matching');
const DB = require('../data/index');


async function cascadeMatches(matches, userId) {
    console.log(`cascadeMatches, userId: ${userId}`);
    matches.forEach((match) => {
        const matchToPush = {...match };
        matchToPush.user = userId;
        User.findOneAndUpdate({ "_id": match.user }, { $push: { potentialMatches: matchToPush } }, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`added ${userId} to ${match.user}`);
            }
        });
    });
}


callback = (req, res) => {
        const code = req.query.code || null;
        console.log(req.query);
        if (code) {
            const userId = req.query.state;
            api.authorizeSpotify(userId, code).then(user => {
                // console.log(`then of authorizeSpotify, user: ${user.id}`);
                api.buildUserProfile(user).then((newUser) => {
                    console.log(`then of buildUserProfile, user: ${newUser}`);
                    DB.getUser(userId).then((user) => {
                        console.log(`then of getUser, user: ${user.id}`);
                        if (user) {
                            newUser.email = user.email;
                            newUser.password = user.password;
                            newUser.gender = user.gender;
                            newUser.interestedIn = user.interestedIn;
                        }
                        DB.updateUser(userId, newUser);
                        matchEngine.calculateMatches(newUser).then((matches) => {
                            // <<<<<<< HEAD
                            //                             console.log(`then of calculateMatches, user: ${matches}`);
                            //                             Match.insertMany(matches, (err, docs) => {
                            //                                 if (err) {
                            //                                     console.log(err);
                            //                                 } else {
                            //                                     console.log(`inserted ${docs.length} matches`);
                            //                                 }
                            //                             });
                            //                             res.redirect('/index.html?id=' + userId);
                            // =======
                            console.log(`then of calculateMatches, user: ${matches}`);
                            Match.insertMany(matches, (err, docs) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(`inserted ${docs.length} matches`);
                                }
                            });
                            res.redirect('/list.html?id=' + userId);


                        });
                    })
                })
            });
        } else {
            console.log(`error: ${req.query}`);
            res.json({ status: false, message: 'Error logging in to spotify' });
        }
    } // should determine if user is sign up or not if not then 

login = (req, res) => {
    const userId = req.params.userId;
    const url = api.getAuthorizationUrl(userId); // 1 is the user id - we dont use this yet
    // res.redirect(url);
    res.json({ status: true, data: url });
}

module.exports = {
    callback,
    login
}