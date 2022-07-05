const { CommandInteraction, Client, WebhookClient } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'doublestruck',
    description: 'Doublestruck a text',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'Text to doublestruck',
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
        const [text] = args;
        fetch(`https://api.popcatdev.repl.co/doublestruck?text=${text}`)
            .then(res => res.json())
            .then(body => {
                interaction.followUp({ content: body.text });
            });
    },
};
