const { Client, Message, MessageEmbed } = require("discord.js");
const pretty = require("pretty-ms");

module.exports = {
  name: "uptime",
  aliases: ["up"],
  usage: "",
  description: "Returns Uptime of the Bot",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setDescription(`Bot's Uptime : **${pretty(client.uptime)}**`)
      .setColor(`#00FC8F`);
    message.lineReplyNoMention(embed);
  },
};
