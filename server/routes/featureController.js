const Feature = require('../models/Feature');


exports.getFeatureList = (req, res) => {
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
};

exports.addFeature = (req, res) => {
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
};