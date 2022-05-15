const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'djs',
	description: 'Search for a Class, Properties at Discord.js Docs',
	emoji: '<:djs:849590909943414806>',
	userperm: ['SEND_MESSAGES'],
	botperm: ['SEND_MESSAGES'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const query = args.join(' ');
		if (!query)
			return message.reply({ content: 'Please specify a query to search!' });
		const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
			query
		)}`;
		fetch(url)
			.then((res) => res.json())
			.then((body) => {
				message.channel.send({ embeds: [body] });
			});
	},
};
