const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
	name: String,
	daysofweek: [String],
	notif_time: Date,
	comments: [String],
	Score: [Number],
	log_time: [Date]
});

const activity = mongoose.model('activity', activitySchema);

module.exports = activitySchema;