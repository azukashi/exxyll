const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require('../../models/welcome-channel');

module.exports = {
  name: 'check-welcome',
  description: 'Check where is Welcoming System is Enabled',
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
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (!data)
        return interaction.followUp({
          content: `This guild has no data stored.`,
        });

      const channel = client.channels.cache.get(data.Channel);

      interaction.followUp({
        content: `Welcoming Channel Has Been Set To => ${channel}. \n\nThis bot will automatically sends a Welcoming message to ${channel} when someone joins to this server!`,
      });
    });
  },
};
