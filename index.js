const fs = require('fs');
const chalk = require('chalk');
const mongoose = require('mongoose');
const prefixSchema = require('./models/prefix');
const { Client, Collection } = require('discord.js');
const { DiscordTogether } = require('discord-together');
require('dotenv').config();

const client = new Client({
	intents: 32767,
});
module.exports = client;

// Connect to Mongoose
mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(
		console.log(chalk.greenBright.bold('[Mongoose] Connected to the database!'))
	);

// ==> Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./commands/');
client.discordTogether = new DiscordTogether(client);
client.config = process.env;
client.prefix = async (message) => {
	try {
		let custom;
		const data = await prefixSchema
			.findOne({ Guild: message.guild.id })
			.catch((err) => console.log(err));

		if (data) {
			custom = data.Prefix;
		} else {
			custom = process.env.PREFIX;
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
