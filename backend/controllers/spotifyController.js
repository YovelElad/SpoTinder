const api = require('../modules/spotifyAPI');
const matchEngine = require('../modules/matching');

callback = (req, res) => {
    const code = req.query.code || null;
    console.log(req.query);
    if (code) {
        const userId = req.query.state;
        api.authorizeSpotify(userId,code).then(user => {
            console.log(`then of authorizeSpotify, user: ${user.id}`);
            api.buildUserProfile(user).then((newUser) => {
                console.log(`then of buildUserProfile, user: ${newUser}`);
                matchEngine.calculateMatches(newUser).then((matches) => {
                    console.log(`then of calculateMatches, user: ${matches}`);
                    newUser.matches = matches;
                    // DB.addUser(newUser);
                    // res.redirect('/');
                    res.json({status: true, data: newUser});
                })
            })
        });                    
    } else {
        console.log(`error: ${req.query}`);
        res.json({status:false, message: 'Error logging in to spotify'});
    }
} // should determine if user is sign up or not if not then 

login = (req, res) => {
    const url = api.getAuthorizationUrl(1); // 1 is the user id - we dont use this yet
    res.redirect(url);
    // res.json({status: true, data: url});
} 

module.exports = {
    callback,
    login
}