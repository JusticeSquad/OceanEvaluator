const chai = require('chai');
const assert = chai.assert;
const Project = require('../models/Project');
const Feature = require('../models/Feature');
const testHelper = require('./testHelper');


describe('Feature Schema', function() {
	var dbProject;
	
	before(testHelper.connectToTestDb);
	beforeEach(function(done) {
		testHelper.resetTestDb(function() {
			var project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				dbProject = savedProject;
				
				done();
			});
		});
	});
	after(testHelper.closeConnectionToTestDb);
	
	describe('Get All', function() {
		it('Get All Features', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			
			feature.save(function(error, savedFeature) {
				testHelper.testSaveSuccess(error);
				
				Feature.find(function(error2, featureList) {
					assert(!error2, 'Unexpected error requesting schema list.');
					assert(featureList && featureList.length === 1,
						'Expected 1 Feature, but got ' + featureList.length);
					done();
				});
			});
		});
	});
	
	describe('Add Feature', function() {
		it('Successful Add', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			
			feature.save(function(error, savedFeature) {
				testHelper.testSaveSuccess(error);
				testHelper.testFeatureEquality(feature, savedFeature);
				done();
			});
		});
		
		it('Failed Add - No Name', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			feature.name = '';
			
			feature.save(function(error, savedFeature) {
				assert(error && error.errors && error.errors.name);
				
				var errorData = error.errors.name;
				assert(errorData.name === 'ValidatorError');
				assert(errorData.kind === 'required');
				assert(errorData.path === 'name');
				
				done();
			});
		});
		
		it('Failed Add - No Description', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			feature.description = '';
			
			feature.save(function(error, savedFeature) {
				assert(error && error.errors && error.errors.description);
				
				var errorData = error.errors.description;
				assert(errorData.name === 'ValidatorError');
				assert(errorData.kind === 'required');
				assert(errorData.path === 'description');
				
				done();
			});
		});
		
		it('Failed Add - No Project Id', function(done) {
			var feature = new Feature(testHelper.feature);
			
			feature.save(function(error, savedFeature) {
				assert(error && error.errors && error.errors.projectId);
				
				var errorData = error.errors.projectId;
				assert(errorData.name === 'ValidatorError');
				assert(errorData.kind === 'required');
				assert(errorData.path === 'projectId');
				
				done();
			});
		});
	});
	
	describe('Update Feature', function() {
		it('Update Existing Feature', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			
			feature.save(function(error, savedFeature) {
				testHelper.testSaveSuccess(error);
				
				var newDescription = 'Updated test description.';
				savedFeature.description = newDescription;
				
				savedFeature.save(function(error2, savedFeature2) {
					testHelper.testSaveSuccess(error);
					assert(savedFeature.name === savedFeature2.name);
					assert(savedFeature2.description === newDescription);
					
					done();
				});
			});
		});
	});
	
	describe('Delete Feature', function() {
		it('Delete Existing Feature', function(done) {
			var feature = new Feature(testHelper.feature);
			feature.projectId = dbProject._id;
			
			feature.save(function(error, savedFeature) {
				testHelper.testSaveSuccess(error);
				
				Feature.findByIdAndDelete(savedFeature._id, function(error2, deletedFeature) {
					testHelper.testDeleteSuccess(error2);
					
					Feature.findById(savedFeature._id, function(error3, foundFeature) {
						assert(!error3, 'Unexpected error requesting schema list.');
						assert(!foundFeature, 'Feature was not deleted.');
						
						done();
					});
				});
			});
		});
	});
});