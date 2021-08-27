const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { DiscordTogether } = require("discord-together");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
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
