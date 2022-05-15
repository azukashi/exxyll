const { Client, Message, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'Search information about current weather in specific country',
	aliases: ['wthr'],
	emoji: '⛅',
	userperm: ['SEND_MESSAGES'],
	botperm: ['SEND_MESSAGES'],
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		weather.find(
			{ search: args.join(' '), degreeType: 'C' },
			function (error, result) {
				// 'C' can be changed to 'F' for farneheit results
				if (!args[0])
					return message.channel.send({
						embeds: [
							new MessageEmbed()
								.setTitle('Error Usage')
								.setDescription(`Usage: ${client.prefix}weather <place>`),
						],
					});

				if (result === undefined || result.length === 0)
					return message.channel.send({
						embeds: [
							new MessageEmbed()
								.setTitle('Error 404')
								.setDescription(`Couldn't Find This Country`),
						],
					});

				const current = result[0].current;
				const location = result[0].location;

				const roleColor =
					message.guild.me.displayHexColor === '#000000'
						? '#ffffff'
						: message.guild.me.displayHexColor;

				const weatherinfo = new MessageEmbed()
					.setDescription(`**${current.skytext}**`)
					.setAuthor(`Weather Information for ${current.observationpoint}`)
					.setThumbnail(current.imageUrl)
					.setColor(roleColor)
					.addField('Timezone', `UTC${location.timezone}`, true)
					.addField('Degree Type', 'Celsius', true)
					.addField('Temperature', `${current.temperature}°`, true)
					.addField('Wind', current.winddisplay, true)
					.addField('Feels like', `${current.feelslike}°`, true)
					.addField('Humidity', `${current.humidity}%`, true)
					.setFooter(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					);

				message.channel.send({ embeds: [weatherinfo] });
			}
		);
	},
};
