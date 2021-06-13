const { tictactoe } = require("reconlx");
const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "tictactoe",
  aliases: [],
  usage: "@player2",
  description: "Play TicTacToe Games with your Friends!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first();
    if (!member) return message.lineReply("Please specify a member");

    new tictactoe({
      player_two: member,
      message: message,
    });
  },
};
