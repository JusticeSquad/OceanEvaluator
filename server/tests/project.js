const chai = require('chai');
const assert = chai.assert;
const Project = require('../models/Project');
const testHelper = require('./testHelper');


describe('Project Schema', function() {
	before(testHelper.connectToTestDb);
	beforeEach(testHelper.resetTestDb);
	after(testHelper.closeConnectionToTestDb);
	
	describe('Get All', function() {
		it('Get All Projects', function(done) {
			const project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				testHelper.testSaveSuccess(error);
				
				Project.find(function(error2, projectList) {
					assert(!error2, 'Unexpected error requesting schema list.');
					assert(
						projectList.length === 1,
						'Expected 1 Project, but got ' + projectList.length);
					done();
				});
			});
		});
	});
	
	describe('Add Project', function() {
		it('Successful Add', function(done) {
			var project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				testHelper.testSaveSuccess(error);
				testHelper.testProjectEquality(project, savedProject);
				done();
			});
		});
		
		it('Failed Add - No Name', function(done) {
			var project = new Project({
				name: '',
				description: testHelper.project.description
			});
			
			project.save(function(error, savedProject) {
				assert(error && error.errors && error.errors.name);
				
				var errorData = error.errors.name;
				assert(errorData.name === 'ValidatorError');
				assert(errorData.kind === 'required');
				assert(errorData.path === 'name');
				
				done();
			});
		});
		
		it('Failed Add - No Description', function(done) {
			var project = new Project({
				name: testHelper.project.name,
				description: ''
			});
			
			project.save(function(error, savedProject) {
				assert(error && error.errors && error.errors.description);
				
				var errorData = error.errors.description;
				assert(errorData.name === 'ValidatorError');
				assert(errorData.kind === 'required');
				assert(errorData.path === 'description');
				
				done();
			});
		});
	});
	
	describe('Update Project', function() {
		it('Update Existing Project', function(done) {
			var project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				testHelper.testSaveSuccess(error);
				
				var newDescription = 'Updated test description.';
				savedProject.description = newDescription;
				
				savedProject.save(function(error2, savedProject2) {
					testHelper.testSaveSuccess(error);
					assert(savedProject.name === savedProject2.name);
					assert(savedProject2.description === newDescription);
					
					done();
				});
			});
		});
	});
	
	describe('Delete Project', function() {
		it('Delete Existing Project', function(done) {
			var project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				testHelper.testSaveSuccess(error);
				
				Project.findByIdAndDelete(savedProject._id, function(error2, deletedProject) {
					testHelper.testDeleteSuccess(error2);
					
					Project.findById(savedProject._id, function(error3, foundProject) {
						assert(!error3, 'Unexpected error requesting schema list.');
						assert(!foundProject, 'Project was not deleted.');
						
						done();
					});
				});
			});
		});
	});
});