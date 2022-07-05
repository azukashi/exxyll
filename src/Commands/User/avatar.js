const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: "Show user's avatar",
    aliases: ['pfp'],
    emoji: '👤',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const userId = args.join(' ');
        const user = message.mentions.members.first() || client.users.cache.get(userId) || message.member;
        const pngFormat = user.user.displayAvatarURL({ format: 'png' });
        const jpgFormat = user.user.displayAvatarURL({ format: 'jpg' });
        const webpFormat = user.user.displayAvatarURL();
        const avatar = user.user.displayAvatarURL({
            dynamic: true,
            size: 512,
        });
        const embed = new MessageEmbed()
            .setTitle(`${user.user.username}'s avatar`)
            .setDescription(`[PNG](${pngFormat}) | [JPG](${jpgFormat}) | [WEBP](${webpFormat})`)
            .setImage(avatar)
            .setColor('BLUE');
        message.channel.send({ embeds: [embed] });
    },
};
