module.exports = {
    ensureAuthenticate: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Por favor faça o login');
        res.redirect('/');
    }
}