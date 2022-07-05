const { Client, Message, MessageEmbed, version: djsversion } = require('discord.js');
const { utc } = require('moment');
const version = require('../../../package.json').version;
const os = require('os');
const ms = require('ms');
const pretty = require('pretty-ms');

module.exports = {
    name: 'stats',
    description: 'Returns Bot Status',
    aliases: ['bot-status', 'status'],
    emoji: '📊',
    userperm: ['SEND_MESSAGES'],
    botperm: ['SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        // Capitalize Func
        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setTitle(`Exxyll Stats`)
            .setURL(client.web)
            .setThumbnail(client.user.displayAvatarURL({ size: 512, format: 'png' }))
            .setColor(message.guild.me.displayHexColor || client.color)
            .addField(
                '<a:bot:863216970554933269> General',
                `**❯ Client :** ${client.user.tag} (${client.user.id})\n**❯ Commands Total :** ${
                    client.commands.size
                }\n**❯ Server :** ${client.guilds.cache.size.toLocaleString()} Servers\n**❯ Users :** ${client.guilds.cache
                    .reduce((a, b) => a + b.memberCount, 0)
                    .toLocaleString()} Users\n**❯ Channels :** ${client.channels.cache.size.toLocaleString()} Channels\n**❯ Creation Date :** ${utc(
                    client.user.createdTimestamp
                ).format('Do MMMM YYYY HH:mm:ss')}\n**❯ Node.js :** ${
                    process.version
                }\n**❯ Version :** v${version}\n**❯ Discord.js :** v${djsversion}\n**❯ Bot Uptime :** ${pretty(
                    client.uptime
                )}`
            )
            .addField(
                '<:ubuntu:853158810654343208> System',
                `**❯ OS Platform :** ${capitalizeFirst(process.platform)}\n**❯ OS Uptime :** ${ms(os.uptime() * 1000, {
                    long: true,
                })}\n**❯ CPU :**\n\u3000 Cores : ${os.cpus().length}\n\u3000 Model : ${core.model}\n\u3000 Speed : ${
                    core.speed
                } MHz`
            )
            .addField('<:stagechannel:863214920548089866> Network', `**❯ Latency :** ${client.ws.ping} ms`)
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
