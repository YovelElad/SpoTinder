require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const DB = require('../data/index.js');

var credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI 
};
  
var spotifyApi = new SpotifyWebApi(credentials);

var scopes = ['user-read-private','user-top-read' ,'user-read-email'],
redirectUri = process.env.REDIRECT_URI,
clientId = process.env.CLIENT_ID,
state = 'state';



function authorizeSpotify(userId,code) {
    spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        DB.addUser({
            id: userId,
            token: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
        });
        buildUserProfile(userId);
    }, function(err) {
        throw new Error('Unable to authorize!', err);
    });
}

function buildUserProfile(userId) {
    addUserPersonalInfo(userId);
    addUserTopArtists(userId);
    addUserTopTracks(userId);
}

async function addUserPersonalInfo(userId) {
    spotifyApi.getMe()
    .then(function(data) {
        user = DB.getUser(userId);
        user.name = data.body.display_name;
        user.email = data.body.email;
        user.country = data.body.country;
        user.image = data.body.images[0].url;
        DB.updateUser(userId, user);
    }, function(err) {
        throw new Error('Unable to get user profile!', err);
    });
}

async function addUserTopArtists(userId) {
    spotifyApi.getMyTopArtists({limit: 50})
    .then(function(data) {
        user = DB.getUser(userId);
        let artists = data.body.items;
        let artistsNames = [];
        artists.forEach(artist => {
            artistsNames.push(artist.name);
        });
        user.topArtists = artistsNames;
        DB.updateUser(userId, user);
    }, function(err) {
        throw new Error('Unable to get user top artists!', err);
    });
}

async function addUserTopTracks(userId) {
    spotifyApi.getMyTopTracks({limit: 50})
    .then(function(data) {
        user = DB.getUser(userId);
        let tracks = data.body.items;
        let tracksNames = [];
        tracks.forEach(track => {
            tracksNames.push(track.name);
        });
        user.topTracks = tracksNames;
        DB.updateUser(userId, user);
    }, function(err) {
        throw new Error('Unable to get user top tracks!', err);
    }
    ); 
}

function getAuthorizationUrl(userId) {
    return 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + clientId + '&scope=' + encodeURIComponent(scopes) + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&state=' + userId;
    // return spotifyApi.createAuthorizeURL(scopes, state);
}

module.exports = {
    authorizeSpotify,
    buildUserProfile,
    getAuthorizationUrl,
}