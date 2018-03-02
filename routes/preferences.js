exports.view = function(req, res){
  res.render('preferences', {
  	user : req.user,
  	activities: req.user.activities
  });
};
