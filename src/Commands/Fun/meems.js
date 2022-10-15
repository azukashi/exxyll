const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'memes',
    aliases: ['meme'],
    description: 'Generate Random Memes',
    emoji: '🤣',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const res = await fetch(`http://api.popcatdev.repl.co/meme`);
        const meme = await res.json();
        const embed = new MessageEmbed()
            .setTitle(meme.title)
            .setURL(meme.url)
            .setColor('RANDOM')
            .setImage(meme.image)
            .setFooter({ text: `👍 ${meme.upvotes} || 💬 ${meme.comments}` });

        message.channel.send({ embeds: [embed] });
    },
};
