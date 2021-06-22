const Schema = require("../../models/welcomeChannel");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "check-welcome",
  category: "Welcoming System",
  aliases: ["checkWelcome", "check-welcomer"],
  usage: "",
  description: "Command to Check Where is Welcoming System is Enabled",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.lineReply(
        "You need `MANAGE_GUILD` Permission to run this command.\nIf you already have `MANAGE_GUILD` Permission, Make sure I Have `MANAGE_GUILD` Permission Too."
      );

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return message.lineReply(`This guild has no data stored.`);

      const channel = client.channels.cache.get(data.Channel);

      message.lineReply(
        `Welcoming Channel Has Been Set To => ${channel}. \n\nThis bot will automatically sends a Welcoming message to ${channel} when someone joins to this server!`
      );
    });
  },
};
