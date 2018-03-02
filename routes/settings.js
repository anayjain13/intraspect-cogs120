exports.view = function(req, res){
  res.render('settings', {
  	user : req.user,
  	activities: req.user.activities
  });
};