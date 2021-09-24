const { mongooseConnectionString } = require('../config.json');
const mongoose = require('mongoose');
const chalk = require('chalk');

if (!mongooseConnectionString) return;

mongoose
  .connect(mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    console.log(chalk.greenBright.bold('MongoDB : Connected to the database!'))
  );
