var activitySchema = require('../models/activity');
var mongoose = require('mongoose');
exports.view = function(req, res){
  res.render('homepage', {
  	user : req.user,
  	activities: req.user.activities
  });
};

// exports.addActivity = function(req,res){
// 	mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect',function (err, database) {
//    		if (err) 
//    			throw err
//    		else
//    		{
// 			db = database;
// 			 var newActivity = { name:req.user.local.email};
//     			//var currUser = db.collection('users').update( {email: req.user.local.email},{ $push: {activities:{newActivity}}});
//                             var collection = db.collection('users');
//                             console.log(req.body.newAct);
//                             collection.update({'local.email':req.user.local.email},
//                               {$push: {'local.activities' : newActivity}});
//                             //collection.find( {user.local : req.user.local.email}).push({})
// 			console.log('Connected to MongoDB');
//    		}
//  	});
    	//var collection = db.collection('users');
	//user.local.activities.push({name:newActivity});	
//}