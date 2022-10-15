const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Search information about current weather in specific country',
    options: [
        {
            type: 3,
            name: 'location',
            description: 'Location to search',
            required: true,
        },
    ],
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [location] = args;
        weather.find({ search: location, degreeType: 'C' }, function (error, result) {
            // 'C' can be changed to 'F' for farneheit results

            if (result === undefined || result.length === 0)
                return interaction.followUp({
                    embeds: [new MessageEmbed().setTitle('Error 404').setDescription(`Couldn't Find This Country`)],
                });

            const current = result[0].current;
            const locations = result[0].location;

            const roleColor =
                interaction.guild.me.displayHexColor === '#000000' ? '#ffffff' : interaction.guild.me.displayHexColor;

            const weatherinfo = new MessageEmbed()
                .setTitle(`Weather information for ${current.observationpoint}`)
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
                .setFooter({
                    text: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                });

            interaction.followUp({ embeds: [weatherinfo] });
        });
    },
};
