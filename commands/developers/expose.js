const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "expose",
  aliases: ["owner"],
  usage: "",
  description: "Expose and Verbose Owner Help Menu",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    fs.readdirSync("./commands/").forEach((dir) => {
      const commands = fs
        .readdirSync(`../owner/`)
        .filter((file) => file.endsWith(".js"));

      message.lineReplyNoMention(commands);
    });
  },
};
