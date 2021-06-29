const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const msg = await message.lineReplyNoMention(`🏓 Pinging...`);
    const messageping = msg.createdTimestamp - message.createdTimestamp;
    const embed = new MessageEmbed()
      .setTitle("🏓 Pong!")
      .setAuthor(
        `${message.author.username}`,
        message.author.displayAvatarURL()
      )
      .setDescription(
        `Websocket ping is ${
          client.ws.ping
        } ms\nMessage edit ping is ${Math.floor(messageping)} ms!`
      )
      .setColor(
        messageping < 350
          ? "GREEN"
          : messageping < 500 && messageping > 350
          ? "YELLOW"
          : "RED"
      );
    await message.lineReplyNoMention(embed);
    msg.delete();
  },
};
