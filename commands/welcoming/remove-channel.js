const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcome-channel');

module.exports = {
  name: 'remove-welcome',
  description: 'Remove / Disable Welcoming Feature',
  aliases: ['remove-welcoming'],
  emoji: '🗑️',
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Schema.findOneAndDelete({ Guild: message.guild.id });
    message.reply({
      content: `Sucessfully removed and disable welcoming feature!`,
    });
  },
};
