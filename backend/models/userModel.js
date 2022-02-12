const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    country: { type: String },
    image: { type: String },
    id: { type: String },
    topArtists: { type: Array },
    topTracks: { type: Array },
    token: { type: String },
    refreshToken: { type: String },
    gender: { type: String, lowercase: true },
    interestedIn: { type: Array },
    role: {type: Schema.Types.ObjectId, ref: "Role"}
}, { collection: 'users' });


const User = model('User', userSchema);
module.exports = User;