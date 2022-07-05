const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Echo a text',
    aliases: ['echo'],
    emoji: '💬',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const arg = args.join(' ');
        if (!arg) return;
        message.channel.send({ content: arg });
        message.delete();
    },
};
