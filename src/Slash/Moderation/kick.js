const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server',
    options: [
        {
            type: 9,
            name: 'member',
            description: 'Member to kick',
            required: true,
        },
        {
            type: 3,
            name: 'reason',
            description: 'Reason why you want to kick this member',
        },
    ],
    userperm: ['KICK_MEMBERS'],
    botperm: ['KICK_MEMBERS'],
    userPermissions: ['KICK_MEMBERS'],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [member, reason] = args;
        const memberFixed = await client.guilds.cache.get(interaction.guild.id).members.fetch(member);

        if (interaction.member.roles.highest <= memberFixed.roles.highest.position)
            return interaction.followUp({
                content: "You can't punish because u either have the same role or your role is lower.",
                ephemeral: true,
            });

        const reasonFixed = reason || 'No reason provided';
        const memberPfp = client.users.cache.get(memberFixed.id).displayAvatarURL({ size: 512, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle(`Successfully kicked ${memberFixed.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .addFields(
                { name: 'Kicked user', value: memberFixed },
                { name: 'Moderator', value: `<@${interaction.user.id}>` },
                { name: 'Reason', value: reasonFixed }
            )
            .setColor('RED')
            .setTimestamp();

        await memberFixed.kick({ reason }).catch(err =>
            interaction.followUp({
                content: `An error has occured while trying to kick!\nError message :\n\`\`\`yml\n${err}\n\`\`\``,
                ephemeral: true,
            })
        );
        interaction.followUp({ embeds: [embed] });
    },
};
