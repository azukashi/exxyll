const fs = require("fs");
const { Client, Collection } = require("discord.js");
const { DiscordTogether } = require("discord-together");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
  ],
});
module.exports = client;

// ==> Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync("./commands/");
client.discordTogether = new DiscordTogether(client);
client.config = require("./config.json");

// ==> Initializing the project
require("./handler")(client);

// ==> Load levelling init
require("./utils/levelling");

client.login(client.config.token);
