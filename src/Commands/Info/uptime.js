const { Client, Message, MessageEmbed } = require('discord.js');
const pretty = require('pretty-ms');

module.exports = {
    name: 'uptime',
    description: "Returns information about Exxyll's Uptime",
    emoji: '🕘',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle(`🕘 Uptime`)
            .setDescription(`\`\`\`yml\nStatus : Online\nUptime : ${pretty(client.uptime)}\n\`\`\``)
            .setColor(message.guild.me.displayHexColor);

        message.channel.send({ embeds: [embed] });
    },
};
