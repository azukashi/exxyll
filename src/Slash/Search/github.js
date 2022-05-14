const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
  name: 'github',
  description: 'Returns GitHub User Information',
  options: [
    {
      type: 3,
      name: 'username',
      description: 'GitHub Username',
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
    const [username] = args;
    fetch(`https://luminabot.xyz/api/json/github?username=${username}`)
      .then((res) => res.json())
      .then((body) => {
        const embed = new MessageEmbed()
          .setTitle(`${body.name}`)
          .setURL(body.url)
          .setThumbnail(body.avatar)
          .addField(`Bio`, `${body.bio || 'No Bio'}`)
          .addField(`Location`, `${body.location || 'No Location'}`)
          .addField(`Email`, `${body.email || 'None'}`)
          .addField(`Website`, `${body.blog || 'No Website'}`)
          .addField(`Created at`, `${moment(body.created_at).format('LLLL')}`)
          .addField(`Followers`, `${body.followers}`)
          .addField(`Following`, `${body.following}`)
          .setColor('BLUE')
          .setTimestamp();

        interaction.followUp({ embeds: [embed] });
      })
      .catch((err) => {
        interaction.followUp({
          content: `User is not found!`,
          ephemeral: true,
        });
        console.log(err);
      });
  },
};
