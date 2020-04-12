var express = require('express');
var mongoose = require('../database/mongoose');
var Friendship = require('../model/Friendship');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

router.post('/friendship/:_id', ensureAuthenticate, (req, res, next) => {
    var usu = req.user._id;
    var friend = req.params._id;
    var data = Date.now();
    Friendship.findOne({user:usu, friend:friend})
        .then(data =>{
            if(data){

            }else{
                const newFriend = new Friendship({user, friend, inicio});
                newFriend.save()
                    .then(friend => {
                        res.render('perfil_seen', {logado:req.user});
                    })
                    .catch(next);
            }
        })
});

module.exports = router;