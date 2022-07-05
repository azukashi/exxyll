const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'chat',
    description: 'Chat with the bot!',
    aliases: ['cht'],
    emoji: '💭',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const input = args.join(' ');
        if (!input) return;
        fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${message.author.id}`)
            .then(res => res.json())
            .then(body => {
                message.reply(body.response);
            });
    },
};
