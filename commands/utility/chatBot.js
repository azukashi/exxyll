const { Client, Message, MessageEmbed } = require("discord.js");
const { chatBot } = require("reconlx");

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
    const chat = args.join(" ");
    if (!chat)
      return message.lineReply(
        "Want to chatting with me? Try including hi after `.chat` to getting started!"
      );
    chatBot(message, chat);
  },
};
