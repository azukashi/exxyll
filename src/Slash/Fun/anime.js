const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'anime',
    description: 'Search details about an anime!',
    options: [
        {
            type: 3,
            name: 'title',
            description: 'Title of the anime',
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
        const [title] = args;
        fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
            .then(res => res.json())
            .then(body => {
                const title = body.results[0].title;
                const mal_url = body.results[0].url;
                const imgae = body.results[0].image_url;
                const synopsis = body.results[0].synopsis;
                const type = body.results[0].type;
                const episode = body.results[0].episodes;
                const score = body.results[0].score;
                const start_date = body.results[0].start_date;
                const rate = body.results[0].rated || 'Unknown';

                const embed = new MessageEmbed()
                    .setTitle(title)
                    .setURL(mal_url)
                    .setThumbnail(imgae)
                    .setDescription(synopsis)
                    .addFields(
                        { name: 'Type', value: type },
                        { name: 'Total episode', value: `${episode}` },
                        { name: 'Ratings (on MAL)', value: `${score}` },
                        { name: 'Release date', value: `${moment(start_date).format('LLLL')}` },
                        { name: 'Rate', value: rate }
                    )
                    .setColor('#800080')
                    .setFooter({
                        text: `Requested by : ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                    });

                interaction.followUp({ embeds: [embed] });
            })
            .catch(err => {
                const embedd = new MessageEmbed()
                    .setDescription(
                        `<:tickNo:863367014092898314> | That anime isn't found!\n\n\`\`\`js\n${err}\n\`\`\``
                    )
                    .setColor('RED');
                interaction.followUp({ embeds: [embedd] });
                console.log(err);
            });
    },
};
