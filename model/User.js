var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    age: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profile:{
        type:String,
        required: false
    },
    description:{
        type: String,
        required: false
    },
    facebook:{
        type: String,
        required: false
    },
    instagram:{
        type: String,
        required: false
    },
    linkedin:{
        type: String,
        required: false
    },
    outro:{
        type: String,
        required: false
    },
    outraRede:{
        type: String,
        required: false
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;