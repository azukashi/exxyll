const { Client, Message, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'maps',
    description: 'Returns information about a location',
    aliases: ['gmaps'],
    emoji: '🗺️',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const sit = args.join(' ');
        if (!args.length) return message.reply({ content: 'Provide a valid location' });
        const site = `https://maps.google.com/?q=${args.join('+')}`;
        try {
            const msg = await message.channel.send({
                content: '**Please wait...** This may take up to 10 seconds.',
            });
            msg.delete({ timeout: 5000 });
            const { body } = await fetch(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
            let att = new MessageAttachment(body, `${sit}.png`);
            return message.channel.send({ files: [att] });
        } catch (err) {
            return message.reply({
                content: `Oh no, an error occurred: \`${err.message}\`. Try again later!`,
            });
        }
    },
};
