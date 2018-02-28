
exports.view = function(req, res){
  res.render('history', {
  	user : req.user,
  	activities: req.user.activities
  });
};