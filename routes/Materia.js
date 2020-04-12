var express = require('express');
var mongoose = require('../database/mongoose');
var Subject = require('../model/Materia');
var Interest = require('../model/Interest');
var Post = require('../model/Post');
var Comment = require('../model/Comment');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

router.get('/addSub', (req, res, next) => {
    res.render("addSub");
}); 

router.post('/addSub', (req, res, next) => {
    var {name} = req.body;
    const newSubject = new Subject({name});
    newSubject.save()
        .then(subject => {
            res.render('addSub');
        })
        .catch(next);
});

router.get('/mySubs/:_id', ensureAuthenticate, (req, res, next) => {
    var subject = req.params._id;
    var user = req.user._id;
    Subject.findOne({_id:subject})
        .then(data => {
            if(data){
                var subName = data.name;
                const newInterest = new Interest({subject,user,subName});
                newInterest.save()
                    .then(inte => {
                        res.json(inte);
                    })
                    .catch(next);
            }else{
                res.redirect('/listSub');
                console.log("sa");
            }
        })
        .catch(next);
});

router.get('/listSub', ensureAuthenticate, (req, res, next) => {
    Subject.find({})
        .then(data => {
            const user = req.user._id;
            Interest.find({user:user})
                .then(dataint => {
                    res.render('subs_page', {subject: data, interest: dataint, logado: req.user});
                })
                .catch(next);
        })
        .catch(next);
});

router.get('/subsPost/:_id', ensureAuthenticate, (req, res, next) => {
    var materia = req.params._id;
    Subject.findOne({_id:materia})
        .then(data => {
            var materia = data.name;
            Post.find({subject:materia})
                .then(dataP => {
                    Subject.find({})
                        .then(datasub => {
                            Comment.find({})
                                .then(datacom => {
                                    res.render('sub_post', {post:dataP, logado: req.user, subject: datasub, comment: datacom});
                                })
                                .catch(next);
                        })
                })
                .catch(next);
        })
        .catch(next);
});

module.exports = router;

/* 
Pense no seguinte, na hora de fazer o select, o sistema ver se existe uma relaçã, na amizade, ou no caso do like 
em materias e mandar no render, uma classe ou parametro pra modificar o html.
*/