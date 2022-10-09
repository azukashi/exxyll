const { Client, Message, MessageEmbed } = require('discord.js');
const ytsr = require('ytsr');

module.exports = {
    name: 'youtube-search',
    description: 'Search a video from YouTube',
    aliases: ['yts', 'ytsrc'],
    emoji: '🔍',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query)
            return message.reply({
                content: 'Provide a search query to search!',
            });

        const res = await ytsr(query).catch(e => message.channel.send({ content: `No results found for ${query}` }));
        const video = res.items.filter(i => i.type === 'video')[0];
        const embed = new MessageEmbed()
            .setTitle(video.title)
            .setURL(video.url)
            .setImage(video.bestThumbnail.url)
            .setThumbnail(video.author.bestAvatar.url)
            .setDescription(video.description ? !video.description : 'No description provided.')
            .addFields({
                name: 'Song information',
                value: `**Creator**: [${video.author.name}](${video.author.url}) ${
                    video.author.verified ? ':white_check_mark: (Verified)' : '\u200b'
                }\n**Length**: ${video.duration} minute(s)\n**Uploaded**: ${
                    video.uploadedAt
                }\n**Views**: ${video.views.toLocaleString()}`,
            });
        message.channel.send({ embeds: [embed] });
    },
};
