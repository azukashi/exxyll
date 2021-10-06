require('dotenv').config
const { Client, Message, MessageEmbed } = require('discord.js');
const prefix = process.env.PREFIX;

module.exports = {
  name: 'lockdown',
  description: 'Lockdown the server',
  aliases: ['lock-server'],
  emoji: '🔒',
  userperm: ['MANAGE_GUILD', 'SEND_MESSAGES'],
  botperm: ['MANAGE_GUILD', 'SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const role = message.guild.roles.everyone;
    const hello = new MessageEmbed()
      .setTitle(`Lockdown Server`)
      .setDescription(
        'Want to lock this server? You can lockdown this server by passing this options!'
      )
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
      .addField(
        `Available Options`,
        `\`true\` - Set Lockdown for this server\n\`false\` - Unlock this server from Lockdown Mode`
      )
      .addField(
        'Usage',
        `\`${prefix}lockdown true\` or \`${prefix}lockdown false\``
      )
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor('RED')
      .setTimestamp();
    if (!args.length) return message.channel.send({ embeds: [hello] });
    const query = args[0].toLowerCase();
    if (!['true', 'false'].includes(query))
      return message.reply({
        content: "The option you have stated isn't valid.",
      });
    const perms = role.permissions.toArray();

    if (query === 'false') {
      perms.push('SEND_MESSAGES');
      console.log(perms);
      await role.edit({ permissions: perms });
      message.channel.send({ content: 'Server is unlocked now.' });
    } else {
      const newPerms = perms.filter((perm) => perm !== 'SEND_MESSAGES');
      console.log(newPerms);

      await role.edit({ permissions: newPerms });
      message.channel.send({
        content: 'Server is Now Locked Down for `@everyone` Role.',
      });
    }
  },
};
