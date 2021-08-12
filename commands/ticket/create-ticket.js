const {
  Client,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Shows you a Ticket Panel",
  emoji: "🎟",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        message.guild.name,
        message.guild.iconURL({
          dynamic: true,
        })
      )
      .setDescription(
        "__**How to make a ticket**__\n" +
          "> Click on the reaction that relates to your need\n" +
          "> Once the ticket is made you will be able to type in there"
      )
      .setTitle("Tickets");

    const bt = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("tic")
        .setLabel("🎫 Create Ticket!")
        .setStyle("PRIMARY")
    );

    message.channel.send({
      embeds: [embed],
      components: [bt],
    });
  },
};
