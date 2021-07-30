// onReady Events. Will be loaded while the bot is ready.

const client = require("../index.js");
const prefix = require("../config.json").prefix;
client.on("ready", () => {
  client.user.setActivity(`${prefix}help`);
  console.log(`${client.user.username} Is Logged on!`);
});
