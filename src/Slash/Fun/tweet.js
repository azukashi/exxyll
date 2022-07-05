const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'tweet',
    description: 'Tweet something!',
    options: [
        {
            type: 3,
            name: 'text',
            description: 'Text to tweet',
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
        fetch(
            `https://nekobot.xyz/api/imagegen?type=tweet&username=${interaction.user.username}&text=${encodeURI(text)}`
        )
            .then(res => res.json())
            .then(data => {
                let embed = new MessageEmbed()
                    .setTitle('Tweet!')
                    .setImage(data.message)
                    .setColor('BLUE')
                    .setTimestamp();
                interaction.followUp({ embeds: [embed] });
            });
    },
};
