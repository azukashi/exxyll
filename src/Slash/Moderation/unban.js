const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user from server by their User ID',
    options: [
        {
            type: 3,
            name: 'id',
            description: 'User ID to Unban',
            required: true,
        },
    ],
    userPermission: ['BAN_MEMBERS'],
    userperm: ['BAN_MEMBERS'],
    botperm: ['BAN_MEMBERS'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [id] = args;
        const bannedMembers = await interaction.guild.bans.fetch();
        if (!bannedMembers.find(user => user.user.id === id))
            return interaction.followUp({ content: 'User is not banned!' });

        interaction.guild.members.unban(id);
        interaction.followUp({ content: 'Successfully unlisted user from banned members.' });
    },
};
