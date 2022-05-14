const { Client, Collection } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const fs = require('fs');
const prefixSchema = require('./src/Models/Prefix');
require('dotenv').config();

const client = new Client({
	intents: 32767,
});
module.exports = client;

// Append variables to client variable
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.categories = fs.readdirSync('./src/Commands');
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
	} catch (err) {}
};

// Initialize project
require('./src/Handler')(client);

// Initialize levelling function
require('./src/Utility/Levelling');

// Connect to database
require('./src/Handler/Mongoose');

client.login(process.env.TOKEN);
