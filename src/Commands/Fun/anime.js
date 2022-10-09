const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'anime',
    aliases: ['anime-search', 'search-anime'],
    description: 'Search details of anime',
    emoji: '<a:Peepo_WatchAnime:879957966797828187>',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const query = args.join(' ');
        if (!query) return message.reply('Please specify a title to search!');
        fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
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
                        text: `Requested by : ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({ dynamic: true }),
                    });

                message.channel.send({ embeds: [embed] });
            })
            .catch(err => {
                const embedd = new MessageEmbed()
                    .setDescription(`:x: | Not Found!\n\n\`\`\`js\n${err}\n\`\`\``)
                    .setColor('RED');
                message.channel.send({ embeds: [embedd] });
                console.log(err);
            });
    },
};
