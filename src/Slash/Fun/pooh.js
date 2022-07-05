const { CommandInteraction, Client, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'pooh',
    description: 'Generates a Tuxedo Pooh Memes',
    options: [
        {
            type: 3,
            name: 'text_1',
            description: 'First Argument',
            required: true,
        },
        {
            type: 3,
            name: 'text_2',
            description: 'Second Argument',
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
        const [text_1, text_2] = args;
        const res = await fetch(`https://api.popcatdev.repl.co/pooh?text1=${text_1}&text2=${text_2}`, {});
        let Image = await res.buffer();
        const poohmeme = new MessageAttachment(Image);
        interaction.followUp({ files: [poohmeme] });
    },
};
