const mongoose = require('mongoose');
const chalk = require('chalk');

if (!process.env.MONGODB) return;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    console.log(chalk.greenBright.bold('MongoDB : Connected to the database!'))
  );
