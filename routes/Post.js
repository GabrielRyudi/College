var express = require('express');
var mongoose = require('../database/mongoose');
var Post = require('../model/Post');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

router.post('/addPost', ensureAuthenticate, (req, res, next) => {
    var {title, author, authorId, subject, content} = req.body;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let day = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    var date = year + "-" + month + "-" + day;
    const newPost = new Post({title, author, authorId, date, subject, content});
    newPost.save()
        .then(subject => {
            res.redirect('/dashboard');
        })
        .catch(err => console.log(err));
});

router.put('/updatePost', ensureAuthenticate, (req,res,next) => {
    var {_id,title, content, subject} = req.body;
    Post.updateOne({_id:_id}, {title:title, content:content, subject:subject})
        .then(data => {})
        .catch(next);
});

router.delete('/removePost/:_id', ensureAuthenticate, (req, res, next) => {
    var _id = req.param._id;
    Post.remove({_id:_id})
        .then(data => {})
        .catch(next)
});

module.exports = router;