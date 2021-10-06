const mongoose = require('mongoose');
const chalk = require('chalk');

if (!process.env.MONGO || !process.env.MONGODEV) return;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    console.log(chalk.greenBright.bold('MongoDB : Connected to the database!'))
  );
