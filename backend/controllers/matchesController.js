const Match = require('../models/matchModel');
const mongoose = require('mongoose');

const matchesController = {
    getAllMatchesOfUser: (req, res) => {
        const userId = req.params.userId;
        Match.find({ $or: [{ firstUser: userId }, { secondUser: userId }] }, null, {sort:{score:-1}}, (err, matches) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                res.json({ status: true, data: matches });
            }
        }
        );
    },    
    getMatch: (req, res) => {
        const matchId = req.params.matchId;
        const userId = req.params.userId;
        Match.findOne({ _id: matchId, $or: [{ firstUser: userId }, { secondUser: userId }] }, (err, match) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                if (match) {
                    res.json({ status: true, data: match });
                } else {
                    res.json({ status: false, message: 'Match not found' });
                }
            }
        });
    },
    addNewMatch: (req, res) => {
        const match = new Match(req.body);
        match.save((err, match) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                res.json({ status: true, data: match });
            }
        });
    },
    updateMatch: (req, res) => {
        const matchId = req.params.matchId;
        Match.findByIdAndUpdate(matchId, req.body, (err, match) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                res.json({ status: true, data: match });
            }
        });
    },
    deleteMatch: (req, res) => {
        const matchId = req.params.matchId;
        Match.findByIdAndRemove(matchId, (err, match) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                if (match) {
                    res.json({ status: true, data: match });
                }
                else {
                    res.json({ status: false, message: 'Match not found' });
                }
            }
        });
    },
}


module.exports = matchesController;


