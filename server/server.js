const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Feature = require('./models/Feature');
const Project = require('./models/Project');

require('dotenv').config({ path: 'variables.env' });

const API_PORT = 3001;
const app = express();
const router = express.Router();

/** MongoDB access ***********************************************************/
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('Connected to the database.'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/*****************************************************************************/

/** Middleware ***************************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
/*****************************************************************************/

app.get('/projectList', (req, res) => {
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

app.get('/featureList/:projectId', (req, res) => {
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

app.post('/addFeature', (req, res) => {
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

app.listen( API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`) );