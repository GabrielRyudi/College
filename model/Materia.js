var mongoose = require('mongoose');
var SubjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
});

var Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;