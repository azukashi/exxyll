const { CommandInteraction, Client, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'pikachu',
    description: 'Generates pog pikachu memes',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'First argument',
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
        let image = `https://api.popcatdev.repl.co/pikachu?text=${encodeURIComponent(text)}`;
        let imgae = new MessageAttachment(image, 'poggg pika.png');
        interaction.followUp({ files: [imgae] });
    },
};
