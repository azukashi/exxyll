const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'wikipedia',
    description: 'Search something to Wikipedia',
    options: [
        {
            type: 3,
            name: 'query',
            description: 'Query to search',
            required: true,
        },
    ],
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [query] = args;
        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`).then(
            res => res.json().catch(() => {})
        );
        if (!body) return interaction.followUp({ content: 'Page not found :x:' });
        if (body.title && body.title === 'Not found.')
            return interaction.followUp({ content: 'Error! Page Not Found... :x:' });

        const embed = new MessageEmbed()
            .setTitle(`🌐 ${body.title}`)
            .setDescription(`** ${body.extract} **`)
            .addFields({
                name: 'More info',
                value: `**[Click Here](${body.content_urls.desktop.page})**`,
                inline: true,
            })
            .setFooter({
                text: `Wikipedia search | Command request by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor('BLUE');

        if (body.thumbnail) embed.setThumbnail(body.thumbnail.source);
        interaction.followUp({ embeds: [embed] });
    },
};
