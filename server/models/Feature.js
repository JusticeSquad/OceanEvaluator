const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
	name: {
		type: String,
		trim: true,
	},
	projectId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Project'
	},
	description: {
		type: String,
		trim: true
	},
	facetList: [
		{
			name: {
				type: String,
				trim: true
			},
			min: Number,
			max: Number
		}
	]
});

module.exports = mongoose.model('Feature', featureSchema);