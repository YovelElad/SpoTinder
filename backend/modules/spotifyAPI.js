require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const DB = require('../data/index.js');

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI 
};
const scopes = ['user-read-private','user-top-read' ,'user-read-email'];
  
async function authorizeSpotify(userId,code) {
    const spotifyApi = new SpotifyWebApi(credentials);
    const data = await spotifyApi.authorizationCodeGrant(code);
    const user = {};
    user.token = data.body.access_token;
    user.refreshToken = data.body.refresh_token;
    user.id= userId;
    return user;
}

async function buildUserProfile(user) {
    const spotifyApi = new SpotifyWebApi(credentials);
    let newUser = user;
    if (user && user.token) {
        spotifyApi.setAccessToken(user.token);
        spotifyApi.setRefreshToken(user.refreshToken);
        const data = await Promise.all([addUserPersonalInfo(user.id, spotifyApi),addUserTopArtists(user.id, spotifyApi),addUserTopTracks(user.id, spotifyApi)]);
        let newUser = user;
        Object.assign(newUser, data[0]);
        Object.assign(newUser, data[1]);
        Object.assign(newUser, data[2]);
        return newUser;
    } else {
        console.log('No token found!');
        throw new Error(`No token found for user ${userId}!`);
    }
}

async function addUserPersonalInfo(userId, spotifyApi) {
    const data = await spotifyApi.getMe();
    const user = {}; 
    user.name = data.body.display_name;
    user.email = data.body.email;
    user.country = data.body.country;
    user.image = data.body.images[0].url;
    user.spotifyId = data.body.id;
    return user;
}

async function addUserTopArtists(userId, spotifyApi) {
    const data = await spotifyApi.getMyTopArtists({time_range:"long_term"});
    const artists = data.body.items;
    const artistsNames = [];
    artists.forEach(artist => {
        artistsNames.push(artist.name);
    });
    const user = {};
    user.topArtists = artistsNames;
    return user;
}

async function addUserTopTracks(userId, spotifyApi) {
    const data = await spotifyApi.getMyTopTracks({limit: 50});
    const tracks = data.body.items;
    const tracksNames = [];
    tracks.forEach(track => {
        tracksNames.push(track.name);
    });
    const user = {};
    user.topTracks = tracksNames;
    return user;
}

function getAuthorizationUrl(userId) {
    return 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + process.env.CLIENT_ID + '&scope=' + encodeURIComponent(scopes) + '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URI) + '&state=' + userId;
}

module.exports = {
    authorizeSpotify,
    buildUserProfile,
    getAuthorizationUrl,
}