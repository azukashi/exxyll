const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'urban',
    description: 'Search meaning of slang words, and phrases',
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
        let [query] = args;
        query = encodeURIComponent(query);

        const {
            data: { list },
        } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`);

        const [answer] = list;

        interaction.followUp({
            embeds: [
                new MessageEmbed()
                    .setTitle(answer.word)
                    .setURL(answer.permalink)
                    .setColor('RANDOM')
                    .addFields(
                        { name: 'DEFINITION', value: trim(answer.definition) },
                        { name: 'EXAMPLE', value: trim(answer.example) },
                        { name: 'RATINGS', value: `${answer.thumbs_up} 👍 || ${answer.thumbs_down} 👎` }
                    ),
            ],
        });
    },
};

function trim(input) {
    return input.length > 1024 ? `${input.slice(0, 1020)} ...` : input;
}
