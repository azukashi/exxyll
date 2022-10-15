const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns Ping Latency',
    userperm: 'SEND_MESSAGES',
    botperm: 'SEND_MESSAGES',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle(`Pong!`)
            .setDescription(`:signal_strength: Websocket latency: ${client.ws.ping} ms!`)
            .setColor('#800080');
        interaction.followUp({
            embeds: [embed],
        });
    },
};
