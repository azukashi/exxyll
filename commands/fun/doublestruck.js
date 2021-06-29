const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

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
    const textd = args.join(" ");
    if (!textd)
      return message.lineReply("Please specify a text to be converted!");
    const {
      data: { text },
    } = await axios.get(
      `https://api.popcatdev.repl.co/doublestruck?text=${textd}`
    );
    const uri = text;
    message.lineReplyNoMention(uri);
  },
};
