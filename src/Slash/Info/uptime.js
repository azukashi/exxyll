const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const pretty = require('pretty-ms');

module.exports = {
	name: 'uptime',
	description: "Returns information about Exxyll's Uptime",
	userperm: 'SEND_MESSAGES',
	botperm: 'SEND_MESSAGES',
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {
		const embed = new MessageEmbed()
			.setTitle(`🕘 Exxyll's Uptime`)
			.setDescription(
				`\`\`\`yml\nStatus : Online\nUptime : ${pretty(client.uptime)}\n\`\`\``
			)
			.setColor(interaction.guild.me.displayHexColor);

		interaction.followUp({ embeds: [embed] });
	},
};
