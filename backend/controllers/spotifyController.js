const api = require('../modules/spotifyAPI');
const User = require("../models/userModel");
const Match = require("../models/matchModel");
const matchEngine = require('../modules/matching');
const DB = require('../data/index');

callback = (req, res) => {
        const code = req.query.code || null;
        console.log(req.query);
        if (code) {
            const userId = req.query.state;
            api.authorizeSpotify(userId, code).then(user => {
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
    } 

login = (req, res) => {
    const userId = req.params.userId;
    const url = api.getAuthorizationUrl(userId);
    res.json({ status: true, data: url });
}

module.exports = {
    callback,
    login
}