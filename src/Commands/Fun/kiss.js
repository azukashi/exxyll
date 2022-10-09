const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'kiss',
    description: 'Kiss someone!',
    aliases: [],
    emoji: '<:KizunaKiss2:880267449138831441>',
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
        if (user == message.author.id) return message.reply(`No, U can't kiss yourself.`);
        if (user == client.user.id) return message.reply(`No, U can't kiss me.`);
        if (user == message.author.bot) return message.reply(`No, U can't kiss bots.`);
        fetch('https://api.waifu.pics/sfw/kiss')
            .then(res => res.json())
            .then(body => {
                const embed = new MessageEmbed()
                    .setTitle(`${message.author.username} Kissed ${user.username}`)
                    .setImage(body.url)
                    .setColor('#FFC0CB')
                    .setFooter({
                        text: `${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true }),
                    })
                    .setTimestamp();

                message.channel.send({ embeds: [embed] });
            });
    },
};
