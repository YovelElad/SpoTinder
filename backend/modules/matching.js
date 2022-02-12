const db = require('../data/index.js');


async function calculateMatches(theUser) {
    console.log("calculateMatches");
    console.log(theUser);
    const userTopArtists = theUser.topArtists;
    const userTopTracks = theUser.topTracks;
    const userMatches = [];
    const users = await db.getUsers();
    console.log(`users: ${users.length}`);
    console.log(users[0]);
    users.forEach(async (user) => {
        if (theUser.id == user._id) {
            return;
        }
        if((user.interestedIn.includes(theUser.gender) && theUser.interestedIn.includes(user.gender))) {
            const matchScore = calculateMatchScore(user, userTopArtists, userTopTracks);
            if (matchScore.score > 0.5) {
                userMatches.push({firstUser:theUser.id, secondUser: user._id,score:matchScore.score, mutualArtists:matchScore.mutualArtists, mutualTracks:matchScore.mutualTracks});
            }
        }
    });
    userMatches.sort((a,b) => b.score - a.score);
    return userMatches;

}

function calculateMatchScore(user, userTopArtists, userTopTracks) {
    const userTopArtistsNames = user.topArtists;
    const userTopTracksNames = user.topTracks;
    let matchScore = 0;
    const artistsMatch = userTopArtists.filter(artist => userTopArtistsNames.includes(artist));
    const tracksMatch = userTopTracks.filter(track => userTopTracksNames.includes(track));
    const artistAvailable = Math.min(userTopArtistsNames.length, userTopArtists.length);
    const trackAvailable = Math.min(userTopTracksNames.length, userTopTracks.length);
    matchScore = ((artistsMatch.length + tracksMatch.length) / (artistAvailable + trackAvailable));
    return {
        score: matchScore,
        mutualArtists: artistsMatch,
        mutualTracks: tracksMatch      
    };
}

module.exports = {
    calculateMatches
};