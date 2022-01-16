const {Schema , model} = require('mongoose');

const messageSchema = new Schema({
    sender: {type: String, required: true},
    recipient: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const matchSchema = new Schema({
    firstUser:{type:String , required:true},
    secondUser:{type:String , required:true},
    score:{type:Number , required:true},
    mutualArtists:{type:Array, required:true, default:[]},
    mutualTracks:{type:Array, required:true, default:[]},
    firstUserLiked:{type:Boolean , required:true, default:false},
    secondUserLiked:{type:Boolean , required:true, default:false},
    messages:[messageSchema],
},{collection:'matches'});

matchSchema.index({ firstUser: 1, secondUser: 1 }, { unique: true });

const Match = model('Match', matchSchema);
module.exports = Match;