const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'checkperms',
    description: 'Check user permissions at current guilds & channels',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'User to show their perms. This is optional.',
            required: false,
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
        let [user] = args;
        if (!user) user = interaction.user.id;
        const fixedUser = client.users.cache.get(user);
        const member = interaction.guild.members.cache.get(fixedUser.id) || interaction.member;
        const sp = member.permissions.serialize();
        const cp = interaction.channel.permissionsFor(member).serialize();
        const embed = new MessageEmbed()
            .setColor(member.displayColor || 'GREY')
            .setTitle(`${member.displayName}'s Permissions`)
            .setFooter({
                text: `Check Permissions | Command Request by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(
                [
                    '\\♨️ - This Server',
                    '\\#️⃣ - The Current Channel',
                    '```properties',
                    '♨️ | #️⃣ | Permission',
                    '========================================',
                    `${Object.keys(sp)
                        .map(perm =>
                            [
                                sp[perm] ? '✅ |' : '❌ |',
                                cp[perm] ? '✅ |' : '❌ |',
                                perm
                                    .split('_')
                                    .map(x => x[0] + x.slice(1).toLowerCase())
                                    .join(' '),
                            ].join(' ')
                        )
                        .join('\n')}`,
                    '```',
                ].join('\n')
            );
        interaction.followUp({ embeds: [embed] });
    },
};
