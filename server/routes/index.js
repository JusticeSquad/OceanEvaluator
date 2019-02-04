const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');
const Project = require('../models/Project');

router.get('/projectList', (req, res) => {
	Project.find((error, projectList) => {
		// TODO: Improve error handling
		if( error )
		{
//			res.json();
			res.send({ error, msg: 'There was an error getting the project list' });
		}
		
		res.send(projectList);
	});
});

router.post('/addProject', (req, res) => {
	const newProject = {
		name: req.body.name,
		description: req.body.description
	};
	
	// TODO: Improve error handling
	(new Project(newProject)).save((error, project) => {
		if( error )
			res.status(412).send(error);
		else
			res.json(project);
	});
});

router.get('/featureList/:projectId', (req, res) => {
	Feature.find(
		{ projectId: req.params.projectId },
		(error, featureList) => {
			// TODO: Improve error handling
			if( error )
			{
				res.send({ error, msg: 'There was an error getting the feature list' });
			}
			
			res.json({ featureList, projectId: req.params.projectId });
		}
	);
});

router.post('/addFeature', (req, res) => {
	const newFeature = {
		name: req.body.name,
		projectId: req.body.projectId,
		description: req.body.description,
		facetList: req.body.facetList
	};
	
	// TODO: Improve error handling
	(new Feature(newFeature)).save((error, feature) => {
		if( error )
			res.status(412).send(error);
		else
			res.json(feature);
	});
});


module.exports = router;