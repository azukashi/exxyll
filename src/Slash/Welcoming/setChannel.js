const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
    name: 'set-welcoming',
    description: 'Enable and set welcoming system',
    options: [
        {
            type: 7,
            name: 'channel',
            description: 'Channel to set',
            required: true,
        },
    ],
    userPermissions: ['MANAGE_GUILD'],
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [channel] = args;
        const checkChannel = client.channels.cache.get(channel);
        if (!checkChannel.type == 'GUILD_TEXT')
            return interaction.followUp({
                content: `Invalid channel. Please select a text channel!`,
                ephemeral: true,
            });
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                }).save();
            }
            interaction.followUp({
                content: `<#${channel}> has been set as welcome channel!`,
            });
        });
    },
};
