const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'tweet',
    description: 'Tweet something!',
    aliases: ['twitter'],
    emoji: '🐦',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const text = args.join(' ');
        if (!text) return message.reply('Please specify a text!');
        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${encodeURI(text)}`)
            .then(res => res.json())
            .then(data => {
                let embed = new MessageEmbed()
                    .setTitle('Tweet!')
                    .setImage(data.message)
                    .setColor('BLUE')
                    .setTimestamp();
                message.channel.send({ embeds: [embed] });
            });
    },
};
