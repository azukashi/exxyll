const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'emojify',
    description: 'Emojify a text',
    aliases: [],
    emoji: '🇦',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const ctx = args.join(' ');
        if (!ctx) return message.reply({ content: 'Please specify a text!' });
        fetch(`https://luminabot.xyz/api/text/emojify?text=${ctx}`)
            .then(res => res.json())
            .then(body => {
                message.channel.send({ content: body.emojifyed });
            })
            .catch(err => {
                message.reply({
                    content: `An error occured!\nError Message : \n\`\`\`yml\n${err}\n\`\`\``,
                });
                console.log(err);
            });
    },
};
