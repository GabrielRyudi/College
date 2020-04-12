var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    post:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;