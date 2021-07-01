const { Client, Message, MessageEmbed } = require("discord.js");
const { chatBot } = require("reconlx");

module.exports = {
  name: "chat",
  aliases: [],
  usage: "text",
  description: "Chatbot Feature. Talk with the bot with this command",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    chatBot(message, args.join(" "));
  },
};
