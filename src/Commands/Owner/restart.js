require('dotenv').config();
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'restart',
	description: 'Restart the client',
	aliases: ['reboot'],
	emoji: '',
	userperm: ['SEND_MESSAGES'],
	botperm: ['SEND_MESSAGES'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!message.author.id === process.env.OWNERID) return;
		await message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle('✅ Successfully Restarted!')
					.setThumbnail(client.user.displayAvatarURL({ size: 512 }))
					.setDescription(
						`The Client Sucessfully Crashed with exit code 1.\n\nLoaded Commands : ${client.commands.size}\n\nNow, Just wait the Process Restarted by the Hosting Provider. Or, If i'm going offline, You can restart manually by Visiting Hosting Dashboard!`
					)
					.setColor('GREEN')
					.setFooter(`Restarted by ${message.author.username}`)
					.setTimestamp(),
			],
		});

		const masterLogger = client.channels.cache.get('855151075287498792');
		if (masterLogger) {
			await masterLogger.send({
				embeds: [
					new MessageEmbed()
						.setTitle('Client Restarted')
						.setThumbnail(
							message.author.displayAvatarURL({ dynamic: true, size: 512 })
						)
						.setDescription(`**Actioned by** : ${message.author.tag}`)
						.setColor('GREEN')
						.setTimestamp(),
				],
			});
		}

		return process.exit();
	},
};
