require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

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

let code;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/setUp', (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?response_type=code&client_id=' + clientId + '&scope=' + encodeURIComponent(scopes) + '&redirect_uri=' + encodeURIComponent(redirectUri) + '&state=' + state);
});

app.get('/callback', (req, res) => {
    code = req.query.code || null;
    res.redirect('/');
});

app.get('/', (req, res) => {
    if(code) {
        spotifyApi.authorizationCodeGrant(code)
        .then(function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.send('<h1>Successfully logged in!</h1>');
        }, function(err) {
            console.log('Something went wrong!', err);
            res.send('<h1>Somthing went wrong</h1>');
        });
    } else {
        res.send('<h1>Please log in!</h1>');
    }
});

app.get('/topArtists', (req, res) => {
    spotifyApi.getMyTopArtists({limit: 50, time_range: 'long_term'})
    .then(function(data) {
        let artists = data.body.items;
        let artistsNames = [];
        artists.forEach(artist => {
            artistsNames.push(artist.name);
        });
        res.send("<h1>Top Artists</h1><ul>" + artistsNames.map(artist => "<li>" + artist + "</li>").join("") + "</ul>");
        }, function(err) {
            console.log('Something went wrong!', err);
            res.send('<h1>Somthing went wrong</h1>');
            });
    });

app.get('/topTracks', (req, res) => {
    spotifyApi.getMyTopTracks({limit: 50, time_range: 'long_term'})
    .then(function(data) {
        let tracks = data.body.items;
        let tracksNames = [];
        tracks.forEach(track => {
            tracksNames.push(track.name);
        });
        res.send("<h1>Top Tracks</h1><ul>" + tracksNames.map(track => "<li>" + track + "</li>").join("") + "</ul>");
        }, function(err) {
            console.log('Something went wrong!', err);
            res.send('<h1>Somthing went wrong</h1>');
            });
    }
);


// app.all('*', (req,res) => {
//     console.log(req.body);
//     console.log(req.query);
//     code = req.query.code;
//     // Retrieve an access token and a refresh token
//     spotifyApi.authorizationCodeGrant(code).then(
//       function(data) {
//         console.log('The token expires in ' + data.body['expires_in']);
//         console.log('The access token is ' + data.body['access_token']);
//         console.log('The refresh token is ' + data.body['refresh_token']);
    
//         // Set the access token on the API object to use it in later calls
//         spotifyApi.setAccessToken(data.body['access_token']);
//         spotifyApi.setRefreshToken(data.body['refresh_token']);

//         spotifyApi.getMyTopTracks()
//         .then(function(data) {
//             let topTracks = data.body.items;
//             let tracks = [];
//             for (let i = 0; i < topTracks.length; i++) {
//                 tracks.push(topTracks[i].name);
//             }
//             console.log(tracks);
//         }, function(err) {
//             console.log('Something went wrong!', err);
//         });

//       });
    
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
console.log(authorizeURL);
  