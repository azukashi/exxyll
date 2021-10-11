const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');
const fetch = require('node-fetch');

module.exports = {
  name: 'userinfo',
  description: 'Returns user information',
  aliases: ['user-info', 'userinf', 'profile'],
  emoji: '👤',
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const checkDays = (date) => {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return days + (days == 1 ? ' day' : ' days') + ' ago';
    };
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    // Fetch & get user banner
    fetch(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.banner) {
          const extension = body.banner.startsWith('a_') ? '.gif' : '.png';
          const bannerUrl =
            `https://cdn.discordapp.com/banners/${user.id}/${body.banner}${extension}?size=1024` ||
            "User doesn't have a banner!";
          let embed = new MessageEmbed()
            .setTitle(`${user.username}'s User Information`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('BLUE')
            .addField('User Tag', user.tag)
            .addField('User ID', user.id)
            .addField(
              'Created At',
              `${moment(user.createdAt).format('LLLL')} (${checkDays(
                user.createdAt
              )})`
            )
            .addField(
              'Joined At',
              `${moment(member.joinedAt).format('LLLL')} (${checkDays(
                member.joinedAt
              )})`
            )
            .addField('Highest Role', `<@&${member.roles.highest.id}>`)
            .addField('Roles', member.roles.cache.map((r) => `${r}`).join(' | '))
            .setImage(bannerUrl)
            .setFooter(message.author.tag)
            .setTimestamp();
          message.channel.send({ embeds: [embed] });
        } else {
          if (body.accent_color) {
            const bannerColor = body.accent_color;
            let embed = new MessageEmbed()
              .setTitle(`${user.username}'s User Information`)
              .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
              .setColor(bannerColor)
              .addField('User Tag', user.tag)
              .addField('User ID', user.id)
              .addField(
                'Created At',
                `${moment(user.createdAt).format('LLLL')} (${checkDays(
                  user.createdAt
                )})`
              )
              .addField(
                'Joined At',
                `${moment(member.joinedAt).format('LLLL')} (${checkDays(
                  member.joinedAt
                )})`
              )
              .addField('Highest Role', `<@&${member.roles.highest.id}>`)
              .addField(
                'Roles',
                member.roles.cache.map((r) => `${r}`).join(' | ')
              )
              .setFooter(message.author.tag)
              .setTimestamp();
            message.channel.send({ embeds: [embed] });
          } else {
            let embed = new MessageEmbed()
              .setTitle(`${user.username}'s User Information`)
              .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
              .setColor('BLUE')
              .addField('User Tag', user.tag)
              .addField('User ID', user.id)
              .addField(
                'Created At',
                `${moment(user.createdAt).format('LLLL')} (${checkDays(
                  user.createdAt
                )})`
              )
              .addField(
                'Joined At',
                `${moment(member.joinedAt).format('LLLL')} (${checkDays(
                  member.joinedAt
                )})`
              )
              .addField('Highest Role', `<@&${member.roles.highest.id}>`)
              .addField(
                'Roles',
                member.roles.cache.map((r) => `${r}`).join(' | ')
              )
              .setFooter(message.author.tag)
              .setTimestamp();
            message.channel.send({ embeds: [embed] });
          }
        }
      });
  },
};
