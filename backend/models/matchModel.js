const {Schema , model} = require('mongoose');

const matchSchema = new Schema({
    firstUser:{type:String , required:true},
    secondUser:{type:String , required:true},
    score:{type:Number , required:true},
    mutualArtists:{type:Array, required:true, default:[]},
    mutualTracks:{type:Array, required:true, default:[]},
    bothLiked:{type:Boolean, required:true, default:false},

},{collection:'matches'});

matchSchema.index({ firstUser: 1, secondUser: 1 }, { unique: true });

const Match = model('Match', matchSchema);
module.exports = Match;