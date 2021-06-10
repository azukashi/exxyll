const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["disconnect", "dc"],
  description: "Disconnect Bot from Voice Channel",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.lineReply(`Please Join a Voice Channel First!`);

    client.player.stop(message);

    message.lineReplyNoMention("The Player has been **Stopped**!");
  },
};
