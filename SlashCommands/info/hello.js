const { CommandInteraction, Client, WebhookClient } = require("discord.js");

module.exports = {
  name: "hello",
  description: "Print Hello World Strings",
  aliases: [],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    interaction.followUp({ content: "Hello World!" });
  },
};
