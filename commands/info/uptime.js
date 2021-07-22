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
      .setTitle(`🕘 Exxyll's Uptime`)
      .setDescription(
        `\`\`\`yml\nStatus : Online\nUptime : ${pretty(client.uptime)}\n\`\`\``
      )
      .setColor(message.guild.me.displayHexColor);
    message.lineReplyNoMention(embed);
  },
};
