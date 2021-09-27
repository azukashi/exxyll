const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'say',
  description: 'Echo a Text',
  options: [
    {
      type: 6,
      name: 'text',
      description: 'Text to say',
      required: true,
    },
  ],
  userPermissions: ['SEND_MESSAGES'],
  userperm: ['SEND_MESSAGES'],
  botperm: ['SEND_MESSAGES'],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const [text] = args;
    interaction.followUp({ content: text });
  },
};
