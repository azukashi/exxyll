const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./events/").forEach((file) => {
    if (!file.endsWith(".js")) return; // filter the file

    require(`../events/${file}`)(client); // load event
  });
};
