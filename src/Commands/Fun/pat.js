const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pat',
    description: 'Pat someone!',
    aliases: [],
    emoji: '<a:Peepo_Pat:880270920126709830>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply('Please mention a user!');
        fetch('https://api.waifu.pics/sfw/pat')
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(`${message.author.username} Patting ${user.username}`)
                    .setImage(body.url)
                    .setColor('#FFC0CB')
                    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            });
    },
};
