const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.reply("Please Join a Voice Channel First!");
    if (!client.player.getQueue(message))
      return message.reply("No music currently playing!");

    client.player.skip(message);

    message.channel.send("The current music has just been **Skipped**!");
  },
};
