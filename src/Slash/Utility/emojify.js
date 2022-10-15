const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'emojify',
    description: 'Emojify a text',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'Text to convert to emojis',
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
        const [text] = args;
        fetch(`https://luminabot.xyz/api/text/emojify?text=${text}`)
            .then(res => res.json())
            .then(body => {
                interaction.followUp({ content: body.emojifyed });
            })
            .catch(err => {
                interaction.followUp({
                    content: `An error occured!\nError Message : \n\`\`\`yml\n${err}\n\`\`\``,
                    ephemeral: true,
                });
                console.log(err);
            });
    },
};
