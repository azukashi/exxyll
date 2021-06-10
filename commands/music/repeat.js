const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "repeat",
  aliases: ["loop"],
  description: "Repeat currently played song",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.lineReply("Please Join a Voice Channel First!");
    if (!client.player.getQueue(message))
      return message.lineReply("No music currently playing!");

    const repeatMode = client.player.getQueue(message).repeatMode;

    if (repeatMode) {
      client.player.setRepeatMode(message, false);
      return message.lineReplyNoMention("Repeat Mode : **Disabled**.");
    } else {
      client.player.setRepeatMode(message, true);
      return message.lineReplyNoMention("Repeat Mode : **Enabled**.");
    }
  },
};
