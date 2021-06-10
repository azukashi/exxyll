const { MessageEmbed } = require("discord.js");
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
    const embed = new MessageEmbed()
      .setTitle("🏓 Pong!")
      .setDescription(
        `Websocket ping is ${
          client.ws.ping
        } ms\nMessage edit ping is ${Math.floor(
          msg.createdAt - message.createdAt
        )} ms!`
      )
      .setColor("BLUE");
    await message.lineReplyNoMention(embed);
    msg.delete();
  },
};
