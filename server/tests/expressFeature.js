const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testHelper = require('./testHelper');
const Project = require('../models/Project');
const Feature = require('../models/Feature');
require('dotenv').config({ path: '../variables.env' });

let server;
chai.use(chaiHttp);

describe('Feature Routes', function() {
	let dbProject;
	
	before(function(done) {
		const app = require('../server');
		
		testHelper.connectToTestDb(function() {
			server = app.listen(process.env.PORT, done);
		});
	});
	
	beforeEach(function(done) {
		testHelper.resetTestDb(function() {
			var project = new Project(testHelper.project);
			
			project.save(function(error, savedProject) {
				testHelper.testSaveSuccess(error);
				testHelper.testProjectEquality(project, savedProject);
				
				dbProject = savedProject;
				
				var feature = new Feature(testHelper.feature);
				feature.projectId = dbProject._id;
				
				feature.save(function(error, savedFeature) {
					testHelper.testSaveSuccess(error);
					testHelper.testFeatureEquality(feature, savedFeature);
					
					done();
				});
			});
		});
	});
	
	describe('/featureList/:projectId', function() {
		it('Should Get All Features With the Given Project Id', function(done) {
			chai.request(server).get(`/featureList/${dbProject._id}`).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(200);
				expect(res.body.projectId).to.equal(dbProject.id);
				expect(res.body.featureList).be.a('array');
				expect(res.body.featureList).have.length(1);
				
				done();
			});
		});
	});
	
	describe('/addFeature', function() {
		it('Add Feature', function(done) {
			const feature = Object.assign({}, testHelper.feature, { projectId: dbProject.id });
			
			chai.request(server).post('/addFeature').send(feature).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(200);
				testHelper.testFeatureEquality(feature, res.body);
				
				done();
			});
		});
		
		it('Failed Add - No Name', function(done) {
			const feature = Object.assign(
				{},
				testHelper.feature,
				{ name: '', projectId: dbProject.id });
			
			chai.request(server).post('/addFeature').send(feature).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(412);
				expect(res.body.name).is.equal('ValidationError');
				
				done();
			});
		});
		
		it('Failed Add - No Description', function(done) {
			const feature = Object.assign(
				{},
				testHelper.feature,
				{ description: '', projectId: dbProject.id });
			
			chai.request(server).post('/addFeature').send(feature).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(412);
				expect(res.body.name).is.equal('ValidationError');
				
				done();
			});
		});
		
		it('Failed Add - No Project Id', function(done) {
			const feature = Object.assign({}, testHelper.feature);
			
			chai.request(server).post('/addFeature').send(feature).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(412);
				expect(res.body.name).is.equal('ValidationError');
				
				done();
			});
		});
	});
	
	after(function(done) {
		testHelper.closeConnectionToTestDb(done);
	});
});