var mongoose = require('mongoose');
var FriendshipSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    friend:{
        type:String,
        required:true
    },
    inicio:{
        type:Date,
        required:true
    }
});

var Friendship = mongoose.model('Friendship', FriendshipSchema);

module.exports = Friendship;