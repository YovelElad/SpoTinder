const db = require('../data/index.js');


function getMatchScore(userId1, userId2) {
    user1 = db.getUser(userId1);
    user2 = db.getUser(userId2);
    if (user1 == null || user2 == null) {
        throw new Error('User not found');
    }
    let artistsMatch = user1.topArtists.filter(artist => user2.topArtists.includes(artist)).length;
    let tracksMatch = user1.topTracks.filter(track => user2.topTracks.includes(track)).length;
    return {
        score: ((artistsMatch + tracksMatch) / (user1.topArtists.length + user1.topTracks.length)) * 100,
        name1: user1.name,
        name2: user2.name
    };
}

module.exports = {
    getMatchScore
};