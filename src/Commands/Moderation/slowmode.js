const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'Set slowmode for this channel.',
    aliases: ['set-slowmode'],
    emoji: '⏳',
    userperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
    botperm: ['MANAGE_CHANNELS', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const amount = parseInt(args[0]);
        if (isNaN(amount)) return message.reply({ content: ':x: It does not seem to be valid value' });
        if (args[0] === amount + 's') {
            message.channel.setRateLimitPerUser(amount);
            if (amount > 1) {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' seconds',
                });
                return;
            } else {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' second',
                });
                return;
            }
        }
        if (args[0] === amount + 'min') {
            message.channel.setRateLimitPerUser(amount * 60);
            if (amount > 1) {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' minutes',
                });
                return;
            } else {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' minute',
                });

                return;
            }
        }
        if (args[0] === amount + 'h') {
            message.channel.setRateLimitPerUser(amount * 60 * 60);
            if (amount > 1) {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' hours',
                });
                return;
            } else {
                message.channel.send({
                    content: 'Slowmode is now ' + amount + ' hour',
                });
                return;
            }
        } else {
            message.channel.send({
                content: 'You can only set seconds(s), minutes(min) and Hours(h)',
            });
        }
    },
};
