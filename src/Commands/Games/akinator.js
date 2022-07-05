const { Client, Message, MessageEmbed } = require('discord.js');
const akinator = require('discord.js-akinator');

module.exports = {
    name: 'akinator',
    description: 'Play akinator games',
    aliases: ['aki'],
    emoji: '🤔',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        akinator(message, client);
    },
};
