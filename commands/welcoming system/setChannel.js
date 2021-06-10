const Schema = require("../../models/welcomeChannel");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "set-welcome",
  category: "Welcoming System",
  aliases: ["setWelcome", "set-welcomer"],
  usage: "#channel",
  description:
    "`Set Welcoming System Channel`. **Set it to e.g : #welcome channel, etc.**",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.lineReply(
        "You need `MANAGE_GUILD` Perms to perform this action! \nIf you already have `MANAGE_GUILD` Permission, Make sure I Have `MANAGE_GUILD` Permission Too."
      );

    const channel = message.mentions.channels.first();
    if (!channel) return message.lineReply("Please mention a channel!");

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) {
        data.Channel = channel.id;
        data.save();
      } else {
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
      }
      message.lineReply(`${channel} has been set as the welcome channel!`);
    });
  },
};
