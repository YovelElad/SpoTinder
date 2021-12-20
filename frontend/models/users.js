const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    genderPreference: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    topArtists: {
        type: String,
        required: true
    },
    topTracks: {
        type: String,
        required: true
    },
    likes: {
        type: String,
        required: true
    },
    matches: {
        type: String,
        required: true
    },
})