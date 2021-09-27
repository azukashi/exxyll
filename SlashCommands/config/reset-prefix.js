const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../models/prefix');
const prefix = require('../../config.json').prefix;

module.exports = {
  name: 'reset-prefix',
  description: 'Reset current prefix to default prefix',
  options: [],
  userPermission: ['MANAGE_GUILD'],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await prefixSchema.findOneAndDelete({ Guild: interaction.guild.id });
    interaction.followUp({
      content: `The prefix has been reset to **${prefix}**`,
    });
  },
};
