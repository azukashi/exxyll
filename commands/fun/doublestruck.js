const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "doublestruck",
  aliases: [],
  usage: "<text>",
  description: "Convert a text to Double Struck",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text)
      return message.lineReply("Please specify a text to be converted!");
    const converted = `https://api.popcatdev.repl.co/doublestruck?text=${encodeURIComponent(
      text
    )}`;
    message.lineReplyNoMention(converted);
  },
};
