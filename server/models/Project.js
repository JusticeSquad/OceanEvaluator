const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('Project', projectSchema);