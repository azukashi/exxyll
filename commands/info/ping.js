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
        `<:stagechannel:863214920548089866> Websocket ping is ${
          client.ws.ping
        } ms\n<:discrodjs:863216966813351937> Discord API ping is ${Math.floor(messageping)} ms!`
      )
      .setColor(
        client.ws.ping < 350
          ? "GREEN"
          : client.ws.ping < 500 && client.ws.ping > 350
          ? "YELLOW"
          : "RED"
      );
    await message.lineReplyNoMention(embed);
    msg.delete();
  },
};
