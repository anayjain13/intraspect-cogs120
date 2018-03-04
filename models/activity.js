const mongoose = require('mongoose');
var activityLog = require('./log');

const activitySchema = mongoose.Schema({
	name: String,
	daysofweek: [String],
	notif_time: Date,
	log: [activityLog]
});

const activity = mongoose.model('activity', activitySchema);

module.exports = activitySchema;