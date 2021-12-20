require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const DB = require('./data/index.js');
const app = express();
const port = process.env.PORT || 8888;
const api = require('./modules/spotifyAPI.js');
const match = require('./modules/matching.js');
var credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI 
};

const { usersRouter } = require('./routers/usersRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('frontend'));

app.use('/users', usersRouter);

app.all('*', (req, res) => {
    res.json({status: false, message: 'Route not found'});
    // res.sendFile(__dirname + '/frontend/404.html');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




// app.get('/setUp/:userId', (req, res) => {
//     const user = DB.getUser(req.params.userId);
//     if (user && user.token) {
//         res.send(`user is already set up!`);
//     } else {
//         console.log(`user ${req.params.userId} is not set up!`);
//         res.redirect(api.getAuthorizationUrl(req.params.userId));
//     }
// });

// app.get('/callback', (req, res) => {
//     const code = req.query.code || null;
//     console.log(req.query);
//     if (code) {
//         api.authorizeSpotify(req.query.state,code).then(user => {
//             console.log(`then of authorizeSpotify, user: ${user.id}`);
//             api.buildUserProfile(user).then((newUser) => {
//                 console.log(`then of buildUserProfile, user: ${newUser}`);
//                 DB.addUser(newUser);
//                 res.send(`<h1>Successfully logged in as ${newUser.name}!</h1>`);
//             })
//         });
            
//             /*
//             .then((user) => {
//                 console.log("in then, user id= " + user.id);
//                     DB.addUser(user);
//                 }).catch((err) => {
//                     console.log('Error:', err);
//                     res.send('<>Login Error: ' + err.message);
//                 });
//             });
//             */
            
//         // } catch (err) {
//         //     res.send('<h1>Login Error: ' + err.message + '</h1><br><a href="/setUp/' + req.query.id + '">Try again</a>');
//         // }
//         // res.redirect('/?id=' + req.query.state);
//     } else {
//         res.send(`error: ${req.query}`);
//     }
// });

// // app.get('/:id', (req, res) => {
// //     let userId = req.params.id;
// // })

// app.get('/', (req, res) => {
//     if (!req.query.id) {
//         res.send('<h1>Please enter a user id</h1>');
//     } else {
//         const user = DB.getUser(req.query.id);
//         if (!user) {
//             res.send('<h1>Please log in</h1> <a href="/setUp/' + req.query.id + '">Log in</a>');
//         } else {
//             res.send(`<h1>Welcome to the Spotify Matching App, ${user.name}</h1>`);
//         }
//     }
// });
//     // if(code) {
//     //     try {
//     //     } catch(err) {
//     //         console.log(err);
//     //         res.send('<h1>Error logging in!</h1>');
//     //     }
//     //     /*
//     //     spotifyApi.authorizationCodeGrant(code)
//     //     .then(function(data) {
//     //         spotifyApi.setAccessToken(data.body['access_token']);
//     //         spotifyApi.setRefreshToken(data.body['refresh_token']);
//     //         DB.addUser({
//     //             id: req.query.id,
//     //             token: data.body['access_token'],
//     //             refreshToken: data.body['refresh_token'],
//     //         });
//     //         res.send('<h1>Successfully logged in!</h1>');
//     //     }, function(err) {
//     //         console.log('Something went wrong!', err);
//     //         res.send('<h1>Somthing went wrong</h1>');
//     //     });
//     //     */
//     // } else {
//     //     res.send('<h1>Please log in!</h1>');
//     // }
// // });

// app.get('/topArtists/:id', (req, res) => {
//     let user = DB.getUser(req.params.id)
//     if(user) {
//         res.send("<h1>Top Artists</h1><ul>" + user.topArtists.map(artist => "<li>" + artist + "</li>").join("") + "</ul>");
//     }else {
//         res.send('<h1>Error getting top artists</h1>');
//     }

//     /*

//     spotifyApi.getMyTopArtists({limit: 50, time_range: 'long_term'})
//     .then(function(data) {
//         let artists = data.body.items;
//         let artistsNames = [];
//         artists.forEach(artist => {
//             artistsNames.push(artist.name);
//         });
//         res.send("<h1>Top Artists</h1><ul>" + artistsNames.map(artist => "<li>" + artist + "</li>").join("") + "</ul>");
//         }, function(err) {
//             console.log('Something went wrong!', err);
//             res.send('<h1>Somthing went wrong</h1>');
//             });
//             */
//     });

// app.get('/topTracks/:id', (req, res) => {
//     let user = DB.getUser(req.params.id);
//     if(user)
//         res.send("<h1>Top Tracks</h1><ul>" + user.topTracks.map(track => "<li>" + track + "</li>").join("") + "</ul>");
//     else {        
//         res.send('<h1>Error getting top tracks</h1>');
//     }

//     /*
//     spotifyApi.getMyTopTracks({limit: 50, time_range: 'long_term'})
//     .then(function(data) {
//         let tracks = data.body.items;
//         let tracksNames = [];
//         tracks.forEach(track => {
//             tracksNames.push(track.name);
//         });
//         res.send("<h1>Top Tracks</h1><ul>" + tracksNames.map(track => "<li>" + track + "</li>").join("") + "</ul>");
//         }, function(err) {
//             console.log('Something went wrong!', err);
//             res.send('<h1>Somthing went wrong</h1>');
//             });
//     }
//     */
// });

// app.get('/match', (req, res) => {
//     let matchScore = match.getMatchScore(req.query.userId, req.query.otherUserId);
//     res.send("<h1>Match Score</h1><h2>"+matchScore.name1+" and "+matchScore.name2+"</h2><h3>" + matchScore.score + "</h3>");
// });

// // app.all('*', (req,res) => {
// //     console.log(req.body);
// //     console.log(req.query);
// //     code = req.query.code;
// //     // Retrieve an access token and a refresh token
// //     spotifyApi.authorizationCodeGrant(code).then(
// //       function(data) {
// //         console.log('The token expires in ' + data.body['expires_in']);
// //         console.log('The access token is ' + data.body['access_token']);
// //         console.log('The refresh token is ' + data.body['refresh_token']);
    
// //         // Set the access token on the API object to use it in later calls
// //         spotifyApi.setAccessToken(data.body['access_token']);
// //         spotifyApi.setRefreshToken(data.body['refresh_token']);

// //         spotifyApi.getMyTopTracks()
// //         .then(function(data) {
// //             let topTracks = data.body.items;
// //             let tracks = [];
// //             for (let i = 0; i < topTracks.length; i++) {
// //                 tracks.push(topTracks[i].name);
// //             }
// //             console.log(tracks);
// //         }, function(err) {
// //             console.log('Something went wrong!', err);
// //         });

// //       });
    
// //     res.send('Hello World!');
// // });



// // var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
// // console.log(authorizeURL);
  