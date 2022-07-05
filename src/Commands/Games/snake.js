const { Client, Message, MessageEmbed } = require('discord.js');
const SnakeGame = require('snakecord');

module.exports = {
    name: 'snake',
    description: 'Play snake game',
    aliases: ['snakecord'],
    emoji: '🐍',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: 'BLUE',
            timestamp: false,
            gameOverTitle: 'Game Over!',
        });

        snakeGame.newGame(message);
    },
};
