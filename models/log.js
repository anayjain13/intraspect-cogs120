	// comments: [String],
	// Score: [Number],
	// log_time: [Date]
const mongoose = require('mongoose');

const activityLog = mongoose.Schema({
	comments: [String],
	score: [Number],
	 log_time: [Date]
});

const log = mongoose.model('log', activityLog);

module.exports = activityLog;