const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

/** MongoDB access ***********************************************************/
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

let db = mongoose.connection;
db.once('open', () => console.log('Connected to the database.'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/*****************************************************************************/

const app = require('./server');

app.listen(
	process.env.PORT,
	() => console.log(`LISTENING ON PORT ${process.env.PORT}`)
);