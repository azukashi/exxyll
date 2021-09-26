const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcome-channel');

module.exports = {
  name: 'disable-welcome',
  description: 'Disable and Remove Welcoming Feature',
  options: [],
  userPermissions: ['MANAGE_GUILD'],
  userperm: ['MANAGE_GUILD'],
  botperm: ['MANAGE_GUILD'],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    await Schema.findOneAndDelete({ Guild: interaction.guild.id });
    interaction.followUp({
      content: `Sucessfully removed and disable welcoming feature!`,
    });
  },
};
