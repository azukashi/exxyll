const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'anime',
    aliases: ['anime-search', 'search-anime'],
    usage: 'anime-name',
    description: 'Search anime details',
    hidden: false,
    premium: false,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        // Define Query & Checking
        const query = args.join(" ");
        if(!query) return message.lineReply('Please specify a query to search!');

        // Getting Data from APIs with Axios
        const { data: { data }, } = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
        const title = data[0].attributes.titles.en_jp;
        const synopsis = data[0].attributes.synopsis;
        const thumbnail = data[0].attributes.posterImage.original
        const ratings = data[0].attributes.averageRating;
        const episodes = data[0].attributes.episodeCount;
        const status = data[0].attributes.status;
        const image = data[0].attributes.coverImage.large;

        if(image === 'null' || 'undefined') console.log('Anime Image Not Found.')

        const resultEmbed = new MessageEmbed()
            .setTitle(title)
            .setDescription(synopsis)
            .setThumbnail(thumbnail)
            .addField('Ratings', ratings)
            .addField('Total Episodes', episodes)
            .addField('Status', status)
            .setImage(image)
            .setColor('BLUE')
            .setFooter(`Requested by : ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send(resultEmbed);
    },
};