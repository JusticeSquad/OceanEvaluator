const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const testHelper = require('./testHelper');
const Project = require('../models/Project');
require('dotenv').config({ path: '../variables.env' });

let server;
chai.use(chaiHttp);

describe('Project Routes', function() {
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
				
				done();
			});
		});
	});
	
	describe('/projectList', function() {
		it('Should Get All Projects', function(done) {
			chai.request(server).get('/projectList').end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(200);
				expect(res.body).be.a('array');
				expect(res.body).have.length(1);
				
				done();
			});
		});
	});
	
	describe('/addProject', function() {
		it('Add Project', function(done) {
			const project = Object.assign({}, testHelper.project);
			
			chai.request(server).post('/addProject').send(project).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(200);
				testHelper.testProjectEquality(project, res.body);
				
				done();
			});
		});
		
		it('Failed Add - No Name', function(done) {
			const project = Object.assign({}, testHelper.project, { name: '' });
			
			chai.request(server).post('/addProject').send(project).end(function(error, res) {
				expect(!error);
				
				expect(res).have.status(412);
				expect(res.body.name).is.equal('ValidationError');
				
				done();
			});
		});
		
		it('Failed Add - No Description', function(done) {
			const project = Object.assign({}, testHelper.project, { description: '' });
			
			chai.request(server).post('/addProject').send(project).end(function(error, res) {
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