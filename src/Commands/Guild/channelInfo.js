const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'channelinfo',
    description: 'Returns Information about Channels',
    aliases: ['channel'],
    emoji: '💬',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        }
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply('Please mention a channel.');
        let channelType = channel.type;
        if (channelType === 'GUILD_TEXT') {
            channelType = 'Text Channel';
        }
        if (channelType === 'GUILD_VOICE') {
            channelType = 'Voice Channel';
        }
        if (channelType === 'GUILD_PUBLIC_THREAD') {
            channelType = 'Public Thread';
        }
        if (channelType === 'GUILD_PRIVATE_THREAD') {
            channelType = 'Private Thread';
        }
        if (channelType === 'GUILD_CATEGORY') {
            channelType = 'Category';
        }
        let inline = true;
        try {
            let e = new MessageEmbed()
                .setTitle(`💬 Channel Information`)
                .setThumbnail(message.guild.iconURL({ dynamic: false }))
                .setDescription(`Information About ${channel}`)
                .addFields(
                    { name: 'Creation date', value: `${checkDays(channel.createdAt)}`, inline: true },
                    { name: 'Channel ID', value: `${channel.id}`, inline: true },
                    { name: 'Channel type', value: `${channelType}`, inline: true }
                )
                .setFooter({
                    text: `Channel Information | Command Request by ${message.author.tag}`,
                    iconURL: message.author.displayAvatarURL({ dynamic: true }),
                })
                .setColor('BLUE');
            message.channel.send({ embeds: [e] });
        } catch (error) {
            message.channel.send(error);
        }
    },
};
