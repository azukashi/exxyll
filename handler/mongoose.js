const { mongooseConnectionString } = require("../config.json");
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = () => {
  if (!mongooseConnectionString) return;

  mongoose
    .connect(mongooseConnectionString, {
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(
      console.log(chalk.greenBright.bold("MongoDB")) +
        " : " +
        chalk.whiteBright.bold("Connected to the database!")
    );
};
