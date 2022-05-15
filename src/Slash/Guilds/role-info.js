const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'roleinfo',
	description: 'Returns Role Information',
	options: [
		{
			type: 8,
			name: 'role',
			description: 'Role to show information about',
			required: true,
		},
	],
	userperm: 'SEND_MESSAGES',
	botperm: 'SEND_MESSAGES',
	/**
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {
		// Check days function
		function checkDays(date) {
			let now = new Date();
			let diff = now.getTime() - date.getTime();
			let days = Math.floor(diff / 86400000);
			return days + (days == 1 ? ' day' : ' days') + ' ago';
		}

		const [role] = args;
		const mentionedRole = client.guilds.cache
			.get(interaction.guild.id)
			.roles.cache.get(role);
		const guildIcon = client.guilds.cache
			.get(interaction.guild.id)
			.iconURL({ dynamic: true, size: 512 });
		const embed = new MessageEmbed()
			.setTitle(
				`<:role:863214921574907915> Role Information for ${mentionedRole.name}`
			)
			.setColor('#800080')
			.setThumbnail(guildIcon)
			.addField('Role ID', `${mentionedRole.id}`)
			.addField('Role Position', `${mentionedRole.rawPosition}`)
			.addField('Role Color', `${mentionedRole.hexColor}`)
			.addField('Users', `${mentionedRole.members.size}`)
			.addField('Mentionable', `${mentionedRole.mentionable ? 'Yes' : 'No'}`)
			.addField('Hoist', `${mentionedRole.hoist ? 'True' : 'False'}`)
			.addField(
				'Creation Date',
				`${moment(mentionedRole.createdAt).format('LLLL')} (${checkDays(
					mentionedRole.createdAt
				)})`
			)
			.setFooter(interaction.user.tag)
			.setTimestamp();

		interaction.followUp({ embeds: [embed] });
	},
};
