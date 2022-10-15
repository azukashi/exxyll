const { Client, CommandInteraction, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'maps',
    description: 'Returns information about a location',
    options: [
        {
            type: 3,
            name: 'location',
            description: 'Location to search',
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
        const [location] = args;
        const site = `https://maps.google.com/?q=${location}`;
        try {
            const msg = await interaction.followUp({
                content: '**Please wait...** This may take up to 10 seconds.',
            });
            msg.delete({ timeout: 5000 });
            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            let att = new MessageAttachment(body, `${location}.png`);
            return interaction.followUp({ files: [att] });
        } catch (err) {
            return interaction.followUp({
                content: `An error occurred: \`${err.message}\`. Try again later.`,
                ephemeral: true,
            });
        }
    },
};
