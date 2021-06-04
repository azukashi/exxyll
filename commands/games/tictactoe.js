const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "tictactoe",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const opponent = message.mentions.users.first();
    if (!opponent)
      return message.reply(
        `Please mention who you want to challenge at tictactoe.`
      );
    const { TicTacToe } = require("weky");
    const game = new TicTacToe({
      message: message,
      opponent: opponent, //opponent
      xColor: "red", //x's color
      oColor: "blurple", //zero's color
      xEmoji: "❌", //the x emoji
      oEmoji: "0️⃣", //the zero emoji
    });
    game.start(); //start da game
    //Errors or questions? https://discord.gg/2EZSpxNB5z (Support server for weky npm)
  },
};
