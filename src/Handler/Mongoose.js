const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

if (!process.env.MONGO) {
	process.exit(1);
}

mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		console.log(
			`${chalk.grey('[INFO] ')}${chalk.greenBright.bold(
				'Connected to the database!'
			)}`
		)
	);
