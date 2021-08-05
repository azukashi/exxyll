const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["echo"],
  usage: "<text to say>",
  description: "Say / Echo a Text",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const argumen = args.join(" ");
    if (!argumen) return message.reply("I can't say nothing!");

    message.lineReplyNoMention(argumen);
  },
};
