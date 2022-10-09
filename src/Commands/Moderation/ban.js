const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a user from the server',
    aliases: ['bonk'],
    emoji: '🔨',
    userperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    botperm: ['BAN_MEMBERS', 'SEND_MESSAGES'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply({ content: 'Please mention a member to ban!' });

        if (message.member.roles.highest.position <= member.roles.highest.position)
            return message.reply({
                content: "You can't punish because u either have the same role or your role is lower.",
            });

        const reason = args.slice(1).join(' ') || 'No Reason Provided';
        const memberPfp = client.users.cache.get(member.id).displayAvatarURL({ size: 512, dynamic: true });
        const embed = new MessageEmbed()
            .setTitle(`Successfully banned ${member.user.username} from this server!`)
            .setThumbnail(memberPfp)
            .addFields(
                { name: 'Banned user', value: member },
                { name: 'Moderator', value: `<@${message.author.id}>` },
                { name: 'Reason', value: reason }
            )
            .setColor('RED')
            .setTimestamp();

        await member.ban({ reason }).catch(err =>
            message.channel.send({
                content: `An error has been occured while trying to ban!\nError message :\n\`\`\`yml\n${err}\n\`\`\``,
            })
        );
        message.channel.send({ embeds: [embed] });
    },
};
