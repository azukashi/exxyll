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
    weather.find(
      { search: location, degreeType: 'C' },
      function (error, result) {
        // 'C' can be changed to 'F' for farneheit results

        if (result === undefined || result.length === 0)
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setTitle('Error 404')
                .setDescription(`Couldn't Find This Country`),
            ],
          });

        const current = result[0].current;
        const locations = result[0].location;

        const roleColor =
          interaction.guild.me.displayHexColor === '#000000'
            ? '#ffffff'
            : interaction.guild.me.displayHexColor;

        const weatherinfo = new MessageEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather Information for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(roleColor)
          .addField('Timezone', `UTC${locations.timezone}`, true)
          .addField('Degree Type', 'Celsius', true)
          .addField('Temperature', `${current.temperature}°`, true)
          .addField('Wind', current.winddisplay, true)
          .addField('Feels like', `${current.feelslike}°`, true)
          .addField('Humidity', `${current.humidity}%`, true)
          .setFooter(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true })
          );

        interaction.followUp({ embeds: [weatherinfo] });
      }
    );
  },
};
