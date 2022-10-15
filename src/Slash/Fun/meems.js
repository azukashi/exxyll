const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'meme',
    description: 'Generates random memes from Reddit',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const res = await fetch(`http://api.popcatdev.repl.co/meme`);
        const meme = await res.json();
        const embed = new MessageEmbed()
            .setTitle(meme.title)
            .setURL(meme.url)
            .setColor('RANDOM')
            .setImage(meme.image)
            .setFooter({ text: `👍 ${meme.upvotes} || 💬 ${meme.comments}` });

        interaction.followUp({ embeds: [embed] });
    },
};
