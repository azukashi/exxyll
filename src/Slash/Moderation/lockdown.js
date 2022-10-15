const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lockdown',
    description: 'Lockdown the server',
    options: [
        {
            type: 3,
            name: 'options',
            description: 'Please choice available options',
            required: true,
            choices: [
                {
                    name: 'true',
                    value: 'true',
                },
                {
                    name: 'false',
                    value: 'false',
                },
            ],
        },
    ],
    userPermission: ['MANAGE_GUILD'],
    userperm: ['MANAGE_GUILD'],
    botperm: ['MANAGE_GUILD'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [options] = args;
        const role = interaction.guild.roles.everyone;
        const perms = role.permissions.toArray();

        if (options === 'false') {
            perms.push('SEND_MESSAGES');
            console.log(perms);
            await role.edit({ permissions: perms });
            interaction.followUp({ content: 'Server is now unlocked.' });
        } else {
            const newPerms = perms.filter(perm => perm !== 'SEND_MESSAGES');
            console.log(newPerms);

            await role.edit({ permissions: newPerms });
            interaction.followUp({
                content: 'Server is now locked down for `@everyone` role.',
            });
        }
    },
};
