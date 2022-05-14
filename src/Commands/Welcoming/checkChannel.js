const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
	name: 'check-welcome',
	description: 'Check where is Welcoming System is Enabled',
	aliases: ['check-welcoming'],
	emoji: '🤔',
	userperm: ['MANAGE_GUILD'],
	botperm: ['SEND_MESSAGES'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
			if (!data)
				return message.reply({ content: `This guild has no data stored.` });

			const channel = client.channels.cache.get(data.Channel);

			message.reply({
				content: `Welcoming Channel Has Been Set To => ${channel}. \n\nThis bot will automatically sends a Welcoming message to ${channel} when someone joins to this server!`,
			});
		});
	},
};
