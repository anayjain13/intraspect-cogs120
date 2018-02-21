exports.view = function(req, res){
  res.render('signup', { message: req.flash('signupMessage') });
};