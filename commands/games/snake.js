const { Client, Message, MessageEmbed } = require("discord.js");
const SnakeGame = require("snakecord");

module.exports = {
  name: "snake",
  aliases: ["snakecord"],
  usage: "",
  description: "Play Snake Game in Discord!",
  hidden: false,
  premium: false,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const snakeGame = new SnakeGame({
      title: "Snake Game",
      color: "BLUE",
      timestamp: false,
      gameOverTitle: "Game Over!",
    });

    snakeGame.newGame(message);
  },
};
