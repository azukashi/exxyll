const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'wikipedia',
    description: 'Search something to Wikipedia',
    aliases: ['wiki'],
    emoji: '📔',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply({ content: 'Please specify a query to search!' });
        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`).then(
            res => res.json().catch(() => {})
        );
        if (!body) return message.channel.send({ content: 'Page not found :x:' });
        if (body.title && body.title === 'Not found.')
            return message.channel.send({ content: 'Error! Page not found... :x:' });

        const embed = new MessageEmbed()
            .setTitle(`🌐 ${body.title}`)
            .addFields({
                name: 'More info',
                value: `**[Click Here](${body.content_urls.desktop.page})**`,
                inline: true,
            })
            .setDescription(`** ${body.extract} **`)
            .setFooter({
                text: `Wikipedia search | Command request by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setColor('BLUE');

        if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        message.channel.send({ embeds: [embed] });
    },
};
