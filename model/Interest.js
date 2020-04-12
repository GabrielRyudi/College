var mongoose = require('mongoose');
var InterestSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    subName:{
        type: String,
        required: true 
    }
});

var Interest = mongoose.model('Interest', InterestSchema);

module.exports = Interest;