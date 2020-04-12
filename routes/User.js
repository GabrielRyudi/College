var express = require('express');
var mongoose = require('../database/mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var User = require('../model/User');
var Post = require('../model/Post');
var Subject = require('../model/Materia');
var Comment = require('../model/Comment');
var Interest = require('../model/Interest');
var router = express.Router();

var {ensureAuthenticate} = require('../config/auth');

router.post('/register', (req, res, next) => {
    var {name, lastname, email, password, password2, age, gender} = req.body;
    let errors = [];
    if(!name || !lastname || !email || !password || !password2 || !age || !gender){
        errors.push({msg: 'Complete todos os campos'});
    }
    if(password.length < 6){
        errors.push({msg: 'A senha deve possuir ao menos 6 caractéres'});
    }
    if(password == '123456' || password == '1234567' || password == '12345678' || password == '123456789' || password == '123456789a' || password == 'abcdefg'){
        errors.push({msg: 'A senha não deve ser composta apenas de sequências'});
    }
    if(password != password2){
        errors.push({msg: 'As senhas não coincidem'});
    }
    if(errors.length > 0){
        res.render('register', {errors});
    }else{
        User.findOne({email:email})
            .then(user => {
                if(user){
                    errors.push({msg:'Esse email já existe'});
                    res.render('register', {errors});
                }else{
                    const newUser = new User({
                        name,
                        lastname,
                        email,
                        password,
                        age,
                        gender
                    });
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser. password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Você foi cadastrado com sucesso');
                                    res.redirect('/');
                                })
                                .catch(next);
                        })
                    );
                }
            });
    }
});

router.get('/perfil', ensureAuthenticate, (req, res, next) => {
    var _id = req.user._id;
    Post.find({authorId: _id})
        .then(datapost => {
            Subject.find({})
                .then(datasub => {
                    Comment.find({})
                        .then(datacom => {
                            Interest.find({user:_id})
                                .then(dataint => {
                                    res.render('perfil', {logado: req.user, post: datapost, subject: datasub, comment: datacom, interest:dataint});
                                })
                                .catch(next)
                        })
                        .catch(next)
                })
                .catch(next)   
        })
        .catch(next)
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('sucess_msg', 'Tchau!');
    res.redirect('/');
});

router.put('/attProfile', (req, res, next) => {
    var idUsu = req.user._id;
    var {name, lastname, email, gender, age, facebook, instagram, linkedin, outro, outraRede} = req.body;
    User.update({_id:idUsu}, {name:name, lastname:lastname, email:email, gender:gender, age:age, facebook:facebook, instagram:instagram, linkedin:linkedin, outro:outro, outraRede:outraRede})
        .then(data => {
            res.redirect('/user/perfil');
        })
        .catch(next)
});

router.put('/attProfileDescri', (req, res, next) => {
    var idUsu = req.user._id;
    var {description, profile} = req.body;
    User.update({_id:idUsu}, {description:description, profile:profile})
        .then(data => {
            res.redirect('/user/perfil');
        })
        .catch(next)
});

router.put('/attProfilePass', (req, res, next) => {
    idUsu = req.user._id;
    var{password} = req.body;
    bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) throw err;
                password = hash;
                User.update({_id:idUsu},{password:password})
                    .then(data => {
                        res.redirect('/user/perfil');
                    })
                    .catch(next);
        })
    );
})
module.exports = router;