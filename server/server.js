const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

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
		if( error )
		{
//			res.json();
			res.send({ error, msg: 'There was an error getting the project list' });
		}
		
		res.send(projectList);
	});
});
app.post('/project', (req, res) => {
});

app.listen( API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`) );