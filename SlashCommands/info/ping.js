const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "This is a testing command",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setTitle(`Pong!`)
      .setDescription(
        `<:stagechannel:863214920548089866> Websocket API : ${client.ws.ping} ms!`
      )
      .setColor("#800080");
    interaction.followUp({
      embeds: [embed],
    });
  },
};
