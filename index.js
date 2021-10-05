const fs = require('fs');
const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const prefixSchema = require('./models/prefix');
const { Client, Collection, Intents } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const { prefix } = require('./config.json');
dotenv.config({ path: '/.env' });

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

// Connect to Mongoose
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    console.log(chalk.greenBright.bold('MongoDB : Connected to the database!'))
  );

// ==> Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./commands/');
client.discordTogether = new DiscordTogether(client);
client.config = require('./config.json');
client.prefix = async function (message) {
  try {
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
  } catch (err) {
    console.log('');
  }
};

// ==> Initializing the project
require('./handler')(client);

// ==> Load levelling init
require('./utils/levelling');

client.login(process.env.TOKEN);
