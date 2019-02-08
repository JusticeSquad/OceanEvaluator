const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	}
});

module.exports = mongoose.model('Project', projectSchema);