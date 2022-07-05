const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
    name: 'manga',
    description: 'Search details of manga',
    aliases: [],
    emoji: ':book:',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const title = args.join(' ');
        if (!title) return message.reply('Please specify a title to search!');
        fetch(`https://api.jikan.moe/v3/search/manga?q=${title}`)
            .then(res => res.json())
            .then(body => {
                const title = body.results[0].title;
                const mal_url = body.results[0].url;
                const imgae = body.results[0].image_url;
                const synopsis = body.results[0].synopsis;
                const type = body.results[0].type;
                const chapters = body.results[0].chapters;
                const volumes = body.results[0].volumes;
                const score = body.results[0].score;
                const start_date = body.results[0].start_date;

                const embed = new MessageEmbed()
                    .setTitle(title)
                    .setURL(mal_url)
                    .setThumbnail(imgae)
                    .setDescription(synopsis)
                    .addField(`Type`, type)
                    .addField(`Total Chapters`, `${chapters}`)
                    .addField(`Total Volumes`, `${volumes}`)
                    .addField(`Ratings (at MyAnimeList)`, `${score}`)
                    .addField(`Released`, `${moment(start_date).format('LLLL')}`)
                    .setColor(`#800080`)
                    .setFooter(
                        `Requested by : ${message.author.tag}`,
                        message.author.displayAvatarURL({ dynamic: true })
                    );

                message.channel.send({ embeds: [embed] });
            })
            .catch(err => {
                const errembed = new MessageEmbed()
                    .setDescription(
                        `<:tickNo:863367014092898314> | That manga isn't found!\n\n\`\`\`js\n${err}\n\`\`\``
                    )
                    .setColor('RED');
                message.channel.send({ embeds: [errembed] });
            });
    },
};
