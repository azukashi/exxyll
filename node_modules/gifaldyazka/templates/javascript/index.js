const { Collection, Client, Discord } = require("discord.js");
const fs = require("fs");
const client = new Client({
  disableEveryone: true,
});
const config = require("./config.json");
const token = config.token;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
module.exports = client;
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);
