const fs = require('fs');
const { Collection, Client, Intents } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const { prefix } = require('./config.json');
const prefixSchema = require('./models/prefix');
const dotenv = require('dotenv');
dotenv.config();

require('discord-reply');
require('./utils/database'); // connect to mongodb

const client = new Client({ disableEveryone: true });

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./commands/');
client.discordTogether = new DiscordTogether(client);

['command', 'event'].forEach((handler) => {
  require(`./handlers/${handler}`)(client); // load command, event, and music-player
});

/**
 * @param {Client} client
 */
client.prefix = async function (message) {
  let custom;

  const data = await prefixSchema
    .findOne({ Guild: message.guild.id })
    .catch((err) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};

client.login(process.env.TOKEN);
