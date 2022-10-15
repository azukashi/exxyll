const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    options: [
        {
            type: 9,
            name: 'member',
            description: 'Member to ban',
            required: true,
        },
        {
            type: 3,
            name: 'reason',
            description: 'Reason why you want to ban this member',
        },
    ],
    userPermissions: ['BAN_MEMBERS'],
    userperm: ['BAN_MEMBERS'],
    botperm: ['BAN_MEMBERS'],
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
            .setTitle(`Successfully banned ${memberFixed.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .addFields(
                { name: 'Banned user', value: memberFixed },
                { name: 'Moderator', value: `<@${interaction.user.id}>` },
                { name: 'Reason', value: reasonFixed }
            )
            .setTimestamp();

        await memberFixed.ban({ reason }).catch(err =>
            interaction.followUp({
                content: `An error has occured while trying to ban!\nError message :\n\`\`\`yml\n${err}\n\`\`\``,
                ephemeral: true,
            })
        );
        interaction.followUp({ embeds: [embed] });
    },
};
