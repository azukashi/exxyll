const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
  name: 'github',
  description: 'Returns GitHub User Information',
  aliases: ['gh'],
  emoji: '🐈',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const user = args.join(' ');
    if (!user)
      return message.reply({
        content: 'Please specify a GitHub username to search!',
      });
    fetch(`https://luminabot.xyz/api/json/github?username=${user}`)
      .then((res) => {
        if (res.status === 404)
          return message.reply({ content: 'User is not found!' });
        res.json();
      })
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

        message.channel.send({ embeds: [embed] });
      })
      .catch((err) => {
        message.reply({
          content: `User is not found!`,
        });
        console.log(err);
      });
  },
};
