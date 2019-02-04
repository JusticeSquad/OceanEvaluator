const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');

require('dotenv').config({ path: 'variables.env' });

const API_PORT = 3001;
const app = express();

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

app.use('/', routes);

app.listen( API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`) );