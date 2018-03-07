var activitySchema = require('../models/activity');
var mongoose = require('mongoose');
exports.view = function(req, res){
  res.render('homepage', {
  	user : req.user,
  	activities: req.user.activities
  });
};
