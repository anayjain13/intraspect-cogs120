const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
	name: String,
	daysofweek: [String],
	notif_time: Date,
	comments: {type:[String], default:['Inspiring first session','Felt at peace','Traffic made me angry']},
	Score: {type: [Number], default:[7,8,4]}
});

const activity = mongoose.model('activity', activitySchema);

module.exports = activity;