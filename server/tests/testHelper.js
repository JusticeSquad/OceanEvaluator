const mongoose = require('mongoose');
const chai = require('chai');
const assert = chai.assert;
require('dotenv').config({ path: '../variables.env' });

/** MongoDB Connections ******************************************************/
exports.connectToTestDb = function(callback) {
	mongoose.connect(process.env.TEST_DATABASE, { useNewUrlParser: true });
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Error connecting to DB'));
	db.once('open', callback);
};

exports.resetTestDb = function(callback) {
	mongoose.connection.db.dropDatabase(callback);
};

exports.closeConnectionToTestDb = function(callback) {
	mongoose.connection.db.dropDatabase(function() {
		mongoose.connection.close(callback);
	});
};
/*****************************************************************************/

/** Test Data ****************************************************************/
exports.project = {
	name: 'Test Project',
	description: 'A project for testing.'
};

exports.feature = {
	name: 'Test Feature',
	description: 'A feature for testing.',
	projectId: null,
	facetList: [
		{
			name: 'Imagination',
			min: 20,
			max: 40
		}
	]
};
/*****************************************************************************/

/** Common Test Functions ****************************************************/
exports.testProjectEquality = function(project1, project2) {
	assert(project1.name === project2.name);
	assert(project1.description === project2.description);
};

exports.testFeatureEquality = function(feature1, feature2) {
	assert(feature1.name === feature2.name);
	assert(feature1.description === feature2.description);
	assert(feature1.projectId === feature2.projectId);
};

exports.testSaveSuccess = function(error) {
	assert(!error, 'There was an unexpected error while saving.');
};

exports.testDeleteSuccess = function(error) {
	assert(!error, 'There was an unexpected error while deleting.');
};
/*****************************************************************************/