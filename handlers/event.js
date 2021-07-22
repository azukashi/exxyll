const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./events/").forEach((file) => {
    if (!file.endsWith(".js")) return; // filter the file

    const event = require(`../events/${file}`); // load event from file

    if (!event.name) return; // filter invalid event -> useless

    client.events.set(event.name, event); // set event to bot -> useless
  });
};
