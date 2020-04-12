var express = require('express');
var Post = require('../model/Post');
var Subject = require('../model/Materia');
var Comment = require('../model/Comment');
var Interest = require('../model/Interest');
var router = express.Router();
    
var {ensureAuthenticate} = require('../config/auth');

router.get('/', (req, res, next) => {
    res.render('login');
});

router.get('/versioning', ensureAuthenticate,(req, res, next) => {
    res.render('versoes');
});

router.get('/updPerfil', ensureAuthenticate, (req, res, next) => {
    Comment.find({})
        .then(data => {
            res.render('updPerfil', {logado: req.user, subject: data});
        })
        .catch(next)
});

router.get('/register', (req,res,next) => {
    res.render('register');
})

router.get('/dashboard', ensureAuthenticate, (req, res, next) => {
    var usu = req.user._id;
    Post.find({})
        .then(datapost => {
            Subject.find({})
                .then(datasub => {
                    Comment.find({})
                        .then(datacom => {
                            Interest.find({user:usu})
                                .then(dataint => {
                                    res.render('dashboard', {logado: req.user, post: datapost, subject: datasub, comment: datacom, interest:dataint});
                                })
                                .catch(next)
                        })
                        .catch(next)
                })
                .catch(next)   
        })
        .catch(next)
});

router.get('/config', ensureAuthenticate, (req, res, next) => {
    Subject.find({})
        .then(datasub => {
            res.render('config', {logado: req.user, subject: datasub});
        })
        .catch(next)
});

module.exports = router;