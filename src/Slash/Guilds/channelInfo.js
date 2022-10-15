const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'channelinfo',
    description: 'Returns information about a channel',
    options: [
        {
            type: 7,
            name: 'channel',
            description: 'Channel to show information about',
            required: true,
        },
    ],
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        }
        let [channel] = args;
        let fixedChannel = client.channels.cache.get(channel);
        let channelType = fixedChannel.type;
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
                .setThumbnail(interaction.guild.iconURL({ dynamic: false }))
                .setDescription(`Information About ${fixedChannel}`)
                .addFields(
                    { name: 'Creation date', value: `${checkDays(fixedChannel.createdAt)}`, inline: true },
                    { name: 'Channel ID', value: `${fixedChannel.id}`, inline: true },
                    { name: 'Channel type', value: `${channelType}`, inline: true }
                )
                .setFooter({
                    text: `Channel Information | Command Request by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                })
                .setColor('BLUE');
            interaction.followUp({ embeds: [e] });
        } catch (error) {
            interaction.followUp(error);
        }
    },
};
