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
        weather.find({ search: args.join(' '), degreeType: 'C' }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (!args[0])
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle('Error usage')
                            .setDescription(`Usage: ${client.prefix}weather <place>`),
                    ],
                });

            if (result === undefined || result.length === 0)
                return message.channel.send({
                    embeds: [new MessageEmbed().setTitle('404').setDescription(`Could not find this country`)],
                });

            const current = result[0].current;
            const location = result[0].location;

            const roleColor =
                message.guild.me.displayHexColor === '#000000' ? '#ffffff' : message.guild.me.displayHexColor;

            const weatherinfo = new MessageEmbed()
                .setTitle(`Weather information for ${current.observationpoint}`)
                .setDescription(`**${current.skytext}**`)
                .setThumbnail(current.imageUrl)
                .setColor(roleColor)
                .addFields(
                    { name: 'Timezone', value: `UTC${location.timezone}`, inline: true },
                    { name: 'Degree Type', value: 'Celsius', inline: true },
                    { name: 'Temperature', value: `${current.temperature}°`, inline: true },
                    { name: 'Wind', value: current.winddisplay, inline: true },
                    { name: 'Feels like', value: `${current.feelslike}°`, inline: true },
                    { name: 'Humidity', value: `${current.humidity}%`, inline: true }
                )
                .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

            message.channel.send({ embeds: [weatherinfo] });
        });
    },
};
