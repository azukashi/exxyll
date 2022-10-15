const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Schema = require('../../Models/WelcomeChannel');

module.exports = {
    name: 'disable-welcome',
    description: 'Disable & revoke welcoming feature',
    options: [],
    userPermissions: ['MANAGE_GUILD'],
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await Schema.findOneAndDelete({ Guild: interaction.guild.id });
        interaction.followUp({
            content: `Sucessfully removed and disabled welcoming feature!`,
        });
    },
};
