const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "chat",
  aliases: [],
  usage: "<text>",
  description: "Chatbot Feature. Talk with the bot with this command",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const input = args.join(" ");
    fetch(
      `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${
        message.author.id
      }`
    )
      .then((res) => res.json())
      .then((body) => {
        message.lineReply(body.response);
      });
  },
};
