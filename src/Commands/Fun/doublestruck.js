const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'doublestruck',
    aliases: ['ds'],
    description: 'Convert a text to Double Struck',
    emoji: ':pause_button:',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const textd = args.join(' ');
        if (!textd) return message.reply('Please specify a text to be converted!');
        const {
            data: { text },
        } = await axios.get(`https://api.popcatdev.repl.co/doublestruck?text=${textd}`);
        const uri = text;
        message.channel.send({ content: uri });
    },
};
