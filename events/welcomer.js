const Schema = require('../models/welcomeChannel.js');
const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
      if (!data) return;

      const channel = member.guild.channels.cache.get(data.Channel);
      const userAvatar = member.user.displayAvatar({
        dynamic: true,
        size: 512,
      });

      channel.send(
        new MessageEmbed()
          .setTitle('New Member!')
          .setThumbnail(userAvatar)
          .setDescription(`Hey ${member}, Welcome to **${member.guild.name}**`)
          .setFooter(`${member.guild.memberCount} members`)
          .setColor('BLUE')
          .setTimestamp()
      );
    });
  });
};
