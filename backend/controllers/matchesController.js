const Match = require('../models/matchModel');

const matchesController = {
    getAllMatchesOfUser: (req, res) => {
        const userId = req.params.userId;
        Match.find({ $or: [{ firstUser: userId }, { secondUser: userId }] }, (err, matches) => {
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
        Match.findById(matchId, (err, match) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                res.json({ status: true, data: match });
            }
        }
        );
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
                res.json({ status: true, data: match });
            }
        });
    },
}


module.exports = matchesController;


