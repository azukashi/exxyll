const { Client, Message, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../models/prefix');
const prefix = require('../../config.json').prefix;

module.exports = {
  name: 'reset-prefix',
  description: 'Reset Customized Prefix to Default.',
  emoji: '🗑️',
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await prefixSchema.findOneAndDelete({ Guild: message.guild.id });
    message.channel.send(`The prefix has been reset to **${prefix}**`);
  },
};
