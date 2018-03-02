exports.view = function(req, res){
  res.render('profile' , {
  	user : req.user
  });
};
