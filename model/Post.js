var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
