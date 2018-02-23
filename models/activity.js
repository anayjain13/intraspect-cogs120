const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
	name: String,
	daysofweek: [String],
	notif_time: Date,
});

const activity = mongoose.model('activity', activitySchema);

module.exports = activity;