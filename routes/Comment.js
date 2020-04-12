var express = require('express');
var mongoose = require('../database/mongoose');
var Comment = require('../model/Comment');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

router.post('/comentar', ensureAuthenticate, (req, res, next) => {
    var post = req.body.idCom;
    var content = req.body.comment;
    var user = req.user._id;
    var username = req.user.name;
    const newCom = new Comment({user, username, post, content});
    newCom.save()
        .then(com => {
            res.redirect('/dashboard');
        })
        .catch(next);
});

router.get('/excluirCom', ensureAuthenticate, (req, res, next) => {
    var _id = req.params._id;
    Comment.remove({_id: _id})
        .then(data => {
            res.redirect('/dashboard');
        })
        .catch(next)
})

module.exports = router;