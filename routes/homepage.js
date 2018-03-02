var activitySchema = require('../models/activity');
exports.view = function(req, res){
  res.render('homepage', {
  	user : req.user,
  	activities: req.user.activities
  });
};

exports.addActivity = function(req,res){
	console.log('Enters function');
	var db = req.db;
    	var collection = db.get('users');
    	var newActivity = new Activity({ name:req.body.newAct});
    	// collection.findOneAndUpdate( {email: user.local.email} , $set{activities:{name:newActivity}} );
	newActivity.save()
		.then(item => {
			res.send(newActivity);
		})
		.catch(err => {
			res.status(400);
		});
	//user.local.activities.push({name:newActivity});	
	console.log('Add activity should be working.');
}