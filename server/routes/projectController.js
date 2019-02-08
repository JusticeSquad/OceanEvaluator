const Project = require('../models/Project');


exports.getProjectList = (req, res) => {
	Project.find((error, projectList) => {
		// TODO: Improve error handling
		if( error )
		{
			res.send({ error, msg: 'There was an error getting the project list' });
		}
		
		res.send(projectList);
	});
};

exports.addProject = (req, res) => {
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
};