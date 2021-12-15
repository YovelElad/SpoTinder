require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const DB = require('../data/index.js');

const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI 
};
const scopes = ['user-read-private','user-top-read' ,'user-read-email'];
  
function authorizeSpotify(userId,code) {
    const spotifyApi = new SpotifyWebApi(credentials);
    spotifyApi.authorizationCodeGrant(code)
    .then(function(data) {
        // spotifyApi.setAccessToken(data.body['access_token']);
        // spotifyApi.setRefreshToken(data.body['refresh_token']);
        const user = {
            id: userId,
            token: data.body['access_token'],
            refreshToken: data.body['refresh_token'],
        };
        // DB.addUser({
        //     id: userId,
        //     token: data.body['access_token'],
        //     refreshToken: data.body['refresh_token'],
        // });
        buildUserProfile(user);
    }, function(err) {
        throw new Error('Unable to authorize!', err);
    });
}

function buildUserProfile(user) {
    const spotifyApi = new SpotifyWebApi(credentials);
    let newUser = user;
    if (user && user.token) {
        spotifyApi.setAccessToken(user.token);
        spotifyApi.setRefreshToken(user.refreshToken);
        Promise.all([addUserPersonalInfo(user.id, spotifyApi),addUserTopArtists(user.id, spotifyApi),addUserTopTracks(user.id, spotifyApi)]).then((data) => {
            console.log(`User ${user.id} profile built! \n data:`);
            data.forEach(item => {
                console.log(item);
            });
            Object.assign(newUser, data[0]);
            Object.assign(newUser, data[1]);
            Object.assign(newUser, data[2]);
            DB.addUser(newUser);
            // console.log('User profile:', user);
        }).catch((err) => {
            console.log('Error:', err);
        });

    } else {
        console.log('No token found!');
        throw new Error(`No token found for user ${userId}!`);
    }
}

async function addUserPersonalInfo(userId, spotifyApi) {
    const data = await spotifyApi.getMe();
    console.log('User info!!!!!!:', data.body);
    const user = {}; // DB.getUser(userId);
    user.name = data.body.display_name;
    user.email = data.body.email;
    user.country = data.body.country;
    user.image = data.body.images[0].url;
    user.spotifyId = data.body.id;
    return user;

    // .then(function(data) {
    //     const user = {}; // DB.getUser(userId);
    //     user.name = data.body.display_name;
    //     user.email = data.body.email;
    //     user.country = data.body.country;
    //     user.image = data.body.images[0].url;
    //     user.spotifyId = data.body.id;
    //     // DB.updateUser(userId, user);
    //     return user;
    // }, function(err) {
    //     throw new Error('Unable to get user profile!', err);
    // });
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
    /*
    .then(function(data) {
        // user = DB.getUser(userId);
        const artists = data.body.items;
        const artistsNames = [];
        artists.forEach(artist => {
            artistsNames.push(artist.name);
        });
        const user = {};
        user.topArtists = artistsNames;
        // DB.updateUser(userId, user);
        return user;
    }, function(err) {
        throw new Error('Unable to get user top artists!', err);
    });
    */
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
    
    /*
    .then(function(data) {
        // user = DB.getUser(userId);
        const tracks = data.body.items;
        const tracksNames = [];
        tracks.forEach(track => {
            tracksNames.push(track.name);
        });
        const user = {};
        user.topTracks = tracksNames;
        // DB.updateUser(userId, user);
        return user;
    }, function(err) {
        throw new Error('Unable to get user top tracks!', err);
    }
    ); 
    */
}

function getAuthorizationUrl(userId) {
    return 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + process.env.CLIENT_ID + '&scope=' + encodeURIComponent(scopes) + '&redirect_uri=' + encodeURIComponent(process.env.REDIRECT_URI) + '&state=' + userId;
    // return spotifyApi.createAuthorizeURL(scopes, state);
}

module.exports = {
    authorizeSpotify,
    buildUserProfile,
    getAuthorizationUrl,
}