const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    name:{type:String},
    email:{type:String},
    country:{type:String},
    image:{type:String},
    spotifyId:{type:String},
    topArtists:{type:Array},
    topTracks:{type:Array},
    token:{type:String},
    refreshToken:{type:String}
},{collection:'users'});

const User = model('User', userSchema);
module.exports = User;