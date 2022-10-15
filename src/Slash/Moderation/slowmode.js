const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    description: 'Set slowmode for this channel.',
    options: [
        {
            type: 3,
            name: 'duration',
            description: 'Slowmode duration',
            required: true,
        },
    ],
    userPermission: ['MANAGE_CHANNELS'],
    userperm: ['MANAGE_CHANNELS'],
    botperm: ['MANAGE_CHANNELS'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [duration] = args;
        const amount = parseInt(duration);
        if (isNaN(amount))
            return interaction.followUp({
                content: ':x: It does not seem to be valid value',
                ephemeral: true,
            });
        if (duration === amount + 's') {
            interaction.channel.setRateLimitPerUser(amount);
            if (amount > 1) {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' seconds',
                });
                return;
            } else {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' second',
                });
                return;
            }
        }
        if (duration === amount + 'min') {
            interaction.channel.setRateLimitPerUser(amount * 60);
            if (amount > 1) {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' minutes',
                });
                return;
            } else {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' minute',
                });

                return;
            }
        }
        if (duration === amount + 'h') {
            interaction.channel.setRateLimitPerUser(amount * 60 * 60);
            if (amount > 1) {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' hours',
                });
                return;
            } else {
                interaction.followUp({
                    content: 'Slowmode is now ' + amount + ' hour',
                });
                return;
            }
        } else {
            interaction.followUp({
                content: 'You can only set seconds(s), minutes(min) and hours(h)',
            });
        }
    },
};
