const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "nuke",
  description: "Command to Nuke a Text Channel.",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.reply("I'm Need `MANAGE_CHANNELS` Permission.");

    message.channel.clone().then((ch) => {
      ch.setParent(message.channel.parent.id);
      ch.setPosition(message.channel.position);
      message.channel.delete();

      ch.send("BOOM! This Channel has been nuked!").then((m) =>
        m.delete({ timeout: 7000 })
      );
    });
  },
};
