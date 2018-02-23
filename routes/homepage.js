
exports.view = function(req, res){
  res.render('homepage', {
  	user : req.user
  });
};
