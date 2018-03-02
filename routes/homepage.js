var activitySchema = require('../models/activity');
var mongoose = require('mongoose');
exports.view = function(req, res){
  res.render('homepage', {
  	user : req.user,
  	activities: req.user.activities
  });
};

exports.addActivity = function(req,res){
	mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect',function (err, database) {
   		if (err) 
   			throw err
   		else
   		{
			db = database;
			 var newActivity = { name:req.body.newAct};
    			db.collection.findOneAndUpdate( {email: req.user.local.email} , {activities:{name:newActivity}} );
			console.log('Connected to MongoDB');
   		}
 	});
    	//var collection = db.collection('users');
	//user.local.activities.push({name:newActivity});	
}